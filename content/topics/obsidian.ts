import type { TopicContent } from "./types";

export const obsidianTopic: TopicContent = {
  eyebrow: "Obsidian second brain",
  titleLead: "A second brain is a vault,",
  titleAccent: "not an app.",
  lede: "The application is just the editor. The brain is what sits on disk: notes with real names, links between them, and one entry point you come back to every day.",

  cards: [
    { index: "01", title: "Capture", path: "Journal/2026/08" },
    { index: "02", title: "Process", path: "Template/Daily Journal.md" },
    { index: "03", title: "Connect", path: "[[wikilinks]]" },
    { index: "04", title: "Retrieve", path: "graph · search" },
  ],

  definition: {
    eyebrow: "The definition",
    heading: "Four moves, repeated until it holds.",
    paragraphs: [
      "Most vaults fail at capture or at retrieval, and rarely in the middle. Notes arrive faster than they get processed, and the graph fills with pages nobody opens a second time.",
      "The fix is a fixed route: capture into one place, process it the next morning, connect it while the context is still fresh, and keep a small set of entry points that lead back in.",
      "None of it needs a plugin, a database or a custom schema. Folders and wikilinks are enough, provided the route is the same every day.",
    ],
    closing: "The test: pick a topic you have not touched in a month and find it in two hops.",
  },

  visuals: [
    {
      eyebrow: "In practice",
      heading: "What a processed day looks like.",
      body: "One daily note after a single pass: what was decided, which files moved, what broke, and what happens next. The sections are always the same, so a search for a decision is a search for a heading.",
      caption: "obsidian · daily note after one processing pass",
      kind: "daily-note",
    },
    {
      eyebrow: "The template",
      heading: "Every day gets the same five headings.",
      body: "The template is the structure, not decoration. Because the headings never change, last week's note and next month's note can be read the same way, and an agent can fill them without inventing a format.",
      caption: "Template/Daily Journal.md",
      kind: "template",
    },
    {
      eyebrow: "On disk",
      heading: "The whole system is five folders.",
      body: "None of it needs a plugin. CLAUDE holds the rules the agent reads, Journal holds one file per day under the year and month, Template holds the note each day is built from, and Content holds what gets published.",
      caption: "AI-Knowledge-Base · folder layout",
      kind: "vault-tree",
    },
    {
      eyebrow: "The agent side",
      heading: "A session ends by writing the note.",
      body: "The terminal on the left and the note on the right are the same moment. Claude Code finishes the task, then appends what changed to today's file, with links to the commands and skills it used.",
      caption: "claude code · updating Journal/2026/08/02.md",
      kind: "session",
    },
    {
      eyebrow: "One line",
      heading: "From a capture to a note you can find.",
      body: "A line arrives raw. Processing rewrites it with enough context to be useful next week, then connects it to the file or project it belongs to. Three steps, and none of them are optional.",
      caption: "capture · process · link",
      kind: "capture-demo",
    },
    {
      eyebrow: "Retrieval",
      heading: "The graph shows what is reachable.",
      body: "This is the real vault. Daily notes hang off the year, commands and skills hang off CLAUDE, and memory notes sit at the edge. A note with no edges is the one you will never open again.",
      caption: "obsidian · graph view, AI-Knowledge-Base",
      kind: "graph",
    },
  ],

  structure: {
    eyebrow: "Structure",
    heading: "From a captured line to a note you can find.",
    lede: "Each step has one job and one place. When a step borrows another step's job, the vault stops being a system and turns into a folder of good intentions.",
    rows: [
      {
        index: "01",
        title: "Capture",
        path: "Journal/2026/08",
        badge: "Every day",
        accent: true,
        body: "Everything that arrives during the day is written into that day's file as it happens. No sorting at capture time, because sorting is the thing that stops capture.",
      },
      {
        index: "02",
        title: "Process",
        path: "Template/Daily Journal.md",
        badge: "Next morning",
        accent: true,
        body: "The template decides which headings exist: what got decided, which files moved, what broke, what comes next. Processing means filling those headings, not inventing new ones each day.",
      },
      {
        index: "03",
        title: "Connect",
        path: "[[links]]",
        badge: "While writing",
        body: "A note earns a link to a project, a person or another note. Links are what make the vault searchable by association instead of by filename.",
      },
      {
        index: "04",
        title: "Retrieve",
        path: "graph · search",
        badge: "When needed",
        body: "The graph is the index of last resort. A note that cannot be reached from a daily note or a project is effectively lost, even though the file is still there.",
      },
    ],
    note: "The order matters more than the tooling. Capture without processing is a bigger inbox, and processing without links is a second inbox in a different folder.",
  },

  failures: {
    eyebrow: "Failure modes",
    heading: "Why vaults stop being used.",
    items: [
      {
        index: "01",
        title: "A vault that only takes notes",
        body: "Capture is the easy half. Without a processing step the inbox grows until it becomes the mess you were trying to escape, and opening it starts to feel like a chore.",
      },
      {
        index: "02",
        title: "Folders instead of links",
        body: "A deep folder tree sorts a note once. A link keeps it reachable from every project that touches it, which is the only kind of reachability that survives time.",
      },
      {
        index: "03",
        title: "Tooling before structure",
        body: "Themes, plugins and dashboards are a comfortable way to avoid writing the note. Get the route working in five folders first, then decorate it.",
      },
    ],
  },

  watch: {
    eyebrow: "See it running",
    heading: "The vault, built on camera.",
    body: "The long-form walkthrough starts from an empty vault. The shorts cover one move at a time.",
  },
};
