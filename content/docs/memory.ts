import type { DocPage } from "./types";

export const memorySetup: DocPage = {
  slug: "memory",
  eyebrow: "Memory",
  title: "Give the agent memory",
  description:
    "How to give a coding agent memory that survives sessions: one directory of small fact files, an index loaded every session, and a rule for what never gets stored.",
  lead: "An agent forgets everything between sessions unless the memory lives in files it is told to load. This is the setup that survives a restart, a crash and a new laptop.",

  sections: [
    {
      id: "why",
      heading: "Why files, not a longer prompt",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "A system prompt is a fixed cost paid on every message. Memory is a lookup: a small index at the start of a session, then a handful of files read only when the task needs them.",
            "That difference is what keeps a long-running setup affordable. The agent does not carry every lesson in context. It carries a list of where the lessons are.",
          ],
        },
      ],
    },
    {
      id: "location",
      heading: "Where it lives",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "Claude Code reads a memory directory configured in `~/.claude/settings.json`. Keep it outside the vault and link it in, so git can version it without the vault.",
          ],
        },
        {
          kind: "code",
          label: "~/.claude/settings.json",
          content: `{
  "autoMemoryDirectory": "/Users/you/Control-Panel/claude-config/config/auto-memory"
}`,
        },
        {
          kind: "note",
          title: "Use an absolute path",
          body: "The tilde is not expanded inside this setting. Write the full path, or the agent will create an empty directory wherever it happens to start.",
        },
      ],
    },
    {
      id: "contents",
      heading: "What is in it",
      blocks: [
        {
          kind: "code",
          label: "auto-memory/",
          content: `├── MEMORY.md                 the index, loaded every session
├── user-name.md              who the person is
├── no-em-dashes.md           a writing rule and the reason behind it
├── goal.md                   the one goal everything ladders up to
├── projects/
│   └── stackmcp.md           a project convention with a scope
└── mistakes/
    └── local-first-restructuring.md`,
        },
        {
          kind: "paragraphs",
          items: [
            "`MEMORY.md` is not the memory. It is a table of contents: one line per file, with a short hook so the agent can decide whether to open it.",
          ],
        },
      ],
    },
    {
      id: "format",
      heading: "One file, one fact",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "Every memory is a single markdown file with frontmatter. Four types cover almost everything: who the person is, how they want work done, what is in progress, and where to find something external.",
          ],
        },
        {
          kind: "code",
          label: "example memory file",
          content: `---
name: no-em-dashes
description: Never use em dashes in anything written for him; they read as an AI tell.
metadata:
  type: feedback
---

Never use em dashes in copy, notes, commits or UI text.

**Why:** it is the clearest tell that a model wrote the sentence.

**How to apply:** use a period, a comma or a colon instead.
Related: [[voiceover-script-style]]`,
        },
        {
          kind: "list",
          items: [
            "`user` records who the person is and how they work.",
            "`feedback` records a correction or a confirmed approach, with the reason, so it can be applied to a new situation.",
            "`project` records a goal or constraint that the code does not state.",
            "`reference` points at a URL, ticket or dashboard.",
          ],
        },
        {
          kind: "paragraphs",
          items: [
            "Short links between files (`[[name]]`) are what turn a folder of facts into something the agent can follow when one memory raises a question another one answers.",
          ],
        },
      ],
    },
    {
      id: "maintenance",
      heading: "Keeping it honest",
      blocks: [
        {
          kind: "list",
          items: [
            "Update the existing file instead of writing a second one that says the same thing.",
            "Delete a memory that turned out to be wrong. Two active memories that contradict each other are worse than none.",
            "Do not store what the repository already records: file layout, past fixes and git history are facts the agent can read.",
            "Give every project convention a scope, and never generalize it to another project.",
          ],
        },
        {
          kind: "note",
          title: "The test",
          body: "If a new session would do the work correctly without the file, it does not belong in memory.",
        },
      ],
    },
  ],
};
