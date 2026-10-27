"use client";

import { useState } from "react";

/**
 * A lightweight YouTube facade: the thumbnail and a play button ship on first
 * paint, and the real player is only mounted once someone clicks. Keeps the
 * third-party iframe off the initial load.
 */
export function LiteYouTube({
  id,
  title,
  className,
}: {
  id: string;
  title: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
        title={title}
        className={className}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <a
      href={`https://www.youtube.com/watch?v=${id}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event) => {
        // The href is the fallback: if the client bundle never hydrates, the
        // click still plays the video, just on YouTube instead of inline.
        event.preventDefault();
        setPlaying(true);
      }}
      aria-label={`Play ${title}`}
      className="group absolute inset-0 block h-full w-full cursor-pointer"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
        onError={(event) => {
          // Videos uploaded below 1080p have no maxres thumbnail.
          event.currentTarget.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
        }}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity duration-200 [filter:brightness(0.85)_saturate(0.9)] group-hover:opacity-100"
      />
      <span className="from-ink/80 absolute inset-0 bg-gradient-to-t via-ink/10 to-transparent" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="bg-ink/60 border-hair-hi flex h-16 w-16 items-center justify-center rounded-full border backdrop-blur-sm transition-transform duration-200 group-hover:scale-105">
          <svg
            viewBox="0 0 16 16"
            width="20"
            height="20"
            className="ml-0.5 h-5 w-5"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M5.2 3.3a.7.7 0 0 1 1.06-.6l6 4.1a.7.7 0 0 1 0 1.16l-6 4.34a.7.7 0 0 1-1.06-.6V3.3Z" />
          </svg>
        </span>
      </span>
    </a>
  );
}
