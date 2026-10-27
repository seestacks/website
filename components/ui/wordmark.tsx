/**
 * The Seestack wordmark: an original three-layer "stack" mark plus the name.
 * The same geometry is used for the favicon in `app/icon.svg`.
 */
export function Wordmark() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        className="h-[22px] w-[22px] shrink-0"
        aria-hidden="true"
      >
        <rect x="6" y="4" width="14" height="3.6" rx="1.8" fill="var(--color-accent)" />
        <rect
          x="4"
          y="10.2"
          width="16"
          height="3.6"
          rx="1.8"
          fill="var(--color-cream)"
          fillOpacity="0.72"
        />
        <rect
          x="2"
          y="16.4"
          width="18"
          height="3.6"
          rx="1.8"
          fill="var(--color-cream)"
          fillOpacity="0.38"
        />
      </svg>
      <span className="text-cream text-[1.0625rem] font-semibold tracking-tight">
        Seestack
      </span>
    </span>
  );
}
