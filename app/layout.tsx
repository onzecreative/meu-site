import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LogiNord – Your Freight, Delivered with Precision",
  description: "Premium freight and logistics services across all industries. Real-time tracking, guaranteed delivery, 24/7 support.",
  keywords: "freight, logistics, shipping, transportation, supply chain",
  openGraph: {
    title: "LogiNord – Your Freight, Delivered with Precision",
    description: "Premium freight and logistics services across all industries.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
