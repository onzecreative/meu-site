import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import JsonLd from "./components/JsonLd";
import WhatsAppButton from "./components/WhatsAppButton";
import CustomCursor from "./components/CustomCursor";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ? 
    (process.env.NEXT_PUBLIC_SITE_URL.startsWith('http') ? process.env.NEXT_PUBLIC_SITE_URL : `https://${process.env.NEXT_PUBLIC_SITE_URL}`) 
    : 'http://localhost:3000'),
  title: {
    default: "LogiNord - Cargas com Precisão e Segurança",
    template: "%s | LogiNord Integrada",
  },
  description: "Transporte confiável para a sua empresa. Rastreamento em tempo real, abrangência nacional e soluções logísticas sob medida.",
  keywords: ["logística", "transporte rodoviário", "frete", "entregas", "supply chain", "distribuição"],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "LogiNord",
    title: "LogiNord Integrada",
    description: "Sua carga tratada com a máxima prioridade.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LogiNord Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LogiNord",
    description: "Transporte seguro e pontual.",
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body className={`${figtree.variable} font-figtree antialiased`}>
        <CustomCursor />
        {children}
        <JsonLd />
        <WhatsAppButton />
      </body>
    </html>
  );
}
