export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ki-benefits",
    url: "https://ki-benefits.de",
    logo: "https://ki-benefits.de/logo.png",
    description:
      "Ihr Partner für aktuelle Informationen und Insights zu Künstlicher Intelligenz und deren praktischen Anwendungen.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+49-123-456789",
      contactType: "customer service",
      email: "info@ki-benefits.de",
      availableLanguage: "German",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Berlin",
      addressCountry: "DE",
    },
    sameAs: ["https://ki-benefits.de"],
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ki-benefits",
    url: "https://ki-benefits.de",
    description: "Entdecken Sie die neuesten KI-Entwicklungen und Anwendungen im privaten und industriellen Bereich.",
    inLanguage: "de-DE",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://ki-benefits.de/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Startseite",
        item: "https://ki-benefits.de",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "KI-Entwicklungen",
        item: "https://ki-benefits.de/#entwicklungen",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "KI-Anwendungen",
        item: "https://ki-benefits.de/#anwendungen",
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  )
}
