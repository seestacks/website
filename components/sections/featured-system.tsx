import { featuredVideo } from "@/content/featured";
import { links } from "@/content/links";
import { ActionLink } from "../ui/action-link";
import { ExternalIcon, GitHubIcon, PlayIcon } from "../ui/icons";
import { LiteYouTube } from "../ui/lite-youtube";
import { Reveal } from "../ui/reveal";

/**
 * The featured system slot. Renders the open-source vault architecture card.
 * If a `youtubeId` is configured in `content/featured.ts`, it also embeds the video player.
 */
export function FeaturedSystem() {
  const { youtubeId, title, description, repoUrl } = featuredVideo;

  return (
    <section id="vault" className="section-edge">
      <div className="container-page py-20 sm:py-28">
        <Reveal>
          <p className="eyebrow">Featured system</p>
          <h2 className="text-cream mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.015em] sm:text-4xl">
            {title}
          </h2>
          <p className="text-cream-dim mt-4 max-w-2xl leading-relaxed">{description}</p>
        </Reveal>

        {youtubeId && (
          <div className="panel mt-10 overflow-hidden">
            <div className="relative aspect-video w-full">
              <LiteYouTube
                id={youtubeId}
                title={title}
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        )}

        {/* One CTA block, not two. The video above already plays inline, so
            the repo link and the channel link live here only. */}
        {repoUrl && (
          <div className={`panel ${youtubeId ? "mt-6" : "mt-10"} flex flex-col justify-between gap-6 p-6 sm:flex-row sm:items-center sm:p-7`}>
            <div>
              <div className="flex items-center gap-2">
                <span className="eyebrow text-accent">Open-Source Vault</span>
                <span className="text-muted font-mono text-xs">MIT License</span>
              </div>
              <h3 className="text-cream mt-2 text-xl font-semibold tracking-[-0.01em]">
                Claude Obsidian Memory
              </h3>
              <p className="text-cream-dim mt-2 max-w-xl text-sm leading-relaxed">
                The persistent context and auto-memory system for Claude Code. Includes daily journal automations, bash scripts, and symlink topology.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <ActionLink
                href={repoUrl}
                className="btn btn-primary self-start whitespace-nowrap sm:self-center"
              >
                <GitHubIcon />
                Star & Clone on GitHub
                <ExternalIcon />
              </ActionLink>
              {links.youtube && (
                <ActionLink
                  href={links.youtube}
                  className="btn btn-secondary self-start whitespace-nowrap sm:self-center"
                >
                  <PlayIcon />
                  Explore Channel
                  <ExternalIcon />
                </ActionLink>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
