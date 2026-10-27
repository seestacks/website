import type { ReactNode } from "react";
import { TopicFigure } from "@/components/topic/figures";
import { VisualCollage } from "@/components/topic/visual-collage";
import { ActionLink } from "@/components/ui/action-link";
import { ArrowIcon, ExternalIcon, GitHubIcon, PlayIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SubscribeForm } from "@/components/ui/subscribe-form";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { featuredVideo, youtubeWatchUrl } from "@/content/featured";
import { links } from "@/content/links";
import type { TopicContent } from "@/content/topics/types";

function Section({
  id,
  eyebrow,
  heading,
  children,
  className = "section-edge-bottom",
}: {
  id?: string;
  eyebrow?: string;
  heading?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={className}>
      <div className="container-page py-20 sm:py-28">
        {(eyebrow || heading) && (
          <Reveal>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {heading && (
              <h2 className="text-cream mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.015em] sm:text-4xl">
                {heading}
              </h2>
            )}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

/**
 * The explainer layout shared by `/context`, `/workflows` and `/obsidian`.
 * Content lives in each page; this file owns the structure so the three pages
 * cannot drift apart.
 */
export function TopicPage({ content }: { content: TopicContent }) {
  const { eyebrow, titleLead, titleAccent, lede, cards, definition, visuals, structure, failures, watch } =
    content;
  const videoId = featuredVideo.youtubeId;

  return (
    <>
      <SiteHeader />

      <main id="main" className="flex-1">
        <section id="top" className="section-edge-bottom relative overflow-hidden">
          <div className="grid-field pointer-events-none absolute inset-0" aria-hidden="true" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 right-[-10%] hidden h-[36rem] w-[36rem] rounded-full opacity-20 blur-[140px] lg:block"
            style={{
              background:
                "radial-gradient(circle, var(--color-accent) 0%, transparent 68%)",
            }}
          />

          <div className="container-page relative py-20 sm:py-28">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] lg:items-start lg:gap-14">
              <div className="max-w-3xl">
                <Reveal>
                  <p className="eyebrow">{eyebrow}</p>
                  <h1 className="text-cream mt-6 max-w-3xl text-[2.5rem] leading-[1.06] font-semibold tracking-[-0.03em] sm:text-[3.25rem]">
                    {titleLead} <span className="text-accent">{titleAccent}</span>
                  </h1>
                  <p className="text-cream-dim mt-6 max-w-xl text-lg leading-relaxed">{lede}</p>

                  <div className="mt-8">
                    <SubscribeForm
                      id="explore-email"
                      source="explore"
                      note="Free. Unsubscribe anytime."
                    />
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                    {links.repo && (
                      <ActionLink
                        href={links.repo}
                        className="text-cream-dim hover:text-cream inline-flex items-center gap-1.5 underline decoration-hair-hi underline-offset-4 transition-colors hover:decoration-accent"
                      >
                        <GitHubIcon />
                        Get the vault, free
                      </ActionLink>
                    )}
                    {videoId && (
                      <ActionLink
                        href={youtubeWatchUrl(videoId)}
                        className="text-cream-dim hover:text-cream inline-flex items-center gap-1.5 underline decoration-hair-hi underline-offset-4 transition-colors hover:decoration-accent"
                      >
                        <PlayIcon />
                        Watch the build
                      </ActionLink>
                    )}
                  </div>
                </Reveal>
              </div>

              <Reveal delay={120}>
                <VisualCollage visuals={visuals} />
              </Reveal>
            </div>

            <Reveal delay={160}>
              <ul className="border-hair bg-hair mt-14 grid gap-px overflow-hidden rounded-xl border sm:grid-cols-2 lg:grid-cols-4">
                {cards.map((card) => (
                  <li key={card.path} className="bg-panel px-5 py-4">
                    <p className="text-muted font-mono text-[0.625rem] tracking-[0.14em] uppercase">
                      {card.index}
                    </p>
                    <p className="text-cream mt-2 text-sm font-medium">{card.title}</p>
                    <p className="text-accent mt-1 font-mono text-xs">{card.path}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <Section className="border-hair border-b">
          <Reveal className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
            <div>
              <p className="eyebrow">{definition.eyebrow}</p>
              <h2 className="text-cream mt-4 text-3xl font-semibold tracking-[-0.015em] sm:text-4xl">
                {definition.heading}
              </h2>
            </div>

            <div className="text-cream-dim max-w-2xl space-y-5 leading-relaxed">
              {definition.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p className="text-cream">{definition.closing}</p>
            </div>
          </Reveal>
        </Section>

        {visuals.map((visual, index) => {
          // Alternate which side the figure sits on, so a page with five
          // demonstrations reads as a rhythm instead of a column of screenshots.
          const flipped = index % 2 === 1;

          return (
            <Section key={visual.heading} id={`visual-${index}`}>
              <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
                <Reveal className={flipped ? "lg:order-2" : ""}>
                  <p className="eyebrow">{visual.eyebrow}</p>
                  <h2 className="text-cream mt-4 text-3xl font-semibold tracking-[-0.015em] sm:text-4xl">
                    {visual.heading}
                  </h2>
                  <p className="text-cream-dim mt-4 leading-relaxed">{visual.body}</p>
                </Reveal>

                <Reveal delay={90} className={flipped ? "lg:order-1" : ""}>
                  <figure>
                    <TopicFigure kind={visual.kind} />
                    <figcaption className="text-muted mt-4 font-mono text-[0.6875rem] tracking-[0.12em] uppercase">
                      {visual.caption}
                    </figcaption>
                  </figure>
                </Reveal>
              </div>
            </Section>
          );
        })}

        <Section eyebrow={structure.eyebrow} heading={structure.heading}>
          <Reveal delay={60}>
            <p className="text-cream-dim mt-4 max-w-2xl leading-relaxed">{structure.lede}</p>
          </Reveal>

          <Reveal delay={80}>
            <ol className="panel divide-hair mt-12 divide-y overflow-hidden">
              {structure.rows.map((row) => (
                <li
                  key={row.path}
                  className="grid gap-4 p-6 sm:grid-cols-[3rem_minmax(0,14rem)_minmax(0,1fr)] sm:items-start sm:gap-6 sm:p-8"
                >
                  <span className="text-accent font-mono text-sm">{row.index}</span>

                  <div>
                    <h3 className="text-cream text-xl font-semibold tracking-[-0.01em]">
                      {row.title}
                    </h3>
                    <p className="text-muted mt-2 font-mono text-xs">{row.path}</p>
                    <span
                      className={`mt-3 inline-flex items-center rounded border px-2 py-0.5 font-mono text-[0.625rem] tracking-[0.1em] uppercase ${
                        row.accent
                          ? "border-accent/30 bg-accent/10 text-accent"
                          : "border-hair-hi text-muted"
                      }`}
                    >
                      {row.badge}
                    </span>
                  </div>

                  <p className="text-cream-dim text-[0.9375rem] leading-relaxed">{row.body}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={120}>
            <p className="text-muted mt-6 max-w-2xl text-sm leading-relaxed">{structure.note}</p>
          </Reveal>
        </Section>

        <Section eyebrow={failures.eyebrow} heading={failures.heading}>
          <Reveal delay={80}>
            <ul className="mt-12 grid gap-5 md:grid-cols-3">
              {failures.items.map((item) => (
                <li key={item.index} className="panel flex flex-col p-6 sm:p-7">
                  <span className="eyebrow text-accent">{item.index}</span>
                  <h3 className="text-cream mt-4 text-lg font-semibold tracking-[-0.01em]">
                    {item.title}
                  </h3>
                  <p className="text-cream-dim mt-3 text-[0.9375rem] leading-relaxed">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>

        <Section>
          <Reveal className="panel bg-ink-raised flex flex-col justify-between gap-6 p-8 sm:flex-row sm:items-center sm:p-10">
            <div>
              <p className="eyebrow text-accent">{watch.eyebrow}</p>
              <h2 className="text-cream mt-3 max-w-xl text-2xl font-semibold tracking-[-0.01em] sm:text-3xl">
                {watch.heading}
              </h2>
              <p className="text-cream-dim mt-3 max-w-xl text-sm leading-relaxed">{watch.body}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {videoId && (
                <ActionLink
                  href={youtubeWatchUrl(videoId)}
                  className="btn btn-primary whitespace-nowrap"
                >
                  Watch the full setup
                  <ExternalIcon />
                </ActionLink>
              )}
              <ActionLink href="/#watch" className="btn btn-secondary whitespace-nowrap">
                Browse the playlists
                <ArrowIcon />
              </ActionLink>
            </div>
          </Reveal>
        </Section>

        <Section>
          <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-cream text-xl font-semibold tracking-[-0.01em]">
                Get the next system.
              </h2>
              <p className="text-cream-dim mt-2 text-sm">
                One message when a new breakdown is published, with the files from it.
              </p>
            </div>
            <a
              href="#top"
              className="btn btn-secondary whitespace-nowrap"
            >
              Sign up
              <ArrowIcon className="-rotate-90" />
            </a>
          </Reveal>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
