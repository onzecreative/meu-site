/**
 * Componente de servidor que injeta dados estruturados JSON-LD no <head>.
 * Inclui: Organization, WebSite (com SearchAction para sitelinks), LocalBusiness.
 */
export default function JsonLd() {
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://project-6o5rg.vercel.app";
  const baseUrl = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LogiNord",
    url: baseUrl,
    logo: `${baseUrl}/favicon.ico`,
    description:
      "Soluções de logística de ponta para empresas que não comprometem com qualidade, velocidade ou confiabilidade.",
    sameAs: [
      "https://www.linkedin.com/company/loginord",
      "https://www.instagram.com/loginord",
      "https://twitter.com/loginord",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+55-11-3000-4000",
      contactType: "customer service",
      availableLanguage: "Portuguese",
      areaServed: "BR",
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "LogiNord",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/busca?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "LogiNord",
    image: `${baseUrl}/favicon.ico`,
    url: baseUrl,
    telephone: "+55-11-3000-4000",
    email: "contato@loginord.com.br",
    address: {
      "@type": "PostalAddress",
      addressLocality: "São Paulo",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    priceRange: "$$",
    openingHours: "Mo-Su 00:00-23:59",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
    </>
  );
}
