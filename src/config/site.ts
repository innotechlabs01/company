export const site = {
  name: "Anthony Rivera",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://anthonyrivera.dev",
  author: {
    name: "Anthony Rivera",
    role: "Software Developer & Technology Partner",
    email: "anthonyrivera51@icloud.com",
  },
  contact: {
    phone: "+573128386640",
    phoneDisplay: {
      es: "+57 312 8386640",
      en: "+57 312 8386640",
    },
    email: "anthonyrivera51@icloud.com",
    whatsapp: "https://wa.me/573128386640",
  },
  locales: ["es", "en"] as const,
  defaultLocale: "es" as const,
  paths: {
    home: "/",
    services: "/servicios",
    projects: "/casos-de-estudio",
    testimonials: "/testimonios",
    about: "/sobre-mi",
    contact: "/contacto",
  },
  social: {
    linkedin: "https://linkedin.com/in/anthonyrivera",
    github: "https://github.com/anthonyrivera",
    whatsapp: "https://wa.me/573128386640",
  },
} as const;

export function getContactPhone(locale: (typeof site.locales)[number]): string {
  return site.contact.phoneDisplay[locale] ?? site.contact.phone;
}

export type Locale = (typeof site.locales)[number];

export function getLocalePath(path: string): string {
  const base = path.startsWith("/") ? path : `/${path}`;
  return base;
}
