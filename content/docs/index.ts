import { cliSetup } from "./cli";
import { memorySetup } from "./memory";
import { permissionsSetup } from "./permissions";
import { symlinkSetup } from "./symlinks";
import { vaultSetup } from "./vault";
import type { DocPage } from "./types";

/**
 * The guides, in reading order. The order is the sidebar, the prev/next links
 * and the sitemap, so it is defined once here.
 */
export const docs: DocPage[] = [
  vaultSetup,
  symlinkSetup,
  memorySetup,
  cliSetup,
  permissionsSetup,
];

export function getDoc(slug: string): DocPage | undefined {
  return docs.find((doc) => doc.slug === slug);
}

export function getDocNeighbours(slug: string): {
  prev?: DocPage;
  next?: DocPage;
} {
  const index = docs.findIndex((doc) => doc.slug === slug);
  if (index === -1) return {};

  return {
    prev: index > 0 ? docs[index - 1] : undefined,
    next: index < docs.length - 1 ? docs[index + 1] : undefined,
  };
}
