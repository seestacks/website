import { latestWatchHref } from "@/content/featured";
import { links } from "@/content/links";
import { ActionLink } from "../ui/action-link";
import { HeroShowcase } from "./hero-showcase";
import { GitHubIcon, PlayIcon } from "../ui/icons";
import { Reveal } from "../ui/reveal";

const trust = ["MIT licensed", "Stock Claude Code", "Obsidian-native", "One command"];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Decorative grid field behind the hero content. */}
      <div className="grid-field pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* Single soft accent bloom behind the product frame. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-[-12%] hidden h-[40rem] w-[40rem] rounded-full opacity-25 blur-[140px] lg:block"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent) 0%, transparent 68%)",
        }}
      />

      <div className="container-page relative grid gap-16 pt-16 pb-20 sm:pt-24 sm:pb-24 xl:grid-cols-[minmax(0,34rem)_minmax(0,1fr)] xl:items-center xl:gap-12">
        <Reveal>
          <p className="eyebrow text-[0.5625rem] tracking-[0.12em] sm:text-[0.6875rem] sm:tracking-[0.16em]">
            AI workflows · Developer tools · Automation
          </p>

          <h1 className="text-cream mt-6 text-[2.5rem] leading-[1.06] font-semibold tracking-[-0.03em] sm:text-[3.25rem] lg:text-[3.5rem]">
            See how the system{" "}
            <span className="text-accent">actually works.</span>
          </h1>

          <p className="text-cream-dim mt-6 max-w-lg text-lg leading-relaxed">
            Real AI workflows, developer tools and automation, demonstrated
            through systems that run.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            {links.repo ? (
              <ActionLink href={links.repo} className="btn btn-primary">
                <GitHubIcon />
                Get the vault, free
              </ActionLink>
            ) : (
              <a href="/setup" className="btn btn-primary">
                Get the vault, free
              </a>
            )}
            <ActionLink href={latestWatchHref} className="btn btn-secondary">
              <PlayIcon />
              Watch the build
            </ActionLink>
          </div>

          <ul className="border-hair mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t pt-5">
            {trust.map((item) => (
              <li
                key={item}
                className="text-muted font-mono text-[0.6875rem] tracking-[0.12em] uppercase"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120} className="mx-auto w-full max-w-2xl xl:max-w-none">
          <HeroShowcase />
        </Reveal>
      </div>
    </section>
  );
}
