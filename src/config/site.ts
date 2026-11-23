export const site = {
  name: "Anthony Rivera",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://anthonyrivera.dev",
  author: {
    name: "Anthony Rivera",
    role: "Software Developer & Technology Partner",
    email: "anthonyrivera51@icloud.com",
  },
  locales: ["es", "en"] as const,
  defaultLocale: "es" as const,
  paths: {
    home: "/",
    services: "/servicios",
    projects: "/proyectos",
    testimonials: "/testimonios",
    about: "/sobre-mi",
    contact: "/contacto",
  },
} as const;

export type Locale = (typeof site.locales)[number];

export function getLocalePath(path: string): string {
  const base = path.startsWith("/") ? path : `/${path}`;
  return base;
}
