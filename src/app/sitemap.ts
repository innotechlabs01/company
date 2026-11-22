import { MetadataRoute } from "next";

const SITE_URL = "https://anthonyrivera.dev";
const locales = ["es", "en"] as const;

const routes = ["", "contacto", "testimonios"];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${SITE_URL}/${locale}/${route}`.replace(/\/+$/, "") || `${SITE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: route === "" ? 1 : 0.8,
    })),
  );
}
