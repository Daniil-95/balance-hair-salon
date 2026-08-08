import type { Metadata } from "next";
import "../styles/globals.scss";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Balance Hair Salon | Kadeřnické studio",
  description: "Balance Hair Salon nabízí střihy, barvení, styling a profesionální péči o vlasy v příjemném salonu.",
  metadataBase: new URL("https://balance-hair-salon.example.com"),
  icons: {
    icon: "/favicon.ico"
  },
  openGraph: {
    title: "Balance Hair Salon",
    description: "Kadeřnické služby, barvení, styling a péče o vlasy v salonu Balance.",
    type: "website",
    url: "https://balance-hair-salon.example.com",
    siteName: "Balance Hair Salon"
  },
  twitter: {
    card: "summary_large_image",
    title: "Balance Hair Salon",
    description: "Kadeřnické služby a péče o vlasy v salonu Balance.",
    creator: "@balance_salon"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
