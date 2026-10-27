import type { TopicContent } from "./types";

export const workflowsTopic: TopicContent = {
  eyebrow: "Claude Code workflows",
  titleLead: "A workflow lives in the repo,",
  titleAccent: "not in the chat.",
  lede: "The prompt starts the session, it does not run it. What the agent does next comes from the files it finds: rules it has to follow, a toolkit it can reach for, and a place to write down what it learned.",

  cards: [
    { index: "01", title: "Rules", path: "CLAUDE.md" },
    { index: "02", title: "Toolkit", path: "skills/ · commands/" },
    { index: "03", title: "Interface", path: "mods/" },
    { index: "04", title: "Record", path: "Journal/" },
  ],

  definition: {
    eyebrow: "The definition",
    heading: "A workflow is a loop, not a prompt.",
    paragraphs: [
      "A workflow is not the message you type. It is what happens once the agent has read the repo: the order it takes the work in, what it checks before it edits, and what it writes down before the session ends.",
      "The order is the part people skip. With no defined entry point the agent starts wherever the last message left it, and re-derives the project on every run. That re-derivation is where most of the wasted tokens and most of the wrong edits come from.",
      "Write the order into the setup and the session becomes repeatable: the same four steps whether the task is a one-line fix or a new subsystem.",
    ],
    closing:
      "The test: open a fresh session, say nothing about the project, and see whether the agent still knows where to begin.",
  },

  visuals: [
    {
      eyebrow: "In practice",
      heading: "One session, start to finish.",
      body: "The prompt is a single line. Everything under it comes from the setup: which files get read first, where the plan gets written, and what the check has to pass before the session is allowed to end.",
      caption: "claude code · one task, four steps",
      kind: "terminal",
    },
  ],

  structure: {
    eyebrow: "Structure",
    heading: "Four steps, every task.",
    lede: "The steps are cheap individually. What costs real time is skipping one, then paying for it twice: once when the agent guesses, and again when the next session inherits the guess.",
    rows: [
      {
        index: "01",
        title: "Orient",
        path: "CLAUDE.md",
        badge: "Before anything",
        accent: true,
        body: "The agent reads the rules and the memory index before it opens a file. Build commands, off-limits paths, conventions that are not up for debate. This is the cheapest step and the one that prevents the most damage.",
      },
      {
        index: "02",
        title: "Plan",
        path: "task note",
        badge: "Before edits",
        accent: true,
        body: "The task gets written down and the files it touches get named. A plan held in the conversation disappears on a context reset. A plan on disk survives a crash, a restart and a new session.",
      },
      {
        index: "03",
        title: "Build",
        path: "terminal",
        badge: "In the loop",
        body: "Edits and commands run in the same loop: change, run, read the output, change again. The terminal output is the review. A diff that was never executed is a proposal, not a result.",
      },
      {
        index: "04",
        title: "Record",
        path: "Journal/",
        badge: "After the run",
        body: "What changed, what broke, what was decided. Written at the end so the next session starts from the result instead of from someone's memory of it.",
      },
    ],
    note: "Four steps is the whole workflow. Everything else in the setup exists to make one of them cheaper, and anything that does not make one of them cheaper is decoration.",
  },

  failures: {
    eyebrow: "Failure modes",
    heading: "Where a session goes wrong.",
    items: [
      {
        index: "01",
        title: "A prompt-only setup",
        body: "A long instruction pasted at the start of a chat works once. It leaves nothing behind, so the second session spends its first minutes rebuilding the first.",
      },
      {
        index: "02",
        title: "Editing without running",
        body: "An agent that changes files without executing anything is guessing. The check has to happen in the same session, or the next one inherits a broken assumption as fact.",
      },
      {
        index: "03",
        title: "Work that never gets written down",
        body: "If a decision only exists in the scrollback, it exits with the tab. The journal entry is what makes the next run faster than this one.",
      },
    ],
  },

  watch: {
    eyebrow: "See it running",
    heading: "The setup, built on camera.",
    body: "The long-form walkthrough builds the vault and the workflow together. The shorts take one step at a time.",
  },
};
