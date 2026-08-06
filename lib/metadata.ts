export function createMetadata(overrides: Partial<Metadata> = {}) {
  return {
    title: overrides.title ?? "Balance Hair Salon",
    description: overrides.description ?? "Luxury hair salon services with expert stylists and premium care.",
    openGraph: {
      title: overrides.openGraph?.title ?? "Balance Hair Salon",
      description: overrides.openGraph?.description ?? "Luxury hair salon services with expert stylists and premium care.",
      type: "website",
      ...(overrides.openGraph ?? {})
    },
    twitter: {
      card: "summary_large_image",
      title: overrides.twitter?.title ?? "Balance Hair Salon",
      description: overrides.twitter?.description ?? "Luxury hair salon services with expert stylists and premium care.",
      ...(overrides.twitter ?? {})
    },
    ...overrides
  };
}
