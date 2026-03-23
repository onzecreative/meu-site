import type { Metadata } from "next";
import { Urbanist, Inter } from "next/font/google";
import "./globals.css";
import JsonLd from "./components/JsonLd";
import WhatsAppButton from "./components/WhatsAppButton";
import CustomCursor from "./components/CustomCursor";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-urbanist",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

import { getSectionData } from "@/lib/services/section.service";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSectionData<any>("settings", { seo: {} });
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ? 
      (process.env.NEXT_PUBLIC_SITE_URL.startsWith('http') ? process.env.NEXT_PUBLIC_SITE_URL : `https://${process.env.NEXT_PUBLIC_SITE_URL}`) 
      : 'http://localhost:3000'),
    title: {
      default: settings.seo.title || "LogiNord - Cargas com Precisão e Segurança",
      template: "%s | LogiNord Integrada",
    },
    description: settings.seo.description || "Transporte confiável para a sua empresa.",
    openGraph: {
      title: settings.seo.title,
      description: settings.seo.description,
      images: [settings.seo.ogImage || "/og-image.jpg"],
    }
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSectionData<any>("settings", { integrations: {} });

  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        
        {/* Marketing Scripts (Head) */}
        {settings.integrations.googleAdsTag && (
          <script dangerouslySetInnerHTML={{ __html: settings.integrations.googleAdsTag }} />
        )}
        {settings.integrations.metaAdsTag && (
          <script dangerouslySetInnerHTML={{ __html: settings.integrations.metaAdsTag }} />
        )}
        {settings.integrations.headerTags && (
          <script dangerouslySetInnerHTML={{ __html: settings.integrations.headerTags }} />
        )}
      </head>
      <body className={`${urbanist.variable} ${inter.variable} font-inter antialiased`}>
        <CustomCursor />
        {children}
        <JsonLd />
        <WhatsAppButton />

        {/* Marketing Scripts (Footer) */}
        {settings.integrations.footerTags && (
          <script dangerouslySetInnerHTML={{ __html: settings.integrations.footerTags }} />
        )}
      </body>
    </html>
  );
}
