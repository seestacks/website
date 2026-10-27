import type { TopicVisual } from "@/content/topics/types";
import { TopicFigure } from "./figures";

/**
 * The first visuals from a topic, staggered above the fold. The figures are
 * built for a column about this wide, so every tile keeps its real layout
 * instead of being squeezed into a thumbnail. Each tile jumps to its section.
 */
const fourTileLayout = [
  "h-40 w-full",
  "ml-auto h-28 w-[90%]",
  "h-24 w-full",
  "ml-auto h-36 w-[86%]",
];

function tileClass(index: number, count: number) {
  if (count === 1) return "h-64 w-full";
  if (count === 2) return ["h-44 w-full", "ml-auto h-32 w-[90%]"][index];
  return fourTileLayout[index] ?? "h-28 w-full";
}

/** First three in order, then the last one, which is usually the widest view. */
function pickIndices(count: number) {
  if (count <= 4) return Array.from({ length: count }, (_, index) => index);
  return [0, 1, 2, count - 1];
}

export function VisualCollage({ visuals }: { visuals: TopicVisual[] }) {
  if (visuals.length === 0) return null;

  const shown = pickIndices(visuals.length).map((index) => ({
    visual: visuals[index],
    href: `#visual-${index}`,
  }));

  return (
    <nav aria-label="Visual previews">
      <div className="flex flex-col gap-3">
        {shown.map(({ visual, href }, index) => (
          <a
            key={visual.heading}
            href={href}
            aria-label={`Jump to the demo: ${visual.heading}`}
            className={`group ring-hair hover:ring-hair-hi bg-ink relative block min-w-0 overflow-hidden rounded-xl ring-1 transition-shadow ${tileClass(
              index,
              shown.length,
            )}`}
          >
            {/* The figure is decoration here; the link label carries the meaning. */}
            <div aria-hidden="true" className="pointer-events-none">
              <TopicFigure kind={visual.kind} />
            </div>

            {/* Softens the cut where the tile ends and the figure continues below. */}
            <span
              aria-hidden="true"
              className="from-ink pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t to-transparent"
            />
          </a>
        ))}
      </div>
      <p className="text-muted mt-3 font-mono text-[0.625rem] tracking-[0.12em] uppercase">
        the demos below
      </p>
    </nav>
  );
}
