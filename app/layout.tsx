import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import JsonLd from "./components/JsonLd";
import WhatsAppButton from "./components/WhatsAppButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://project-6o5rg.vercel.app";
const BASE_URL = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#DE3F0B",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "LogiNord – Sua Carga, Entregue com Precisão",
    template: "%s | LogiNord",
  },
  description:
    "Soluções de logística de ponta para empresas que não comprometem com qualidade, velocidade ou confiabilidade. Frete rodoviário, last-mile e carga especial.",
  keywords: [
    "logística",
    "frete",
    "transporte",
    "carga",
    "last-mile",
    "logística reversa",
    "carga frigorificada",
  ],
  authors: [{ name: "LogiNord" }],
  creator: "LogiNord",
  publisher: "LogiNord",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: BASE_URL,
    siteName: "LogiNord",
    title: "LogiNord – Sua Carga, Entregue com Precisão",
    description:
      "Soluções de logística de ponta para empresas que não comprometem com qualidade, velocidade ou confiabilidade.",
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "LogiNord – Logística de Precisão",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LogiNord – Sua Carga, Entregue com Precisão",
    description:
      "Soluções de logística de ponta para empresas que não comprometem com qualidade.",
    images: [`${BASE_URL}/og-image.jpg`],
    creator: "@loginord",
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${plusJakarta.variable}`}>
      <head>
        {/* Preconnect para Google Fonts (redundante mas seguro) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <JsonLd />
      </head>
      <body className="antialiased" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
