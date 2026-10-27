/**
 * Brand values and primary navigation.
 *
 * These are the only strings that appear on every page, so they live together:
 * metadata in `app/layout.tsx`, the nav in the header, footer and mobile menu.
 */

/** Core brand + metadata values. Used by the layout and the sitemap. */
export const site = {
  name: "Seestack",
  /** Canonical origin. No trailing slash. */
  url: "https://www.seestack.dev",
  tagline: "Real AI workflows that actually run.",
  description:
    "Real AI workflows, terminal coding agents, and Obsidian setups that actually run. Free open-source vaults, bash scripts, and architecture breakdowns.",
  author: "Seestack",
} as const;

/**
 * Primary navigation. Most entries point at a section on the home page; Docs
 * is its own route and the only one that lives outside the landing page.
 */
export const nav = [
  { label: "Systems", href: "/#systems" },
  { label: "Watch", href: "/#watch" },
  { label: "Vault", href: "/#vault" },
  { label: "Docs", href: "/docs" },
  { label: "Tools", href: "/#tools" },
  { label: "About", href: "/#about" },
] as const;
