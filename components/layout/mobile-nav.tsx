"use client";

import { useEffect, useState } from "react";
import { latestWatchHref } from "@/content/featured";
import { nav } from "@/content/site";
import { ActionLink } from "../ui/action-link";
import { PlayIcon } from "../ui/icons";

/**
 * The only client component on the page. A disclosure menu for viewports too
 * narrow for the inline nav: closes on Escape, on selecting a link, and
 * reports its state through `aria-expanded` / `aria-controls`.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="border-hair-hi text-cream hover:bg-panel-hi inline-flex h-10 w-10 items-center justify-center rounded-lg border transition-colors"
      >
        <svg
          viewBox="0 0 20 20"
          width="18"
          height="18"
          className="h-[18px] w-[18px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          aria-hidden="true"
        >
          {open ? (
            <path d="M5 5l10 10M15 5L5 15" />
          ) : (
            <path d="M3 6h14M3 10h14M3 14h14" />
          )}
        </svg>
      </button>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-hair bg-ink-raised absolute inset-x-0 top-full border-b shadow-lg"
      >
        <nav aria-label="Mobile" className="container-page py-4">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-cream-dim hover:text-cream block py-3 text-[0.9375rem] transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <ActionLink
            href={latestWatchHref}
            onClick={() => setOpen(false)}
            className="btn btn-primary mt-3 w-full"
          >
            <PlayIcon />
            Watch the latest
          </ActionLink>
          <a
            href="/#subscribe"
            onClick={() => setOpen(false)}
            className="btn btn-secondary mt-2 w-full"
          >
            Subscribe
          </a>
        </nav>
      </div>
    </div>
  );
}
