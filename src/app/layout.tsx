import type { Metadata } from "next";
import type React from "react";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";
import "./globals.css";

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
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
