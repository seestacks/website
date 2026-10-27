import type { DocPage } from "./types";

export const permissionsSetup: DocPage = {
  slug: "permissions",
  eyebrow: "Permissions",
  title: "Permission the agent once",
  description:
    "How Claude Code permissions work: the settings files, allow and deny rules, pattern syntax, and the small set of commands a vault agent actually needs.",
  lead: "Every tool call the agent makes is a permission decision. Answering the same prompt forty times is not a workflow, so the answers live in a file and the prompt stops appearing.",

  sections: [
    {
      id: "where",
      heading: "Where the rules live",
      blocks: [
        {
          kind: "list",
          items: [
            "`~/.claude/settings.json` applies to every project on the machine. This is where personal rules belong.",
            "`.claude/settings.json` inside a project applies to that project and is committed, so the rules travel with the repo.",
            "`.claude/settings.local.json` applies to one project on one machine and is gitignored.",
          ],
        },
        {
          kind: "paragraphs",
          items: [
            "The files merge. A project rule adds to the personal rule; it does not replace the whole list.",
          ],
        },
      ],
    },
    {
      id: "allow-deny",
      heading: "Allow and deny",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "Two lists do most of the work. Anything not matched is asked for the first time and remembered for the session.",
          ],
        },
        {
          kind: "code",
          label: "~/.claude/settings.json",
          content: `{
  "permissions": {
    "allow": [
      "Bash(obsidian *)",
      "Bash(ls *)",
      "Bash(find *)",
      "Bash(mkdir *)"
    ],
    "deny": [
      "CronCreate",
      "CronDelete",
      "EnterWorktree"
    ]
  }
}`,
        },
        {
          kind: "paragraphs",
          items: [
            "The allow list above is the whole vault toolchain: list, find, make a folder, and talk to Obsidian. Nothing there can delete a file, push a commit or send a message.",
          ],
        },
      ],
    },
    {
      id: "patterns",
      heading: "How a pattern is written",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "A rule is a tool name, optionally followed by a specifier in parentheses. For Bash the specifier is the start of the command; a trailing `:*` turns it into a prefix match.",
          ],
        },
        {
          kind: "code",
          label: "examples",
          content: `Bash(npm run build)          exactly this command
Bash(npm run test:*)         anything starting with npm run test
Read(./.env)                 one file, relative to the project
Read(./src/**)               everything under src
Edit(./docs/**)              edit anything under docs
WebFetch(domain:example.com) only that host`,
        },
        {
          kind: "note",
          title: "Allow by prefix only when the prefix is safe.",
          body: "A rule for `Bash(git:*)` also allows `git push --force`. Write the narrowest prefix that covers the work you actually repeat.",
        },
      ],
    },
    {
      id: "modes",
      heading: "The other three ways to answer",
      blocks: [
        {
          kind: "list",
          items: [
            "Approve one call when the prompt appears. Good for a one-off; it does not survive the session.",
            "Run `/permissions` to see the merged rules and add or remove one without editing JSON by hand.",
            "Switch to accept-edits mode for a stretch of editing, so file changes stop asking while commands still do.",
          ],
        },
        {
          kind: "paragraphs",
          items: [
            "Modes are a session preference. Rules are the durable answer, and the two are not a substitute for each other.",
          ],
        },
      ],
    },
    {
      id: "policy",
      heading: "What to allow in a vault",
      blocks: [
        {
          kind: "list",
          items: [
            "Read-only inspection: `ls`, `find`, `grep`, `cat`.",
            "The vault CLI: `Bash(obsidian *)` lets the agent open, search, append and read notes without a screenshot.",
            "The project's own build and test commands, written as prefixes.",
            "Nothing that deletes broadly, publishes, pays or sends. If a task needs one of those, approve it by hand that once.",
          ],
        },
        {
          kind: "note",
          title: "A rule you cannot explain is a rule to delete.",
          body: "Fewer, sharper rules produce fewer prompts and a smaller blast radius than a long allow list nobody has read.",
        },
      ],
    },
  ],
};
