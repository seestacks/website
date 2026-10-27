/**
 * Shape of a documentation page.
 *
 * The same rule as the topic pages applies: content files hold data and never
 * import a component. `components/docs/doc-content.tsx` decides how a block
 * looks, so adding a guide is a data change, not a layout change.
 */

export type DocBlock =
  | { kind: "paragraphs"; items: string[] }
  | { kind: "list"; items: string[] }
  | { kind: "steps"; items: { title: string; body?: string }[] }
  | { kind: "code"; label?: string; content: string }
  | { kind: "note"; title: string; body: string };

export type DocSection = {
  /** Anchor id, used by the "On this page" list. */
  id: string;
  heading: string;
  blocks: DocBlock[];
};

export type DocPage = {
  slug: string;
  eyebrow: string;
  /** Page title and the sidebar label. */
  title: string;
  /** Meta description. One sentence, written for search results. */
  description: string;
  /** Intro paragraph under the title. */
  lead: string;
  sections: DocSection[];
};
