import type { Metadata } from "next";
import "../styles/globals.scss";
import { Inter } from "next/font/google";
import { SiteShell } from "@/components/layout/site-shell";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Balance Hair Salon | Premium Salon Experience",
  description: "Balance hair salon offers luxury haircuts, color services, styling, and premium salon care in an elegant atmosphere.",
  metadataBase: new URL("https://balance-hair-salon.example.com"),
  icons: {
    icon: "/favicon.ico"
  },
  openGraph: {
    title: "Balance Hair Salon",
    description: "Luxury salon services for modern clients. Book online for premium haircuts, color, styling, and care.",
    type: "website",
    url: "https://balance-hair-salon.example.com",
    siteName: "Balance Hair Salon"
  },
  twitter: {
    card: "summary_large_image",
    title: "Balance Hair Salon",
    description: "Luxury salon services for modern clients.",
    creator: "@balance_salon"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
