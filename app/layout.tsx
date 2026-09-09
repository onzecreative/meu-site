import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import JsonLd from "./components/JsonLd";
import WhatsAppButton from "./components/WhatsAppButton";
import CustomCursor from "./components/CustomCursor";
import { getSectionData } from "@/lib/services/section.service";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSectionData<any>("settings", { seo: {} });
  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL
        ? (process.env.NEXT_PUBLIC_SITE_URL.startsWith('http')
            ? process.env.NEXT_PUBLIC_SITE_URL
            : `https://${process.env.NEXT_PUBLIC_SITE_URL}`)
        : 'http://localhost:3000'
    ),
    title: {
      default: settings.seo.title || "Onze Negócios — Ecossistema Digital Completo",
      template: "%s | Onze Negócios",
    },
    description:
      settings.seo.description ||
      "Aceleramos o crescimento da sua empresa no digital. Marketing, IA, automação, websites e consultoria estratégica.",
    openGraph: {
      title: settings.seo.title,
      description: settings.seo.description,
      images: [settings.seo.ogImage || "/og-image.jpg"],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSectionData<any>("settings", { integrations: {} });

  return (
    <html lang="pt-BR" className={cn("font-sans", geist.variable)}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />

        {/* Aileron font via Bunny Fonts */}
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link
          href="https://fonts.bunny.net/css?family=aileron:100,200,300,400,600,700,900&display=swap"
          rel="stylesheet"
        />

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
      <body style={{ fontFamily: "'Aileron', sans-serif" }} className="antialiased">
        <CustomCursor />
        {children}
        <JsonLd />
        <WhatsAppButton />
        {settings.integrations.footerTags && (
          <script dangerouslySetInnerHTML={{ __html: settings.integrations.footerTags }} />
        )}
      </body>
    </html>
  );
}
