"use client";

import { site } from "@/config/site";

type JsonLdProps = {
  locale: string;
};

export function JsonLd({ locale }: JsonLdProps) {
  const isEs = locale === "es";
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.author.name,
    jobTitle: site.author.role,
    url: site.url,
    email: site.author.email,
    sameAs: [
      "https://linkedin.com/in/anthonyrivera",
      "https://github.com/anthonyrivera",
      "https://wa.me/573128386640",
    ],
  };

  const professionalService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.author.name,
    description:
      isEs
        ? "Desarrollo de software a medida, aplicaciones web y móviles, y consultoría tecnológica para emprendedores y empresas."
        : "Custom software development, web and mobile applications, and technology consulting for entrepreneurs and companies.",
    url: site.url,
    telephone: "+573128386640",
    email: site.author.email,
    areaServed: ["CO", "US", "LatAm"],
    serviceType: [
      "Web Development",
      "Mobile Development",
      "Custom Software",
      "Technology Consulting",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: isEs ? "Servicios" : "Services",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "CO",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: 0,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalService) }}
      />
    </>
  );
}
