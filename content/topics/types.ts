/**
 * Shape of the explainer pages under `/context`, `/workflows` and `/obsidian`.
 *
 * Copy lives in this folder as plain data; the layout that renders it lives in
 * `components/topic/`. Adding a page means adding a file here and a route that
 * passes it to `TopicPage`.
 */

/** Every visual the explainer pages can show. */
export type FigureKind =
  | "architecture"
  | "daily-note"
  | "terminal"
  | "vault-tree"
  | "template"
  | "capture-demo"
  | "graph"
  | "session";

export type TopicVisual = {
  eyebrow: string;
  heading: string;
  body: string;
  caption: string;
  kind: FigureKind;
};

export type TopicRow = {
  index: string;
  title: string;
  path: string;
  badge: string;
  /** Accent marks the rows that carry the most weight. */
  accent?: boolean;
  body: string;
};

export type TopicContent = {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  lede: string;
  cards: { index: string; title: string; path: string }[];
  definition: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    closing: string;
  };
  /**
   * The demonstrations, in reading order. Each becomes its own section with the
   * text on one side and the figure on the other, alternating.
   */
  visuals: TopicVisual[];
  structure: {
    eyebrow: string;
    heading: string;
    lede: string;
    rows: TopicRow[];
    note: string;
  };
  failures: {
    eyebrow: string;
    heading: string;
    items: { index: string; title: string; body: string }[];
  };
  watch: { eyebrow: string; heading: string; body: string };
};
