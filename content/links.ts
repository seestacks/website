/**
 * Outbound destinations used by the header, footer and calls to action.
 *
 * `null` means "not published yet". The footer renders the label as a muted
 * placeholder rather than inventing a destination. Replace a `null` with a real
 * URL to turn it into a working link.
 */
export const links = {
  youtube: "https://www.youtube.com/@seestack" as string | null,
  github: "https://github.com/see-stack" as string | null,
  instagram: "https://instagram.com/see.stack" as string | null,
  x: "https://x.com/seestackx" as string | null,
  bsky: "https://bsky.app/profile/seestack.bsky.social" as string | null,
  repo: "https://github.com/see-stack/claude-obsidian-memory" as string | null,
  linkedin: "https://www.linkedin.com/company/seestack/" as string | null,
  /** A plain email address, without the `mailto:` prefix. */
  contactEmail: "founder@seestack.dev" as string | null,
  /** Path or URL to a privacy policy, once one exists. */
  privacy: null as string | null,
};
