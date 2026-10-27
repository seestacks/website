import { links } from "@/content/links";
import { nav, site } from "@/content/site";
import { ActionLink } from "../ui/action-link";
import { Wordmark } from "../ui/wordmark";

/**
 * Renders a real link when a destination is configured in
 * `content/links.ts`, and an honest "soon" placeholder when it is not.
 */
function FooterLink({ label, href }: { label: string; href: string | null }) {
  if (!href) {
    return (
      <span className="text-muted/70 inline-flex items-center gap-2 text-sm">
        {label}
        <span className="border-hair text-muted/70 rounded border px-1.5 py-px font-mono text-[0.625rem] tracking-wide uppercase">
          soon
        </span>
      </span>
    );
  }
  return (
    <ActionLink
      href={href}
      className="text-cream-dim hover:text-cream text-sm transition-colors"
    >
      {label}
    </ActionLink>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="eyebrow">{title}</h2>
      <ul className="mt-4 flex flex-col gap-3">{children}</ul>
    </div>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="section-edge mt-auto">
      <div className="container-page py-14 sm:py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Wordmark />
            <p className="text-muted mt-4 max-w-xs text-sm leading-relaxed">
              {site.tagline} Real AI workflows, developer tools, and automation,
              demonstrated through working systems.
            </p>
          </div>

          <FooterColumn title="Explore">
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
          </FooterColumn>

          <FooterColumn title="Elsewhere">
            <li>
              <FooterLink label="YouTube" href={links.youtube} />
            </li>
            <li>
              <FooterLink label="GitHub" href={links.github} />
            </li>
            <li>
              <FooterLink label="LinkedIn" href={links.linkedin} />
            </li>
            <li>
              <FooterLink label="Instagram" href={links.instagram} />
            </li>
            <li>
              <FooterLink label="X" href={links.x} />
            </li>
            <li>
              <FooterLink label="Bluesky" href={links.bsky} />
            </li>
          </FooterColumn>

          <FooterColumn title="More">
            <li>
              <FooterLink label="Subscribe" href="/#subscribe" />
            </li>
            <li>
              <FooterLink label="Privacy" href={links.privacy} />
            </li>
            <li>
              <FooterLink
                label="Contact"
                href={links.contactEmail ? `mailto:${links.contactEmail}` : null}
              />
            </li>
          </FooterColumn>
        </div>

        <div className="border-hair mt-12 flex flex-col gap-2 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted font-mono text-xs">
            © {year} {site.name}
          </p>
          <p className="text-muted font-mono text-xs">
            Built by Seestack
          </p>
        </div>
      </div>
    </footer>
  );
}
