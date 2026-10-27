import type { AnchorHTMLAttributes } from "react";

/**
 * An anchor that adds `target`/`rel` for absolute URLs and leaves in-page
 * hash links alone. Keeps every call site from repeating the same check.
 */
export function ActionLink({
  href,
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const isExternal = /^https?:/i.test(href);
  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
