/**
 * An original, hand-built schematic of a working system: tools feed a context
 * store, the context store feeds an agent runtime, the runtime produces
 * outputs, and the outputs loop back into the tools.
 *
 * Everything is inline SVG plus CSS: no images, no animation library, no
 * client-side JavaScript. Animated edges carry `pathLength={100}` so the dash
 * pattern defined in `globals.css` behaves identically on every path length,
 * and the whole thing goes still under `prefers-reduced-motion`.
 *
 * Two layouts are authored because a left-to-right pipeline is unreadable on a
 * phone: `WideDiagram` (>= 640px) flows horizontally, `CompactDiagram` flows
 * vertically. Only one is ever in the accessibility tree, because the other is
 * `display: none`.
 */

const ARIA_LABEL =
  "Schematic of a working system: an editor, a command line, and a repository " +
  "feed a context store of files, history, and rules; the context store feeds " +
  "an agent runtime; the runtime produces a pull request, documentation, and a " +
  "pipeline run, which feed back into the tools.";

/** Rounded orthogonal connector: horizontal, vertical, horizontal. */
function hvh(x1: number, y1: number, x2: number, y2: number, r = 12): string {
  if (y1 === y2) return `M${x1} ${y1} H${x2}`;
  const xm = (x1 + x2) / 2;
  const dir = y2 > y1 ? 1 : -1;
  return [
    `M${x1} ${y1}`,
    `H${xm - r}`,
    `Q${xm} ${y1} ${xm} ${y1 + dir * r}`,
    `V${y2 - dir * r}`,
    `Q${xm} ${y2} ${xm + r} ${y2}`,
    `H${x2}`,
  ].join(" ");
}

/** Rounded orthogonal connector: vertical, horizontal, vertical. */
function vhv(x1: number, y1: number, x2: number, y2: number, r = 10): string {
  if (x1 === x2) return `M${x1} ${y1} V${y2}`;
  const ym = (y1 + y2) / 2;
  const dir = x2 > x1 ? 1 : -1;
  return [
    `M${x1} ${y1}`,
    `V${ym - r}`,
    `Q${x1} ${ym} ${x1 + dir * r} ${ym}`,
    `H${x2 - dir * r}`,
    `Q${x2} ${ym} ${x2} ${ym + r}`,
    `V${y2}`,
  ].join(" ");
}

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <filter
        id={`${id}-glow`}
        x="-60%"
        y="-60%"
        width="220%"
        height="220%"
        colorInterpolationFilters="sRGB"
      >
        <feGaussianBlur stdDeviation="16" />
      </filter>
      <pattern
        id={`${id}-grid`}
        width="38"
        height="38"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M38 0 H0 V38"
          fill="none"
          stroke="var(--color-hair)"
          strokeWidth="1"
        />
      </pattern>
      <radialGradient id={`${id}-fade`} cx="50%" cy="45%" r="62%">
        <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
      </radialGradient>
      <mask id={`${id}-mask`}>
        <rect width="100%" height="100%" fill={`url(#${id}-fade)`} />
      </mask>
    </defs>
  );
}

/** Rounded box with a centred monospace label. */
function Node({
  x,
  y,
  w,
  h,
  label,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="8"
        fill="var(--color-panel)"
        stroke="var(--color-hair-hi)"
      />
      <text
        x={x + w / 2}
        y={y + h / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-mono)"
        fontSize="13"
        fill="var(--color-cream-dim)"
      >
        {label}
      </text>
    </g>
  );
}

function Eyebrow({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <text
      x={x}
      y={y}
      fontFamily="var(--font-mono)"
      fontSize="11"
      letterSpacing="1.7"
      fill="var(--color-muted)"
    >
      {children}
    </text>
  );
}

/** Caption sitting in a gap punched out of the feedback edge. */
function EdgeLabel({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <g>
      <rect x={x - w / 2} y={y - 11} width={w} height={22} fill="var(--color-ink)" />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-mono)"
        fontSize="10.5"
        letterSpacing="1.2"
        fill="var(--color-muted)"
      >
        feedback
      </text>
    </g>
  );
}

/** The agent runtime panel: label, rule, and three activity bars. */
function Core({
  x,
  y,
  w,
  h,
  glowId,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  glowId: string;
}) {
  const pad = 16;
  const inner = w - pad * 2;
  const bars = [
    { width: inner, filled: 0.55 },
    { width: inner * 0.72, filled: 0 },
    { width: inner * 0.86, filled: 0 },
  ];
  return (
    <g>
      <rect
        className="diagram-core-glow"
        x={x}
        y={y}
        width={w}
        height={h}
        rx="14"
        fill="var(--color-accent)"
        filter={`url(#${glowId})`}
      />
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="14"
        fill="var(--color-ink-raised)"
        stroke="var(--color-accent)"
        strokeOpacity="0.45"
      />
      <text
        x={x + pad}
        y={y + 24}
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="1.7"
        fill="var(--color-accent)"
      >
        AGENT
      </text>
      <line
        x1={x + pad}
        y1={y + 38}
        x2={x + w - pad}
        y2={y + 38}
        stroke="var(--color-hair-hi)"
      />
      {bars.map((bar, i) => (
        <g key={i}>
          <rect
            x={x + pad}
            y={y + 54 + i * 14}
            width={bar.width}
            height={7}
            rx="3.5"
            fill="var(--color-panel-hi)"
          />
          {bar.filled > 0 && (
            <rect
              x={x + pad}
              y={y + 54 + i * 14}
              width={bar.width * bar.filled}
              height={7}
              rx="3.5"
              fill="var(--color-accent)"
              fillOpacity="0.8"
            />
          )}
        </g>
      ))}
    </g>
  );
}

