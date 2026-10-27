"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "../ui/reveal";
import {
  playlistUrl,
  thumbnailUrl,
  watchUrl,
  type Playlist,
  type PlaylistItem,
} from "@/content/playlists";

function Card({ item }: { item: PlaylistItem }) {
  const year = item.published.slice(0, 4);
  const month = new Date(`${item.published}T00:00:00Z`).toLocaleString("en-US", {
    month: "short",
    timeZone: "UTC",
  });

  // Shorts don't all expose a portrait crop; fall back to the 4:3 thumbnail,
  // which object-cover still crops to fill the card.
  const [src, setSrc] = useState(() => thumbnailUrl(item));

  return (
    <a
      href={watchUrl(item.id)}
      target="_blank"
      rel="noreferrer noopener"
      className={`group border-hair bg-panel relative h-[420px] shrink-0 snap-start overflow-hidden rounded-xl border transition-transform duration-200 hover:-translate-y-0.5 ${
        item.kind === "short" ? "w-[76vw] sm:w-[318px]" : "w-[76vw] sm:w-[640px]"
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        loading="lazy"
        onError={() => {
          const fallback = `https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`;
          if (src !== fallback) setSrc(fallback);
        }}
        className="absolute inset-0 h-full w-full object-cover opacity-85 transition-opacity duration-200 [filter:brightness(0.9)] group-hover:opacity-100"
      />
      <span className="from-ink via-ink/40 absolute inset-0 bg-gradient-to-t to-transparent" />

      <span className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6">
        <span className="text-muted font-mono text-[0.625rem] tracking-[0.14em] uppercase">
          {item.kind === "short" ? "Short" : "Video"} · {month} {year}
        </span>
        <span className="text-cream text-lg leading-snug font-medium text-balance">
          {item.title}
        </span>
      </span>
    </a>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {dir === "left" ? <path d="M10 3 5 8l5 5" /> : <path d="m6 3 5 5-5 5" />}
    </svg>
  );
}

export function VideoRail({ playlist }: { playlist: Playlist }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    sync();
    const el = scroller.current;
    if (!el) return;
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const scrollBy = (direction: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-cream text-xl font-semibold tracking-[-0.01em] sm:text-2xl">
          {playlist.title}
        </h3>

        <div className="flex flex-wrap items-center gap-2">
          {playlist.explore && (
            <a
              href={playlist.explore.href}
              className="border-accent/40 bg-accent/10 text-accent hover:bg-accent/20 inline-flex items-center gap-1 rounded-full border px-3.5 py-1.5 text-xs transition-colors"
            >
              {playlist.explore.label}
              <Chevron dir="right" />
            </a>
          )}

          <span className="bg-hair mx-2 hidden h-[18px] w-px sm:block" />

          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              disabled={atStart}
              aria-label={`Scroll ${playlist.title} left`}
              className="border-hair bg-panel text-cream-dim hover:bg-panel-hi flex h-[38px] w-[38px] items-center justify-center rounded-full border transition-colors disabled:opacity-40"
            >
              <Chevron dir="left" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              disabled={atEnd}
              aria-label={`Scroll ${playlist.title} right`}
              className="border-hair bg-panel text-cream-dim hover:bg-panel-hi flex h-[38px] w-[38px] items-center justify-center rounded-full border transition-colors disabled:opacity-40"
            >
              <Chevron dir="right" />
            </button>
            <span className="bg-hair mx-2 h-[18px] w-px" />
          </div>

          <a
            href={playlistUrl(playlist.id)}
            target="_blank"
            rel="noreferrer noopener"
            className="border-hair bg-panel text-cream-dim hover:bg-panel-hi inline-flex items-center gap-1 rounded-full border px-3.5 py-1.5 text-xs transition-colors"
          >
            Explore playlist
            <Chevron dir="right" />
          </a>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scroller}
          className="no-scrollbars mt-7 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2"
        >
          {playlist.items.map((item) => (
            <Card key={`${playlist.id}-${item.id}`} item={item} />
          ))}
        </div>

        {/*
         * Edge fades. A hard cut at the container edge reads as a clipped card;
         * these soften it, and each side only appears when there is something
         * still hidden behind it.
         */}
        <span
          aria-hidden="true"
          className={`from-ink pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r to-transparent transition-opacity duration-300 sm:w-16 ${
            atStart ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          aria-hidden="true"
          className={`from-ink pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l to-transparent transition-opacity duration-300 sm:w-16 ${
            atEnd ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>
    </div>
  );
}

export function VideoRails({ playlists }: { playlists: Playlist[] }) {
  return (
    <section id="watch" className="section-edge">
      <div className="container-page py-20 sm:py-28">
        <Reveal>
          <p className="eyebrow">Watch</p>
          <h2 className="text-cream mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.015em] sm:text-4xl">
            The systems, recorded.
          </h2>
          <p className="text-cream-dim mt-4 max-w-2xl leading-relaxed">
            Every build runs on camera. Shorts for the one idea, long-form for
            the full setup. Pick a playlist.
          </p>
        </Reveal>

        <div className="mt-14 flex flex-col gap-16">
          {playlists.map((playlist, i) => (
            <Reveal key={playlist.id} delay={i * 80}>
              <VideoRail playlist={playlist} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
