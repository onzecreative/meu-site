import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://project-6o5rg.vercel.app";
  const baseUrl = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;

  const routes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/#services", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/#industries", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/#contact", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.6, changeFrequency: "weekly" as const },
    { path: "/carreiras", priority: 0.5, changeFrequency: "monthly" as const },
  ];

  return routes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
