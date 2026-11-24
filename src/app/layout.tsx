import type { Metadata, Viewport } from "next";
import { Alexandria, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/constants";

// Alexandria's geometric cuts match the angles of the mark.
const head = Alexandria({
  variable: "--font-head",
  subsets: ["arabic", "latin"],
  weight: ["600", "700", "800"],
});

const body = IBM_Plex_Sans_Arabic({
  variable: "--font-body",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: `${SITE.name} | استثمر بثقة عبر تطبيقنا الذكي`,
  description: SITE.description,
  keywords: [
    "اللكيك للاستثمار",
    "استثمار في العراق",
    "شركة استثمار عراقية",
    "بابل المسيب",
    "تطبيق استثمار",
  ],
  openGraph: {
    title: `${SITE.name} | استثمر بثقة عبر تطبيقنا الذكي`,
    description: SITE.description,
    locale: "ar_IQ",
    type: "website",
    images: [{ url: "/images/og.png", width: 1200, height: 630 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#6d28d9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${head.variable} ${body.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
