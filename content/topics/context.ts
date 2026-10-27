import type { TopicContent } from "./types";

export const contextTopic: TopicContent = {
  eyebrow: "AI context & memory",
  titleLead: "Context is a file layout,",
  titleAccent: "not a prompt trick.",
  lede: "Every agent starts each session with nothing. What it remembers is only what the setup puts in front of it: which files load automatically, which ones wait on disk, and which ones nobody ever wrote down.",

  cards: [
    { index: "01", title: "Session rules", path: "CLAUDE.md" },
    { index: "02", title: "Memory index", path: "MEMORY.md" },
    { index: "03", title: "Material on demand", path: "skills/ · commands/" },
    { index: "04", title: "Long-term notes", path: "Journal/ · projects/" },
  ],

  definition: {
    eyebrow: "The definition",
    heading: "A memory system is four decisions.",
    paragraphs: [
      "Not a database, and not a longer prompt. A working memory system is the answer to four questions, and every one of them is answered by a file somewhere on disk.",
      "What must the agent read before it is allowed to act? What is worth keeping in front of it at all times, and what is only worth keeping within reach? Where does a decision get written so the next session can find it? And how does the agent know where to look without being told twice?",
      "Answer those in a folder structure and the behavior is repeatable. Leave them to the prompt and every session becomes a re-negotiation, with whatever the model happened to emphasize last time as the baseline.",
    ],
    closing:
      "The test is simple: start a fresh session, ask the agent what it knows about the project, and see which of those four answers survives.",
  },

  visuals: [
    {
      eyebrow: "In practice",
      heading: "Two sessions, one vault.",
      body: "The session on the left saves what it learned. The session on the right starts with it already there. Nothing gets pasted into a prompt, because the vault is what the agent reads from.",
      caption: "persistent context · one session to the next",
      kind: "architecture",
    },
  ],

  structure: {
    eyebrow: "Structure",
    heading: "Four layers, loaded at different times.",
    lede: "The layers are ordered by cost. Everything above a line is paid for on every single session, so it has to earn its place. Everything below the line is paid for only when a task reaches for it.",
    rows: [
      {
        index: "01",
        title: "Session rules",
        path: "CLAUDE.md",
        badge: "Every session",
        accent: true,
        body: "What the agent must do in this repo before it does anything else: which checks to run, which files are off limits, which conventions are not up for debate. It is small, stable, and loaded at the start of every session.",
      },
      {
        index: "02",
        title: "Memory index",
        path: "MEMORY.md",
        badge: "Every session",
        accent: true,
        body: "One line per known fact, each pointing at a longer note. The index is loaded every session, so it is kept short on purpose. The index costs context; the notes behind it cost nothing until something opens one.",
      },
      {
        index: "03",
        title: "Material on demand",
        path: "skills/ · commands/",
        badge: "On demand",
        body: "Skills and slash commands live on disk until a task needs them. The index says what exists and when to reach for it. The instructions themselves are read only when they are relevant.",
      },
      {
        index: "04",
        title: "Long-term notes",
        path: "Journal/ · projects/",
        badge: "On demand",
        body: "Decisions, sessions, and daily logs, written as plain markdown with links between them. None of it is written for the agent's benefit. It is the same vault a person uses, which is the reason it stays accurate.",
      },
    ],
    note: "The split is the whole design. Rules and the index are small enough to load every time. Skills, notes, and history are large, so they stay on disk behind a name the agent can recognize.",
  },

  failures: {
    eyebrow: "Failure modes",
    heading: "What breaks when the structure is missing.",
    items: [
      {
        index: "01",
        title: "Knowledge that was never written down",
        body: "If a decision only exists in an old chat, the next session starts without it. The agent does not forget because it is forgetful. It forgets because nothing on disk carried the decision forward.",
      },
      {
        index: "02",
        title: "Everything loaded at once",
        body: "Filling the window with every file feels safe and is usually the opposite. The material that matters gets pushed out by material that does not, and the model spends its attention re-reading instead of working.",
      },
      {
        index: "03",
        title: "Notes that cannot be found",
        body: "A vault with no naming convention and no index is a write-only archive. Memory only counts when it can be located from a single line of context at the start of a session.",
      },
    ],
  },

  watch: {
    eyebrow: "See it running",
    heading: "The same structure, built on camera.",
    body: "The long-form walkthrough builds the vault end to end. The shorts cover one layer at a time.",
  },
};
