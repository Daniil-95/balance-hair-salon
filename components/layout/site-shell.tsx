import type { ReactNode } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

interface SiteShellProps {
  children: ReactNode;
  headerBrandName?: string;
  headerBrandSub?: string;
  headerCtaLabel?: string;
  headerCtaUrl?: string;
  footerBrandName?: string;
  footerNote?: string;
}

export function SiteShell({
  children,
  headerBrandName,
  headerBrandSub,
  headerCtaLabel,
  headerCtaUrl,
  footerBrandName,
  footerNote,
}: SiteShellProps) {
  return (
    <div>
      <Header brandName={headerBrandName} brandSub={headerBrandSub} ctaLabel={headerCtaLabel} ctaUrl={headerCtaUrl} />
      <main>{children}</main>
      <Footer brandName={footerBrandName} note={footerNote} />
    </div>
  );
}
