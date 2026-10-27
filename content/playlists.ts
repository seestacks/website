/**
 * Channel playlists, fetched from the channel's public RSS feeds.
 * Re-fetch and paste new entries when a playlist changes; nothing is fetched
 * at runtime, so the page has no third-party dependency here.
 */

export type PlaylistItem = {
  id: string;
  title: string;
  /** `short` renders portrait and narrow; `video` renders landscape and wide. */
  kind: "short" | "video";
  /** ISO date, for the card's meta line. */
  published: string;
};

export type Playlist = {
  id: string;
  title: string;
  items: PlaylistItem[];
  /** Link to the on-site explainer for this topic, when one exists. */
  explore?: { label: string; href: string };
};

export const playlists: Playlist[] = [
  {
    id: "PLVz82EzK1Z8A",
    title: "Claude Code: Workflows, Setup & Memory",
    explore: { label: "Explore workflows", href: "/workflows" },
    items: [
      {
        id: "QPtWduijqIM",
        title: "How I Set Up Claude Code for Obsidian",
        kind: "short",
        published: "2026-10-13",
      },
      {
        id: "cTtvGmrm-MA",
        title: "How a Claude Code Mod Saved Me Millions of Tokens",
        kind: "short",
        published: "2026-10-10",
      },
      {
        id: "lE1EUYn3IGY",
        title: "How I Turned Obsidian Into an AI Second Brain",
        kind: "short",
        published: "2026-10-08",
      },
      {
        id: "euyRbvvAzfE",
        title: "How I Stopped Claude Code From Forgetting Everything",
        kind: "short",
        published: "2026-10-01",
      },
    ],
  },
  {
    id: "PLT_QkhPNG6XM",
    title: "Obsidian + AI Second Brain: The Complete Setup",
    explore: { label: "Explore the vault setup", href: "/obsidian" },
    items: [
      {
        id: "5auTX1_xiJA",
        title: "Obsidian Keeps This Off by Default — Turn It On",
        kind: "short",
        published: "2026-10-11",
      },
      {
        id: "lE1EUYn3IGY",
        title: "How I Turned Obsidian Into an AI Second Brain",
        kind: "short",
        published: "2026-10-08",
      },
      {
        id: "yNbzY0c6GXA",
        title: "How I Built an Autonomous Daily Note Template",
        kind: "short",
        published: "2026-10-05",
      },
      {
        id: "R8nglfpS0hg",
        title: "How I Get My Obsidian Daily Notes to Build Themselves",
        kind: "short",
        published: "2026-10-02",
      },
      {
        id: "t_sOfWli9aU",
        title: "How I Connected Claude Code and Obsidian for Infinite Context",
        kind: "video",
        published: "2026-09-30",
      },
      {
        id: "t2tDm-En2_g",
        title: "How I Actually Keep My Notes",
        kind: "short",
        published: "2026-09-27",
      },
      {
        id: "jQsOmmF5Kng",
        title: "How I Keep My Obsidian Vault From Becoming a Mess",
        kind: "short",
        published: "2026-09-27",
      },
    ],
  },
  {
    id: "PLFRCL4tQ3xl4",
    title: "AI Context & Memory",
    explore: { label: "Explore AI context & memory", href: "/context" },
    items: [
      {
        id: "OAZucLjMghM",
        title: "How I Rank AI Context From Worst to Best",
        kind: "short",
        published: "2026-09-30",
      },
      {
        id: "GscZSf3VTEM",
        title: "I Built a Local AI Context Management System",
        kind: "short",
        published: "2026-09-06",
      },
    ],
  },
];

export function watchUrl(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`;
}

export function playlistUrl(id: string): string {
  return `https://www.youtube.com/playlist?list=${id}`;
}

/**
 * `maxresdefault` is the only variant that returns a real frame for every
 * video here. The portrait `oardefault` crop is missing on many Shorts and
 * comes back as a grey placeholder rather than a 404, so the browser has no
 * error to catch.
 */
export function thumbnailUrl(item: PlaylistItem): string {
  return `https://i.ytimg.com/vi/${item.id}/maxresdefault.jpg`;
}
