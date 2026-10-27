import { links } from "@/content/links";
import { nav } from "@/content/site";
import { ActionLink } from "../ui/action-link";
import { GitHubIcon } from "../ui/icons";
import { MobileNav } from "./mobile-nav";
import { Wordmark } from "../ui/wordmark";

export function SiteHeader() {
  return (
    <header className="border-hair bg-ink/85 sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <a href="/#top" aria-label="Seestack, home" className="rounded-sm">
          <Wordmark />
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-cream-dim hover:text-cream text-sm transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/#subscribe"
            className="btn btn-secondary btn-sm hidden lg:inline-flex"
          >
            Subscribe
          </a>
          {links.repo && (
            <ActionLink
              href={links.repo}
              className="btn btn-primary btn-sm hidden lg:inline-flex"
            >
              <GitHubIcon />
              Get the vault
            </ActionLink>
          )}
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
