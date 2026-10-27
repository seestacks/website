"use client";

import { useCallback, useEffect, useState } from "react";

type Slide = {
  /** `video` autoplays muted on loop; `image` is a still. */
  kind: "video" | "image";
  src: string;
  /** Small label in the frame's title bar. */
  chrome: string;
  caption: string;
  alt: string;
};

/**
 * The hero showcase. Add or reorder entries here and the controls adapt:
 * one dot per slide, chevrons disabled at the ends.
 */
const slides: Slide[] = [
  {
    kind: "video",
    src: "/media/obsidian-graph.mp4",
    chrome: "obsidian · vault graph",
    caption: "The vault graph: memory on disk",
    alt: "The Obsidian vault graph that Claude Code reads as memory",
  },
  {
    kind: "image",
    src: "/media/vault-demo.gif",
    chrome: "obsidian · vault",
    caption: "Markdown in Obsidian, no plugins",
    alt: "The vault open in Obsidian, showing markdown notes and folders",
  },
];

const ADVANCE_MS = 7000;

export function HeroShowcase() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );

  useEffect(() => {
    if (paused) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setTimeout(() => go(index + 1), ADVANCE_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, go]);

  const slide = slides[index];

  return (
    <div
      className="w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="group"
      aria-roledescription="carousel"
      aria-label="What the system looks like"
    >
      <div className="relative [transform:perspective(1600px)_rotateY(-7deg)_rotateX(2.5deg)]">
        <div className="border-hair-hi bg-panel overflow-hidden rounded-xl border shadow-[0_50px_140px_-50px_rgba(0,0,0,0.95)]">
          <div className="border-hair bg-ink-raised flex items-center gap-2 border-b px-4 py-2.5">
            <span className="bg-hair-hi h-2 w-2 rounded-full" />
            <span className="bg-hair-hi h-2 w-2 rounded-full" />
            <span className="bg-hair-hi h-2 w-2 rounded-full" />
            <span className="text-muted ml-3 font-mono text-[0.6875rem]">
              {slide.chrome}
            </span>
          </div>

          <div className="relative aspect-[4/3] w-full bg-ink">
            {slide.kind === "video" ? (
              <video
                key={slide.src}
                className="absolute inset-0 h-full w-full object-cover [filter:brightness(0.78)_contrast(1.06)_saturate(0.85)]"
                src={slide.src}
                autoPlay
                muted
                loop
                playsInline
                aria-label={slide.alt}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={slide.src}
                src={slide.src}
                alt={slide.alt}
                className="absolute inset-0 h-full w-full object-cover [filter:brightness(0.9)]"
              />
            )}
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p
          className="text-muted font-mono text-[0.6875rem] tracking-[0.12em] uppercase"
          aria-live="polite"
        >
          {slide.caption}
        </p>

        <div className="flex items-center gap-x-3">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous"
            className="group border-hair-hi bg-panel hover:border-muted/40 flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border transition-colors"
          >
            <svg
              viewBox="0 0 16 16"
              width="10"
              height="10"
              className="text-muted group-hover:text-cream h-2.5 w-2.5 transition-colors"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M10 3 5 8l5 5" />
            </svg>
          </button>

          <div className="flex items-center">
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to ${s.chrome}`}
                aria-current={i === index}
                className="group px-1.5 py-2"
              >
                <span
                  className={`block h-1.5 w-1.5 rounded-full border-[0.75px] transition-colors ${
                    i === index
                      ? "border-muted bg-muted"
                      : "border-muted/40 bg-panel group-hover:bg-muted/50"
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next"
            className="group border-hair-hi bg-panel hover:border-muted/40 flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border transition-colors"
          >
            <svg
              viewBox="0 0 16 16"
              width="10"
              height="10"
              className="text-muted group-hover:text-cream h-2.5 w-2.5 transition-colors"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m6 3 5 5-5 5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
