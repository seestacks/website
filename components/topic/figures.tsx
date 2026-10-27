import type { ReactNode } from "react";
import { ArrowIcon } from "@/components/ui/icons";
import type { FigureKind } from "@/content/topics/types";

/**
 * Window chrome shared by every figure on the explainer pages. Matches the
 * frame used by the hero showcase so the two never look like different sites.
 */
export function FigureFrame({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="border-hair-hi bg-panel overflow-hidden rounded-xl border">
      <div className="border-hair bg-ink-raised flex items-center gap-2 border-b px-4 py-2.5">
        <span className="bg-hair-hi h-2 w-2 rounded-full" />
        <span className="bg-hair-hi h-2 w-2 rounded-full" />
        <span className="bg-hair-hi h-2 w-2 rounded-full" />
        <span className="text-muted ml-3 font-mono text-[0.6875rem]">{label}</span>
      </div>
      {children}
    </div>
  );
}

const sessionSteps = [
  { label: "orient", text: "read CLAUDE.md and MEMORY.md" },
  { label: "plan", text: "reproduce, patch the retry, run the suite" },
  { label: "build", text: "edit .github/workflows/ci.yml" },
  { label: "check", text: "npm test, 128 passed" },
  { label: "record", text: "write Journal/2026-10-27.md" },
];

/**
 * A session as it actually looks in the terminal: one prompt, then the five
 * steps the setup forces. Text is real, not a screenshot, so it stays sharp
 * and can be edited like any other copy.
 */
function TerminalFigure() {
  return (
    <FigureFrame label="claude code · session">
      <div className="bg-ink px-5 py-5 font-mono text-[0.8125rem] leading-relaxed sm:px-6">
        <p className="text-cream">
          <span className="text-muted">&gt;</span> fix the flaky test in ci.yml
          <span className="bg-cream ml-1 inline-block h-[0.9em] w-[0.5em] align-[-0.1em]" />
        </p>

        <ul className="mt-5 space-y-2.5">
          {sessionSteps.map((step) => (
            <li key={step.label} className="flex gap-3">
              <span className="text-accent w-[3.75rem] shrink-0">{step.label}</span>
              <span className="text-cream-dim">{step.text}</span>
            </li>
          ))}
        </ul>

        <p className="border-hair text-muted mt-5 border-t pt-3 text-[0.75rem]">
          done in one session, nothing re-explained
        </p>
      </div>
    </FigureFrame>
  );
}

/**
 * Screenshots stay in `public/media` and are referenced by path, so replacing
 * one is a file swap with no code change.
 */
function ScreenshotFigure({
  label,
  src,
  alt,
  width,
  height,
}: {
  label: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <FigureFrame label={label}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className="bg-ink block h-auto w-full"
      />
    </FigureFrame>
  );
}

/**
 * The vault exactly as it sits on disk, so a reader can picture the folders
 * before they make any. Folders end in a slash and stay bright; files and the
 * note that explains them sit a step quieter.
 */
const vaultRows = [
  { depth: 0, name: "AI-Knowledge-Base/", note: "vault root", dir: true },
  { depth: 1, name: "CLAUDE/", note: "rules the agent reads", dir: true },
  { depth: 2, name: "CLAUDE.md", note: "entry point" },
  { depth: 2, name: "Commands/", note: "Journal.md", dir: true },
  { depth: 2, name: "Skills/", note: "Daily Journal.md", dir: true },
  { depth: 2, name: "Config/auto-memory/", note: "MEMORY.md", dir: true },
  { depth: 1, name: "Journal/", note: "one file per day", dir: true },
  { depth: 2, name: "2026/08/", note: "01.md · 02.md · 03.md", dir: true },
  { depth: 1, name: "Template/", note: "Daily Journal.md", dir: true },
  { depth: 1, name: "Content/", note: "Transcripts/", dir: true },
];

function VaultTreeFigure() {
  return (
    <FigureFrame label="AI-Knowledge-Base · vault">
      <ul className="bg-ink divide-hair divide-y font-mono text-[0.8125rem]">
        {vaultRows.map((row) => (
          <li
            key={row.name}
            className="flex items-center justify-between gap-4 py-2.5 pr-5"
            style={{ paddingLeft: `${1.25 + row.depth * 1.25}rem` }}
          >
            <span className={row.dir ? "text-cream" : "text-cream-dim"}>{row.name}</span>
            <span className="text-muted truncate text-[0.6875rem]">{row.note}</span>
          </li>
        ))}
      </ul>
    </FigureFrame>
  );
}

