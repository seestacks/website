import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ArrowIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { docs } from "@/content/docs";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "The full Seestack setup in text: the Obsidian vault, the symlinked config, agent memory, the Obsidian CLI, and the permissions that make it run.",
  alternates: { canonical: "/docs" },
};

export default function DocsPage() {
  return (
    <>
      <SiteHeader />

      <main id="main" className="flex-1">
        <section className="section-edge-bottom relative overflow-hidden">
          <div
            className="grid-field pointer-events-none absolute inset-0"
            aria-hidden="true"
          />

          <div className="container-page relative py-20 sm:py-24">
            <div className="max-w-3xl">
              <Reveal>
                <p className="eyebrow">Documentation</p>
                <h1 className="text-cream mt-6 text-[2.5rem] leading-[1.06] font-semibold tracking-[-0.03em] sm:text-[3.25rem]">
                  The whole setup, <span className="text-accent">in text.</span>
                </h1>
                <p className="text-cream-dim mt-6 max-w-xl text-lg leading-relaxed">
                  The same system as the videos, written down. Five guides take an
                  empty folder to a vault an agent can read, write and remember.
                </p>
              </Reveal>
            </div>

            <Reveal delay={100}>
              <ul className="mt-14 grid gap-3 sm:grid-cols-2">
                {docs.map((doc, index) => (
                  <li key={doc.slug} className="h-full">
                    <a
                      href={`/docs/${doc.slug}`}
                      className="panel hover:bg-panel-hi group flex h-full flex-col p-6 transition-colors sm:p-7"
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="text-accent font-mono text-xs">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <ArrowIcon className="text-muted group-hover:text-cream h-3.5 w-3.5 transition-colors" />
                      </div>
                      <h2 className="text-cream mt-6 text-xl font-semibold tracking-[-0.01em]">
                        {doc.title}
                      </h2>
                      <p className="text-cream-dim mt-2 text-sm leading-relaxed">
                        {doc.description}
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section>
          <div className="container-page py-16 sm:py-20">
            <Reveal className="grid gap-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
              <div>
                <p className="eyebrow">Before you start</p>
                <h2 className="text-cream mt-4 text-3xl font-semibold tracking-[-0.015em]">
                  What the guides assume.
                </h2>
              </div>

              <ul className="text-cream-dim max-w-2xl space-y-3 leading-relaxed">
                <li>macOS or Linux with a normal shell (the paths are the only thing that change).</li>
                <li>Obsidian desktop, opened once so it can register a vault.</li>
                <li>Claude Code installed, logged in, and running from the terminal.</li>
                <li>An empty folder you can turn into a vault. Nothing is deleted along the way.</li>
              </ul>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
