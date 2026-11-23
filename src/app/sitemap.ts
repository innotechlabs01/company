import { MetadataRoute } from "next";
import { site } from "@/config/site";

const locales = site.locales;
const routes = ["", "contacto", "testimonios"];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${site.url}/${locale}/${route}`.replace(/\/+$/, "") || `${site.url}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: route === "" ? 1 : 0.8,
    })),
  );
}
