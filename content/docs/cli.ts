import type { DocPage } from "./types";

export const cliSetup: DocPage = {
  slug: "cli",
  eyebrow: "Obsidian CLI",
  title: "Turn on the Obsidian CLI",
  description:
    "How to enable the Obsidian command line interface, the command syntax, and the commands an agent needs to read, search and write notes in the vault.",
  lead: "Obsidian ships a command line interface. Turned on, the agent can open notes, search the vault and append to today's note without clicking coordinates or reading screenshots.",

  sections: [
    {
      id: "enable",
      heading: "Enable it in Obsidian",
      blocks: [
        {
          kind: "steps",
          items: [
            {
              title: "Update Obsidian first",
              body: "The CLI ships with recent installers. If the setting below is missing, update the app before anything else.",
            },
            {
              title: "Open Settings, then General",
              body: "Turn on Command line interface.",
            },
            {
              title: "Accept the registration prompt",
              body: "Obsidian registers the `obsidian` command with the shell. This is the step that makes the command exist in a terminal.",
            },
            {
              title: "Restart the terminal",
              body: "A shell that was already open will not see the new command. Quit it and open a new one.",
            },
          ],
        },
      ],
    },
    {
      id: "check",
      heading: "Check that it works",
      blocks: [
        {
          kind: "code",
          label: "terminal",
          content: `obsidian help`,
        },
        {
          kind: "paragraphs",
          items: [
            "That prints every command and its parameters. If Obsidian is not running, the first command starts it, so the first call can take a few seconds.",
          ],
        },
      ],
    },
    {
      id: "syntax",
      heading: "Syntax",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "The shape is the command, then `parameter=value` pairs, then bare flags. Values with spaces go in quotes, and `vault=<name>` goes first when more than one vault is open.",
          ],
        },
        {
          kind: "code",
          label: "terminal",
          content: `obsidian vault=ObsidianVault open path="Journal/Daily/2026/10/27.md"

obsidian append path="Journal/Daily/2026/10/27.md" \\
         content="14:20 Created the docs section."

obsidian search query="map-before-mutating" limit=5

obsidian backlinks file="CLAUDE"`,
        },
        {
          kind: "note",
          title: "file or path, not both.",
          body: "`file=` resolves a name the way a wikilink does. `path=` is exact, from the vault root. Use the path when two notes share a name.",
        },
      ],
    },
    {
      id: "commands",
      heading: "The commands worth knowing",
      blocks: [
        {
          kind: "list",
          items: [
            "`open` shows a note in the app, which is useful when a person is watching the screen.",
            "`append` and `prepend` write to any note without opening it.",
            "`daily`, `daily:append`, `daily:read` and `daily:path` work on today's note directly, so the date never has to be computed.",
            "`search` and `search:context` find text across the vault and can return JSON.",
            "`backlinks`, `links`, `orphans` and `deadends` are the graph checks. They answer whether a note is reachable.",
            "`tasks` and `tags` turn the vault into a queryable list instead of a pile of files.",
          ],
        },
      ],
    },
    {
      id: "agent",
      heading: "Let the agent use it",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "The CLI is a shell command, so the agent calls it through Bash. One permission rule keeps it from asking every time.",
          ],
        },
        {
          kind: "code",
          label: "~/.claude/settings.json",
          content: `{
  "permissions": {
    "allow": ["Bash(obsidian *)"]
  }
}`,
        },
        {
          kind: "paragraphs",
          items: [
            "That single rule is what makes the vault usable by an agent. Reading, searching and writing notes becomes the same operation, and the result is mirrored in the app as it happens.",
          ],
        },
        {
          kind: "note",
          title: "If a command stalls",
          body: "The CLI talks to the running app. Check that Obsidian is open and that the vault name matches the one in the command.",
        },
      ],
    },
  ],
};
