import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/constants";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
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
    images: ["/images/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
