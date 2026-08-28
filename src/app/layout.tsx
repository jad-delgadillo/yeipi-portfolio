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
    "Contenido cinematográfico para mostrar la esencia de tu marca, tu espacio y la experiencia de estar ahí.",
  openGraph: {
    images: ["/images/og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/og.jpg"],
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
