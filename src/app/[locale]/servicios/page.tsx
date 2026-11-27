import Link from "next/link";
import { Metadata } from "next";
import { getDictionary, t } from "@/i18n/dictionary";
import { site } from "@/config/site";
import { services } from "@/data/services";
import type { Locale } from "@/i18n/dictionary";

const serviciosMeta: Record<Locale, { title: string; description: string }> = {
  es: {
    title: "Servicios",
    description:
      "Descubre mis servicios de desarrollo de software a medida: web, móviles, software empresarial y consultoría tecnológica.",
  },
  en: {
    title: "Services",
    description:
      "Discover my custom software development services: web, mobile, enterprise software, and technology consulting.",
  },
};

export const generateStaticParams = () => {
  return [{ locale: "es" }, { locale: "en" }];
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const m = serviciosMeta[locale] || serviciosMeta.es;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `${site.url}/${locale}/servicios`,
      languages: {
        es: `${site.url}/es/servicios`,
        en: `${site.url}/en/servicios`,
        "x-default": `${site.url}/es/servicios`,
      },
    },
    openGraph: {
      title: `${m.title} · ${site.name}`,
      description: m.description,
      url: `${site.url}/${locale}/servicios`,
      siteName: site.name,
      locale: locale === "es" ? "es_CO" : "en_US",
      type: "website",
    },
  };
}

export default async function ServiciosPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <section className="px-4 py-24 lg:py-32">
      <div className="mx-auto container-x">
        <div className="text-center lg:max-w-2xl mx-auto mb-16">
          <p className="eyebrow text-primary mb-3">
            {t(dict, "services.eyebrow", "Capacidades")}
          </p>
          <h1 className="display-lg mb-5 tracking-tight text-foreground">
            {t(dict, "services.title", "Soluciones digitales para cada etapa de tu negocio.")}
          </h1>
          <p className="body-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {t(
              dict,
              "services.subtitle",
              locale === "en"
                ? "Solutions designed to support your business growth at every stage."
                : "Soluciones diseñadas para acompañar el crecimiento de tu negocio en cada etapa.",
            )}
          </p>
        </div>

        <nav className="mb-16 flex flex-wrap justify-center gap-2 text-sm font-medium text-muted-foreground">
          {services.map((service) => {
            const isEs = locale === "es";
            const isCurrent = false;
            return (
              <Link
                key={service.slug}
                href={`/${locale}/servicios/${service.slug}`}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  isCurrent
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:bg-muted hover:text-foreground"
                }`}
              >
                {service.name[isEs ? "es" : "en"]}
              </Link>
            );
          })}
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <article
              key={service.slug}
              className="bg-card border border-border rounded-xl p-8 hover:border-primary/40 hover:shadow-md transition-all flex flex-col"
            >
              <div className="mb-5">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
                  {service.slug}
                </span>
                <h3 className="text-lg font-semibold mt-2 tracking-tight text-foreground">
                  {service.name[locale]}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                {service.description[locale]}
              </p>
              <Link
                href={`/${locale}/servicios/${service.slug}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline transition-colors mt-auto"
              >
                {t(dict, "services.viewDetails", "Ver detalles")}
                <span className="h-3 w-3" aria-hidden="true">›</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
