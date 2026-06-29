import type { Metadata } from "next";
import type React from "react";
import { Saira } from "next/font/google";
import "@fontsource/barlow/100.css";
import "@fontsource/barlow/100-italic.css";
import "@fontsource/barlow/200.css";
import "@fontsource/barlow/200-italic.css";
import "@fontsource/barlow/300.css";
import "@fontsource/barlow/300-italic.css";
import "@fontsource/barlow/400.css";
import "@fontsource/barlow/400-italic.css";
import "@fontsource/barlow/500.css";
import "@fontsource/barlow/500-italic.css";
import "@fontsource/barlow/600.css";
import "@fontsource/barlow/600-italic.css";
import "@fontsource/barlow/700.css";
import "@fontsource/barlow/700-italic.css";
import "@fontsource/barlow/800.css";
import "@fontsource/barlow/800-italic.css";
import "@fontsource/barlow/900.css";
import "@fontsource/barlow/900-italic.css";
import "./globals.css";

const saira = Saira({
  subsets: ["latin"],
  variable: "--font-saira",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yeipi.vercel.app"),
  title: "El Yeipi",
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
    <html lang="es" className={saira.variable}>
      <body>{children}</body>
    </html>
  );
}
