import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import JsonLd from "./components/JsonLd";
import WhatsAppButton from "./components/WhatsAppButton";
import CustomCursor from "./components/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://project-6o5rg.vercel.app";
const BASE_URL = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111111",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "LogiNord – Sua Carga, Entregue com Precisão",
    template: "%s | LogiNord",
  },
  description: "Soluções de logística de ponta focadas em precisão e rastreamento em tempo real. Frete seguro e rápido global e regional.",
  keywords: ["logística", "frete", "transporte internacional", "rastreamento em tempo real", "cadeia de suprimentos"],
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: BASE_URL,
    siteName: "LogiNord",
    title: "LogiNord – Sua Carga, Entregue com Precisão",
    description: "Soluções de logística de ponta focadas em precisão e rastreamento em tempo real.",
    images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630, alt: "LogiNord" }],
  },
  robots: "index, follow",
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <JsonLd />
      </head>
      <body className="antialiased bg-white text-[#111111] font-inter overflow-x-hidden">
        <CustomCursor />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
