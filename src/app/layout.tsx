import type { Metadata } from "next";
import type React from "react";
import { Instrument_Sans } from "next/font/google";
import { siteUrl } from "@/lib/site-config";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "el yeipi",
  description:
    "Películas y fotografía para personas, marcas, lugares y momentos que merecen más que documentación.",
  openGraph: {
    images: ["/images/og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/og.jpg"],
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>π</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={instrumentSans.variable}>
      <body>{children}</body>
    </html>
  );
}
