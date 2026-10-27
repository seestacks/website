import type { DocPage } from "./types";

export const vaultSetup: DocPage = {
  slug: "vault",
  eyebrow: "Vault setup",
  title: "Set up the vault",
  description:
    "What an Obsidian vault needs before a coding agent can read it: a folder, a rules file, a daily note template, and the five folders everything else lives in.",
  lead: "One folder on disk, five folders inside it, and one rules file the agent opens first. Nothing here needs a plugin, a database or a paid app.",

  sections: [
    {
      id: "requirements",
      heading: "What you need",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "The setup assumes a Mac or Linux machine, but every piece is a file, so Windows works with the same shape and different paths.",
          ],
        },
        {
          kind: "list",
          items: [
            "Obsidian desktop, installed and opened once.",
            "Claude Code installed, logged in, and runnable from a terminal with `claude`.",
            "A folder to hold the vault. Plain disk, iCloud or Dropbox all work.",
            "A terminal you are comfortable running `mkdir` and `bash` in.",
          ],
        },
        {
          kind: "note",
          title: "No plugins were used for any of this.",
          body: "Folders, markdown files and a shell script do all the work. Every plugin added later is a preference, not a requirement.",
        },
      ],
    },
    {
      id: "structure",
      heading: "The folder shape",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "The vault is the folder Obsidian opens. These are the folders that matter, and each one has exactly one job.",
          ],
        },
        {
          kind: "code",
          label: "vault root",
          content: `ObsidianVault/
├── CLAUDE.md              rules the agent reads first
├── AGENTS.md              the same rules for other agents
├── Agent/
│   ├── claude-config ->   symlinked config (see Symlinks)
│   └── Scripts/
│       └── daily-journal.sh
├── Templates/
│   └── Daily-Journal-Template.md
├── Journal/
│   └── Daily/
│       └── 2026/10/27.md
├── Projects/              one folder per code project
└── Content/               transcripts, drafts, published notes`,
        },
        {
          kind: "list",
          items: [
            "`CLAUDE.md` is the entry point. It states which rules win, where the rest of the rules live, and what not to do.",
            "`Agent/` holds the scripts and config the agent uses. The config itself lives outside the vault and is linked in.",
            "`Templates/` holds the note every day is built from.",
            "`Journal/Daily/YYYY/MM/DD.md` is one note per day, sorted by year and month so the folder never holds a thousand files at once.",
            "`Projects/` holds code. Each project can add its own `CLAUDE.md` with rules that apply only inside that folder.",
            "`Content/` holds what gets published: transcripts, drafts, and notes behind a video.",
          ],
        },
      ],
    },
    {
      id: "create",
      heading: "Create it",
      blocks: [
        {
          kind: "steps",
          items: [
            {
              title: "Make the folders",
              body: "Adjust the path to wherever you keep notes. Quote the path if it contains spaces.",
            },
          ],
        },
        {
          kind: "code",
          label: "terminal",
          content: `mkdir -p ~/Obsidian/ObsidianVault/{Agent/Scripts,Templates,Journal/Daily,Projects,Content}`,
        },
        {
          kind: "steps",
          items: [
            {
              title: "Open the folder as a vault",
              body: "In Obsidian: Open folder as vault, then pick the folder you just made. Everything below is a plain markdown file, so Obsidian is the viewer, not the source of truth.",
            },
            {
              title: "Add the rules file",
              body: "This is the file the agent reads before it touches anything. Keep it short enough to read, and specific enough to disagree with.",
            },
          ],
        },
        {
          kind: "code",
          label: "CLAUDE.md",
          content: `# CLAUDE.md

## Where the rules live
- Vault rules: this file.
- Project rules: Projects/<name>/CLAUDE.md, when that project has one.
- Memory: MEMORY.md in the auto-memory directory.

## Working rules
- Read a file before editing it.
- Write one journal line per change, with the time.
- Do not invent paths. Resolve them with ls or find first.`,
        },
        {
          kind: "steps",
          items: [
            {
              title: "Add the daily template",
              body: "The template decides which headings exist. Because the headings never change, a note from last week and a note from next month can be read the same way.",
            },
          ],
        },
        {
          kind: "code",
          label: "Templates/Daily-Journal-Template.md",
          content: `## created:
Date: {{date}}
Time: {{time}}

## Insights / Thoughts:

## Learnings / Discoveries:

## Dev / Logs:

## Decisions

## Files Modified

## Issues / Blockers

## Next Steps

## Related Notes`,
        },
      ],
    },
    {
      id: "configured",
      heading: "What we configured",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "This vault is not a container for notes. It is a working directory the agent and the person share, and each piece below exists because one of them needed it.",
          ],
        },
        {
          kind: "list",
          items: [
            "`CLAUDE.md` at the root sets rule precedence and an execution policy, so the agent knows which instruction wins when two rules disagree.",
            "`Agent/claude-config` is a symlink to a folder outside the vault that holds commands, skills, scripts and memory. Git tracks that folder, not the vault.",
            "`Agent/Scripts/daily-journal.sh` is a symlink to the script that creates today's note, logs a line, and appends a section. One script owns every path and date, so the notes cannot drift.",
            "`Journal/Daily/YYYY/MM/` keeps the journal navigable. The script maintains a year index and a link back to the month.",
            "`Projects/<name>/CLAUDE.md` narrows the rules for one codebase. A convention from one project does not leak into another.",
          ],
        },
      ],
    },
    {
      id: "rules",
      heading: "The rules that make it hold",
      blocks: [
        {
          kind: "list",
          items: [
            "One canonical index per folder. Two hubs for the same folder means neither is trusted.",
            "Structural links use the full vault path, not a bare note name, so a renamed folder fails loudly instead of silently.",
            "Project rules override vault defaults, and the current instruction overrides both.",
            "Memory is not a second copy of the vault. If the files already say it, memory does not.",
          ],
        },
        {
          kind: "note",
          title: "If the vault lives in iCloud",
          body: "The path contains spaces. Quote it in every shell command, or the script will create a second Journal tree in the wrong place.",
        },
      ],
    },
  ],
};