const templateSections = [
  {
    heading: "Today's Focus",
    lines: ["one line: what today is for"],
  },
  {
    heading: "Notes",
    lines: ["what happened, in the order it happened"],
  },
  {
    heading: "Tasks",
    lines: ["- [ ] test the daily note template", "- [x] connect project instructions"],
  },
  {
    heading: "End of Day",
    lines: ["- What did I complete?", "- What is still open?"],
  },
  {
    heading: "Related Notes",
    lines: ["[[2026/08/01]] · [[CLAUDE/Skills]]"],
  },
];

/** The note every day is built from, rendered as it opens in Obsidian. */
function TemplateFigure() {
  return (
    <FigureFrame label="Template/Daily Journal.md">
      <div className="bg-ink px-6 py-6">
        <p className="text-cream text-lg font-semibold">{"{{date}}"}</p>

        <div className="mt-5 space-y-4">
          {templateSections.map((section) => (
            <div key={section.heading}>
              <p className="border-hair text-cream border-b pb-1 text-[0.8125rem] font-semibold">
                {section.heading}
              </p>
              <ul className="mt-2 space-y-1">
                {section.lines.map((line) => (
                  <li key={line} className="text-cream-dim text-[0.8125rem]">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </FigureFrame>
  );
}

const captureSteps = [
  {
    label: "01 · capture",
    time: "same day",
    text: "retry flaky ci test twice",
    tone: "raw" as const,
  },
  {
    label: "02 · process",
    time: "next morning",
    text: "CI: retry a failing test twice, then fail loud",
    tone: "written" as const,
  },
  {
    label: "03 · link",
    time: "while writing",
    text: "[[ci.yml]] · [[Commands/Journal]]",
    tone: "linked" as const,
  },
];

/**
 * Three panels and two arrows. The demo is static on purpose: the movement it
 * describes happens over a day, so animating it would imply the wrong speed.
 */
function CaptureDemoFigure() {
  return (
    <FigureFrame label="capture → process → link">
      <div className="bg-ink flex flex-col gap-1 p-4 sm:p-5">
        {captureSteps.map((step, index) => (
          <div key={step.label}>
            <div
              className={`rounded-lg border px-4 py-3 ${
                step.tone === "linked"
                  ? "border-accent/35 bg-accent/5"
                  : "border-hair bg-panel"
              }`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-muted font-mono text-[0.625rem] tracking-[0.14em] uppercase">
                  {step.label}
                </p>
                <p className="text-muted font-mono text-[0.625rem]">{step.time}</p>
              </div>
              <p
                className={`mt-2 font-mono text-xs leading-relaxed ${
                  step.tone === "raw" ? "text-cream-dim" : "text-cream"
                }`}
              >
                {step.text}
              </p>
            </div>

            {index < captureSteps.length - 1 && (
              <span
                className="text-hair-hi mt-1 flex justify-center"
                aria-hidden="true"
              >
                <ArrowIcon className="h-3.5 w-3.5 rotate-90" />
              </span>
            )}
          </div>
        ))}
      </div>
    </FigureFrame>
  );
}

/** Renders the visual named by a topic's `visual.kind`. */
export function TopicFigure({ kind }: { kind: FigureKind }) {
  switch (kind) {
    case "terminal":
      return <TerminalFigure />;
    case "vault-tree":
      return <VaultTreeFigure />;
    case "template":
      return <TemplateFigure />;
    case "capture-demo":
      return <CaptureDemoFigure />;
    case "graph":
      return (
        <ScreenshotFigure
          label="obsidian · graph view"
          src="/media/obsidian-graph.png"
          alt="Obsidian graph view of the vault, with daily notes hanging off the year and commands and skills hanging off CLAUDE"
          width={1080}
          height={1010}
        />
      );
    case "session":
      return (
        <ScreenshotFigure
          label="claude code · session"
          src="/media/obsidian-session.png"
          alt="A Claude Code session in the terminal next to the daily note it just updated in Obsidian"
          width={1080}
          height={480}
        />
      );
    case "architecture":
      return (
        <ScreenshotFigure
          label="vault · architecture"
          src="/media/vault-architecture.png"
          alt="Diagram of a Claude Code session saving context into an Obsidian vault, and a later session reading it back"
          width={1536}
          height={1024}
        />
      );
    case "daily-note":
      return (
        <ScreenshotFigure
          label="obsidian · Journal/Daily"
          src="/media/vault-demo.gif"
          alt="Obsidian open on a daily note with sections for decisions, files modified, issues and next steps"
          width={800}
          height={645}
        />
      );
  }
}
