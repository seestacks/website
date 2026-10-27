/**
 * The long-form video featured in the "Featured system" section, plus the two
 * URL helpers every video link on the site goes through.
 */

import { links } from "./links";

export type FeaturedVideo = {
  /**
   * The 11-character YouTube video ID, the `v=` part of a watch URL.
   * e.g. for https://www.youtube.com/watch?v=dQw4w9WgXcQ this is "dQw4w9WgXcQ".
   *
   * While this is `null` the section renders a styled video placeholder and
   * the "Watch on YouTube" action is shown as not-yet-available.
   */
  youtubeId: string | null;
  title: string;
  description: string;
  repoUrl?: string | null;
};

export const featuredVideo: FeaturedVideo = {
  youtubeId: "t_sOfWli9aU",
  title: "Claude Code + Obsidian: Change How AI Memory Works",
  description:
    "Claude Code forgets everything between sessions, so every new chat starts with you re-explaining your project. This architecture builds the fix: an Obsidian vault holding the agent's memory, commands and skills as plain markdown, symlinked back so the agent reads them as its own.",
  repoUrl: "https://github.com/see-stack/claude-obsidian-memory",
};

/** Public watch URL for a YouTube video ID. */
export function youtubeWatchUrl(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`;
}

/**
 * Privacy-friendlier embed host. `youtube-nocookie.com` does not set tracking
 * cookies until playback starts.
 */
export function youtubeEmbedUrl(id: string): string {
  return `https://www.youtube-nocookie.com/embed/${id}`;
}

/**
 * Where "Watch the latest" points. Falls back to the watch section while no
 * video is configured, so the button is never a dead end.
 */
export const latestWatchHref: string = featuredVideo.youtubeId
  ? youtubeWatchUrl(featuredVideo.youtubeId)
  : links.youtube ?? "#watch";
