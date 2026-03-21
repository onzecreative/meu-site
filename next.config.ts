import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["sharp", "nodemailer"],
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utgtyhteclfcaihfoeiw.supabase.co",
      },
    ],
  },
  async headers() {
    return [
      {
        // Cache para arquivos em /public
        source: "/videos/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=3600",
          },
        ],
      },
      {
        // Headers de segurança básicos
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
