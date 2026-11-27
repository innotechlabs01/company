import { MetadataRoute } from "next";
import { site } from "@/config/site";
import { services } from "@/data/services";

const locales = site.locales;
const staticRoutes = ["", "servicios", "contacto", "testimonios", "casos-de-estudio", "sobre-mi"];

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceRoutes = services.map((service) => `servicios/${service.slug}`);
  const routes = [...staticRoutes, ...serviceRoutes];

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${site.url}/${locale}/${route}`.replace(/\/+$/, "") || `${site.url}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: route === "" ? 1 : 0.8,
    })),
  );
}
