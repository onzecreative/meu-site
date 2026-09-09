import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LogiNord – Logística de Precisão",
    short_name: "LogiNord",
    description: "Soluções de logística de ponta para empresas que não comprometem com qualidade, velocidade ou confiabilidade.",
    start_url: "/",
    display: "standalone",
    background_color: "#111111",
    theme_color: "#DE3F0B",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
