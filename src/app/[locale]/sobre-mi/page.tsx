import Link from "next/link";
import { Metadata } from "next";
import { BrandLogo } from "@/components/ui/brand-logo";
import { getDictionary, t } from "@/i18n/dictionary";
import { site } from "@/config/site";
import type { Locale } from "@/i18n/dictionary";

const aboutMeta: Record<Locale, { title: string; description: string }> = {
  es: {
    title: "Sobre mí",
    description:
      "Conoce a Anthony Rivera, desarrollador de software enfocado en soluciones tecnológicas funcionales, escalables y sostenibles.",
  },
  en: {
    title: "About me",
    description:
      "Meet Anthony Rivera, software developer focused on functional, scalable, and sustainable technology solutions.",
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
  const m = aboutMeta[locale] || aboutMeta.es;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `${site.url}/${locale}/sobre-mi`,
      languages: {
        es: `${site.url}/es/sobre-mi`,
        en: `${site.url}/en/sobre-mi`,
        "x-default": `${site.url}/es/sobre-mi`,
      },
    },
    openGraph: {
      title: `${m.title} · ${site.name}`,
      description: m.description,
      url: `${site.url}/${locale}/sobre-mi`,
      siteName: site.name,
      locale: locale === "es" ? "es_CO" : "en_US",
      type: "website",
    },
  };
}

export default async function SobreMiPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  const principles =
    locale === "en"
      ? [
          {
            icon: "Code2",
            title: "Senior-Led Delivery",
            description:
              "Direct technical leadership from architecture to production without unnecessary layers.",
          },
          {
            icon: "ShieldCheck",
            title: "Clean Architecture & QA",
            description:
              "Maintainable codebases, strict typing, and automated checks built for long-term scale.",
          },
          {
            icon: "Repeat",
            title: "Transparent Sprints",
            description:
              "Clear milestones, continuous demos, and measurable business outcomes every week.",
          },
        ]
      : [
          {
            icon: "Code2",
            title: "Ejecución Senior Directa",
            description:
              "Liderazgo técnico directo desde la arquitectura hasta producción, sin intermediarios innecesarios.",
          },
          {
            icon: "ShieldCheck",
            title: "Arquitectura Limpia y QA",
            description:
              "Código mantenible, tipado estricto y pruebas automatizadas pensadas para escalar.",
          },
          {
            icon: "Repeat",
            title: "Sprints Transparentes",
            description:
              "Entregables claros, demos continuas y foco constante en resultados de negocio.",
          },
        ];

  return (
    <section className="px-4 py-24 lg:py-32">
      <div className="mx-auto container-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 order-last lg:order-first">
            <div className="relative rounded-2xl border border-slate-800 bg-slate-950 p-7 sm:p-8 text-slate-100 shadow-xl overflow-hidden">
              <div
                className="pointer-events-none absolute -top-20 -left-20 h-56 w-56 rounded-full bg-primary/20 blur-3xl"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:28px_28px]"
                aria-hidden="true"
              />

              <div className="relative">
                <div className="flex items-center justify-between gap-3 pb-5 mb-6 border-b border-slate-800/80">
                  <div className="flex items-center gap-2.5">
                    <BrandLogo
                      variant="monogram"
                      mode="light"
                      width={24}
                      height={24}
                      className="shrink-0"
                      alt="AR"
                    />
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-200">
                      {t(dict, "about.eyebrow", "Principios de Ingeniería")}
                    </span>
                  </div>
                </div>

                <div className="space-y-5">
                  {principles.map((principle) => {
                    const Icon = principle.icon as keyof typeof import("lucide-react");
                    return (
                      <div
                        key={principle.title}
                        className="rounded-xl border border-slate-800/90 bg-slate-900/70 p-4"
                      >
                        <div className="flex items-start gap-3.5">
                          <div className="mt-0.5 h-8 w-8 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center text-sky-400 shrink-0">
                            {Icon === "Code2" && (
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
                            )}
                            {Icon === "ShieldCheck" && (
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            )}
                            {Icon === "Repeat" && (
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                            )}
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-white mb-1">
                              {principle.title}
                            </h3>
                            <p className="text-xs text-slate-400 leading-relaxed">
                              {principle.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2.5">
              <BrandLogo
                variant="monogram"
                mode="dark"
                width={20}
                height={20}
                className="shrink-0"
              />
              <span className="eyebrow text-primary">Anthony Rivera</span>
            </div>
            <h2 className="display-lg tracking-tight text-foreground">
              {t(dict, "about.title", "Detrás de cada solución, hay una visión.")}
            </h2>
            <p className="body-lg text-muted-foreground leading-relaxed">
              {t(
                dict,
                "about.intro",
                "Soy Anthony Rivera, desarrollador de software enfocado en transformar necesidades de negocio en soluciones tecnológicas funcionales, escalables y sostenibles.",
              )}
            </p>
            {t(
              dict,
              "about.body",
              "Me interesa construir productos que resuelvan problemas reales, combinando arquitectura de software, desarrollo, diseño de experiencias y visión de negocio.\n\nTrabajo con emprendedores y empresas en proyectos de diferentes dimensiones, desde desarrollos puntuales hasta plataformas tecnológicas y productos de largo recorrido.",
            )
              .split("\n\n")
              .map((paragraph, index) => (
                <p key={index} className="body-lg text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            <div className="mt-12 text-center">
              <Link
                href={`/${locale}/contacto`}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:border-primary/40 hover:bg-muted/60 transition-colors w-full sm:w-auto"
              >
                {t(dict, "contact.cta", "Hablemos de tu proyecto")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
