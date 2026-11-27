import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug, Service, services } from "@/data/services";
import { site } from "@/config/site";
import { Button } from "@/components/ui/button";
import { getDictionary, t } from "@/i18n/dictionary";
import { cn } from "@/lib/utils";

type Locale = "es" | "en";

export async function generateStaticParams() {
  const langs: Locale[] = ["es", "en"];
  return services.flatMap((s) =>
    langs.map((locale) => ({ locale, slug: s.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const l = locale as Locale;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Servicio no encontrado" };

  return {
    metadataBase: new URL(site.url),
    title: service.name[l],
    description: service.description[l],
    alternates: {
      canonical: `${site.url}/${l}/servicios/${slug}`,
      languages: {
        es: `${site.url}/es/servicios/${slug}`,
        en: `${site.url}/en/servicios/${slug}`,
      },
    },
    openGraph: {
      title: `${service.name[l]} · ${site.name}`,
      description: service.description[l],
      url: `${site.url}/${l}/servicios/${slug}`,
      siteName: site.name,
      locale: l === "es" ? "es_CO" : "en_US",
      type: "website",
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const l = locale as Locale;
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  const dict = getDictionary(l);

  return (
    <section className="px-4 py-24 lg:py-32">
      <div className="mx-auto container-x">
        <nav className="mb-10 text-sm text-muted-foreground">
          <Breadcrumbs locale={locale} service={service} />
        </nav>
        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          <div>
            <h1 className="display-lg mb-6 tracking-tight text-foreground">
              {service.name[l]}
            </h1>
            <p className="body-lg text-muted-foreground leading-relaxed mb-8">
              {service.description[l]}
            </p>

            <div className="mb-10">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                {t(dict, "services.problem", "Problema que resuelve")}
              </h2>
              <p className="body text-muted-foreground leading-relaxed">
                {service.problem[l]}
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                {t(dict, "services.deliverables", "Entregables")}
              </h2>
              <ul className="space-y-3 text-muted-foreground leading-relaxed">
                {service.deliverables[l].map((d, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-10">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                {t(dict, "services.process", "Proceso")}
              </h2>
              <ol className="space-y-4 text-muted-foreground leading-relaxed">
                {service.process[l].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-[10px] font-bold shrink-0 mt-0.5 flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mb-10">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                {t(dict, "services.timeline", "Tiempos aproximados")}
              </h2>
              <p className="body text-muted-foreground leading-relaxed">
                {service.timeline[l]}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <CardCta
              locale={locale}
              service={service}
              dict={dict}
              variant="primary"
            />
            <CardCta
              locale={locale}
              service={service}
              dict={dict}
              variant="outline"
              href={`/${locale}/contacto`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Breadcrumbs({
  locale,
  service,
}: {
  locale: string;
  service: Service;
}) {
  const dict = getDictionary(locale as "es" | "en");
  const isEs = locale === "es";

  return (
    <ol className="flex items-center gap-2 text-xs text-muted-foreground">
      <li>
        <Link
          href={`/${locale}`}
          className="hover:text-foreground transition-colors"
        >
          {t(dict, "nav.home", "Inicio")}
        </Link>
      </li>
      <li className="flex items-center gap-2">
        <span aria-hidden="true">/</span>
        <Link
          href={`/${locale}/servicios`}
          className="hover:text-foreground transition-colors"
        >
          {t(dict, "nav.services", isEs ? "Servicios" : "Services")}
        </Link>
      </li>
      <li className="flex items-center gap-2">
        <span aria-hidden="true">/</span>
        <span>{service.name[locale as "es" | "en"]}</span>
      </li>
    </ol>
  );
}

function CardCta({
  locale,
  service,
  dict,
  variant,
  href,
}: {
  locale: string;
  service: Service;
  dict: ReturnType<typeof getDictionary>;
  variant: "primary" | "outline";
  href?: string;
}) {
  const isEs = locale === "es";
  return (
    <div
      className={cn(
        "rounded-xl border border-border p-8 text-center",
        variant === "primary"
          ? "bg-primary text-primary-foreground"
          : "bg-background text-foreground",
      )}
    >
      <h2 className="text-lg font-semibold mb-3">
        {variant === "primary"
          ? t(dict, "services.ctaTitle", "¿Listo para empezar?")
          : t(dict, "services.ctaTitleAlt", "Solicitar cotización")}
      </h2>
      <p
        className={cn(
          "text-sm mb-6",
          variant === "primary"
            ? "text-primary-foreground/80"
            : "text-muted-foreground",
        )}
      >
        {isEs
          ? "Conversemos sobre tu proyecto y definamos los próximos pasos."
          : "Let's talk about your project and define the next steps."}
      </p>
      <Button
        asChild
        size="lg"
        className="w-full"
        variant={variant === "primary" ? "secondary" : "outline"}
      >
        <a
          href={href ?? `mailto:anthonyrivera51@icloud.com`}
          className="flex items-center justify-center gap-2 w-full"
        >
          {variant === "primary"
            ? service.cta[isEs ? "es" : "en"]
            : t(dict, "services.requestQuote", "Solicitar cotización")}
        </a>
      </Button>
    </div>
  );
}