/** A static edge with an animated pulse tracing the same path. */
function Edge({ d, delay }: { d: string; delay: number }) {
  return (
    <g>
      <path className="diagram-edge" d={d} pathLength={100} />
      <path
        className="diagram-flow"
        d={d}
        pathLength={100}
        style={{ animationDelay: `${delay}s` }}
      />
    </g>
  );
}

/* -------------------------------------------------------------------------- */
/* Wide layout: horizontal pipeline, >= 640px                                 */
/* -------------------------------------------------------------------------- */

function WideDiagram() {
  const id = "dw";
  const tools = ["editor", "cli", "repo"];
  const outputs = ["pull request", "docs", "pipeline"];
  const rows = [120, 176, 232]; // node tops; vertical centres are +21

  return (
    <svg
      viewBox="0 0 660 384"
      className="hidden h-auto w-full sm:block"
      role="img"
      aria-label={ARIA_LABEL}
    >
      <Defs id={id} />
      <rect
        width="660"
        height="384"
        fill={`url(#${id}-grid)`}
        mask={`url(#${id}-mask)`}
      />

      {/* Edges first, so nodes paint over their endpoints. */}
      {rows.map((top, i) => (
        <Edge key={`in-${i}`} d={hvh(150, top + 21, 270, 197)} delay={i * 0.5} />
      ))}
      <Edge d="M345 102 V141" delay={1.6} />
      {rows.map((top, i) => (
        <Edge
          key={`out-${i}`}
          d={hvh(420, 197, 510, top + 21)}
          delay={2.1 + i * 0.5}
        />
      ))}
      <Edge
        d="M575 274 V338 Q575 350 563 350 H97 Q85 350 85 338 V274"
        delay={3.7}
      />

      <Eyebrow x={20} y={106}>
        TOOLS
      </Eyebrow>
      {tools.map((label, i) => (
        <Node key={label} x={20} y={rows[i]} w={130} h={42} label={label} />
      ))}

      <Eyebrow x={250} y={34}>
        CONTEXT
      </Eyebrow>
      <rect
        x={250}
        y={46}
        width={190}
        height={56}
        rx="8"
        fill="var(--color-panel)"
        stroke="var(--color-hair-hi)"
      />
      <text
        x={345}
        y={74}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-mono)"
        fontSize="12"
        fill="var(--color-cream-dim)"
      >
        files · history · rules
      </text>

      <Core x={270} y={141} w={150} h={112} glowId={`${id}-glow`} />

      <Eyebrow x={510} y={106}>
        OUTPUTS
      </Eyebrow>
      {outputs.map((label, i) => (
        <Node key={label} x={510} y={rows[i]} w={130} h={42} label={label} />
      ))}

      <EdgeLabel x={330} y={350} w={100} />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Compact layout: vertical pipeline, < 640px                                 */
/* -------------------------------------------------------------------------- */

function CompactDiagram() {
  const id = "dc";
  const cols = [40, 144, 248]; // node lefts; width 92, centres are +46
  const tools = ["editor", "cli", "repo"];
  const outputs = ["pr", "docs", "ci"];

  return (
    <svg
      viewBox="0 0 380 520"
      className="h-auto w-full sm:hidden"
      role="img"
      aria-label={ARIA_LABEL}
    >
      <Defs id={id} />
      <rect
        width="380"
        height="520"
        fill={`url(#${id}-grid)`}
        mask={`url(#${id}-mask)`}
      />

      {cols.map((x, i) => (
        <Edge key={`in-${i}`} d={vhv(x + 46, 96, 190, 148)} delay={i * 0.5} />
      ))}
      <Edge d="M190 204 V244" delay={1.6} />
      <Edge d="M190 352 V406" delay={2.2} />
      <Edge
        d="M190 446 V474 Q190 486 178 486 H30 Q18 486 18 474 V88 Q18 76 30 76 H40"
        delay={3.0}
      />

      <Eyebrow x={40} y={42}>
        TOOLS
      </Eyebrow>
      {tools.map((label, i) => (
        <Node key={label} x={cols[i]} y={56} w={92} h={40} label={label} />
      ))}

      <Eyebrow x={40} y={138}>
        CONTEXT
      </Eyebrow>
      <rect
        x={40}
        y={148}
        width={300}
        height={56}
        rx="8"
        fill="var(--color-panel)"
        stroke="var(--color-hair-hi)"
      />
      <text
        x={190}
        y={176}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-mono)"
        fontSize="12"
        fill="var(--color-cream-dim)"
      >
        files · history · rules
      </text>

      <Core x={76} y={244} w={228} h={108} glowId={`${id}-glow`} />

      <Eyebrow x={40} y={392}>
        OUTPUTS
      </Eyebrow>
      {outputs.map((label, i) => (
        <Node key={label} x={cols[i]} y={406} w={92} h={40} label={label} />
      ))}

      <EdgeLabel x={104} y={486} w={68} />
    </svg>
  );
}

export function SystemDiagram() {
  return (
    <>
      <WideDiagram />
      <CompactDiagram />
    </>
  );
}
