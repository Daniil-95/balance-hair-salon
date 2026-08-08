import type { Metadata } from "next";

export function createMetadata(overrides: Partial<Metadata> = {}) {
  return {
    title: overrides.title ?? "Balance Hair Salon",
    description: overrides.description ?? "Kadeřnické služby, barvení, styling a profesionální péče o vlasy.",
    openGraph: {
      title: overrides.openGraph?.title ?? "Balance Hair Salon",
      description: overrides.openGraph?.description ?? "Kadeřnické služby, barvení, styling a profesionální péče o vlasy.",
      type: "website",
      ...(overrides.openGraph ?? {})
    },
    twitter: {
      card: "summary_large_image",
      title: overrides.twitter?.title ?? "Balance Hair Salon",
      description: overrides.twitter?.description ?? "Kadeřnické služby, barvení, styling a profesionální péče o vlasy.",
      ...(overrides.twitter ?? {})
    },
    ...overrides
  };
}
