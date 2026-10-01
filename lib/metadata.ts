import type { Metadata } from "next";
import { site } from "./site";

type OpenGraph = NonNullable<Metadata["openGraph"]>;

// Next.js replaces (not merges) openGraph per page, so every page spreads this base.
export function openGraph(page: { title: string; description?: string; url: string }): OpenGraph {
  return {
    type: "website",
    locale: "de_DE",
    siteName: site.name,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name} – ${site.owner}` }],
    ...page,
  };
}
