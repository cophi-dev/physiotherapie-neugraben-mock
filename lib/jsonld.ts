import { phoneE164, site } from "./site";

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Physiotherapy", "LocalBusiness"],
    "@id": `${site.url}/#praxis`,
    name: site.legalName,
    alternateName: site.name,
    slogan: site.tagline,
    description:
      "Mobile Physiotherapie in Neugraben und Umgebung – direkt bei Ihnen zu Hause oder in Ihrer Einrichtung.",
    url: site.url,
    logo: `${site.url}/icon.svg`,
    image: `${site.url}/og.png`,
    telephone: phoneE164,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.street,
      postalCode: site.postalCode,
      addressLocality: site.city,
      addressRegion: "Hamburg",
      addressCountry: "DE",
    },
    areaServed: [
      { "@type": "Place", name: site.district },
      ...site.areas.map((name) => ({ "@type": "Place", name: `Hamburg-${name}` })),
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    hasMap: site.mapsUrl,
  };
}
