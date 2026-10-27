import type { DocPage } from "./types";

export const symlinkSetup: DocPage = {
  slug: "symlinks",
  eyebrow: "Symlinks",
  title: "Keep the config outside the vault",
  description:
    "How the agent config, scripts and memory are symlinked into the Obsidian vault, why they live outside it, and the path trap that breaks the journal script.",
  lead: "The vault holds notes. The agent config holds rules, scripts and memory. A symlink puts them in the same place without copying either, so git versions one and Obsidian syncs the other.",

  sections: [
    {
      id: "links",
      heading: "What is linked",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "Three links are enough. Everything else is a file inside the real config folder.",
          ],
        },
        {
          kind: "code",
          label: "vault",
          content: `Agent/claude-config   -> ~/Control-Panel/claude-config
Agent/codex-config    -> ~/Control-Panel/codex-config
Agent/Scripts/daily-journal.sh
                      -> ~/Control-Panel/claude-config/Scripts/daily-journal.sh`,
        },
        {
          kind: "paragraphs",
          items: [
            "The link looks like a folder to Obsidian and to the agent. `Agent/claude-config/Commands/` opens the same files as the folder outside the vault.",
          ],
        },
      ],
    },
    {
      id: "why",
      heading: "Why not copy it in",
      blocks: [
        {
          kind: "list",
          items: [
            "One source of truth. Editing a script in one place cannot leave a stale copy in the other.",
            "Git tracks the config folder on its own, without the notes and without iCloud conflict files.",
            "iCloud sync sees a 40-byte link instead of every script and memory file, so a sync conflict cannot break a running setup.",
            "The vault stays portable. A new machine restores the config, recreates three links, and the setup is identical.",
          ],
        },
      ],
    },
    {
      id: "recreate",
      heading: "Recreate them",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "Run this from the vault root. If the target paths differ, change them first; a link to a folder that does not exist looks like an empty folder, not an error.",
          ],
        },
        {
          kind: "code",
          label: "terminal",
          content: `cd "/path/to/ObsidianVault"

ln -s ~/Control-Panel/claude-config Agent/claude-config
ln -s ~/Control-Panel/codex-config Agent/codex-config
ln -s ~/Control-Panel/claude-config/Scripts/daily-journal.sh \\
      Agent/Scripts/daily-journal.sh

ls -l Agent`,
        },
        {
          kind: "note",
          title: "The link must point at something that exists.",
          body: "Move or rename the config folder and the link is still a link, just a broken one. Recreate it instead of copying files in.",
        },
      ],
    },
    {
      id: "trap",
      heading: "The path trap",
      blocks: [
        {
          kind: "paragraphs",
          items: [
            "The journal script finds the vault by walking up from its own location. Run it through the link and the link's location is inside the vault, which is the answer it needs.",
            "Run the same script by its real path outside the vault, and it walks up from the config folder instead. It then creates a second `Journal/` tree in the config repository, and the daily note you were looking for is in the wrong place.",
          ],
        },
        {
          kind: "code",
          label: "correct",
          content: `cd "/path/to/ObsidianVault"
bash Agent/Scripts/daily-journal.sh ensure`,
        },
        {
          kind: "code",
          label: "avoid",
          content: `# resolves the vault to the config folder and plants a stray Journal tree
bash ~/Control-Panel/claude-config/Scripts/daily-journal.sh ensure`,
        },
      ],
    },
  ],
};
