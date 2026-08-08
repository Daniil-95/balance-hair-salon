"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, PropsWithChildren } from "react";

interface SiteLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  className?: string;
}

export function SiteLink({ href, className, children, ...props }: PropsWithChildren<SiteLinkProps>) {
  const isHashLink = href.startsWith("/#") || href.startsWith("#");

  if (isHashLink) {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  );
}
