import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ArrowIcon } from "@/components/ui/icons";
import { docs, getDocNeighbours } from "@/content/docs";
import type { DocPage } from "@/content/docs/types";
import { DocContent } from "./doc-content";

function navItemClass(active: boolean) {
  return `block whitespace-nowrap rounded-md border px-3 py-2 text-sm transition-colors ${
    active
      ? "border-hair bg-panel text-cream"
      : "text-cream-dim hover:text-cream border-transparent"
  }`;
}

/**
 * The documentation shell: guides on the left, the page in the middle, the
 * section list on the right. On a phone the list becomes one scrollable row,
 * so the guide still starts at the top of the screen.
 */
export function DocLayout({ doc }: { doc: DocPage }) {
  const { prev, next } = getDocNeighbours(doc.slug);

  return (
    <>
      <SiteHeader />

      <main id="main" className="flex-1">
        <div className="container-page grid gap-10 py-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-14 lg:py-16 xl:grid-cols-[15rem_minmax(0,1fr)_14rem]">
          <aside className="min-w-0">
            <nav aria-label="Documentation" className="lg:sticky lg:top-24 lg:h-fit">
              <p className="eyebrow hidden lg:block">Documentation</p>
              <ul className="no-scrollbars -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:mt-4 lg:grid lg:gap-1 lg:overflow-visible lg:px-0">
                <li>
                  <Link href="/docs" className={navItemClass(false)}>
                    Overview
                  </Link>
                </li>
                {docs.map((entry) => (
                  <li key={entry.slug}>
                    <a
                      href={`/docs/${entry.slug}`}
                      aria-current={entry.slug === doc.slug ? "page" : undefined}
                      className={navItemClass(entry.slug === doc.slug)}
                    >
                      {entry.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <article className="min-w-0 max-w-3xl">
            <nav
              aria-label="Breadcrumb"
              className="text-muted flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.12em] uppercase"
            >
              <Link href="/docs" className="hover:text-cream transition-colors">
                Docs
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-cream-dim">{doc.eyebrow}</span>
            </nav>

            <h1 className="text-cream mt-6 text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">
              {doc.title}
            </h1>
            <p className="text-cream-dim mt-5 text-lg leading-relaxed">{doc.lead}</p>

            <DocContent sections={doc.sections} />

            <nav
              aria-label="Documentation pages"
              className="border-hair mt-16 grid gap-3 border-t pt-8 sm:grid-cols-2"
            >
              {prev && (
                <Link
                  href={`/docs/${prev.slug}`}
                  className="panel hover:bg-panel-hi flex items-start gap-3 p-4 transition-colors"
                >
                  <ArrowIcon className="text-muted mt-1 h-3.5 w-3.5 shrink-0 rotate-180" />
                  <span>
                    <span className="text-muted block font-mono text-[0.625rem] tracking-[0.14em] uppercase">
                      Previous
                    </span>
                    <span className="text-cream mt-1 block text-sm font-medium">
                      {prev.title}
                    </span>
                  </span>
                </Link>
              )}
              {next && (
                <Link
                  href={`/docs/${next.slug}`}
                  className="panel hover:bg-panel-hi flex items-start gap-3 p-4 transition-colors sm:col-start-2 sm:flex-row-reverse sm:text-right"
                >
                  <ArrowIcon className="text-muted mt-1 h-3.5 w-3.5 shrink-0" />
                  <span>
                    <span className="text-muted block font-mono text-[0.625rem] tracking-[0.14em] uppercase">
                      Next
                    </span>
                    <span className="text-cream mt-1 block text-sm font-medium">
                      {next.title}
                    </span>
                  </span>
                </Link>
              )}
            </nav>
          </article>

          <aside className="hidden xl:block">
            <div className="sticky top-24">
              <p className="eyebrow">On this page</p>
              <ul className="mt-4 space-y-2 text-sm">
                {doc.sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-cream-dim hover:text-cream transition-colors"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
