import Link from "next/link";
import { Metadata } from "next";
import { getDictionary, t } from "@/i18n/dictionary";
import { site } from "@/config/site";
import { projects } from "@/data/projects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/i18n/dictionary";

const proyectosMeta: Record<Locale, { title: string; description: string }> = {
  es: {
    title: "Casos de estudio",
    description:
      "Conoce proyectos reales de desarrollo de software: problemas resueltos, soluciones aplicadas y resultados medibles.",
  },
  en: {
    title: "Case studies",
    description:
      "Discover real software development projects: problems solved, solutions applied, and measurable results.",
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
  const m = proyectosMeta[locale] || proyectosMeta.es;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `${site.url}/${locale}/casos-de-estudio`,
      languages: {
        es: `${site.url}/es/casos-de-estudio`,
        en: `${site.url}/en/casos-de-estudio`,
        "x-default": `${site.url}/es/casos-de-estudio`,
      },
    },
    openGraph: {
      title: `${m.title} · ${site.name}`,
      description: m.description,
      url: `${site.url}/${locale}/casos-de-estudio`,
      siteName: site.name,
      locale: locale === "es" ? "es_CO" : "en_US",
      type: "website",
    },
  };
}

export default async function CasosDeEstudioPage({
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
            {t(dict, "caseStudies.eyebrow", "Ingeniería Aplicada")}
          </p>
          <h1 className="display-lg mb-5 tracking-tight text-foreground">
            {t(dict, "caseStudies.title", "Casos de estudio")}
          </h1>
          <p className="body-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {t(dict, "caseStudies.subtitle", "De un problema a un resultado medible.")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {projects.map((project, index) => {
            const rawResult = project.result[locale];
            const isPlaceholderResult = rawResult.trim().toUpperCase().startsWith("TODO:");

            return (
              <Card
                key={project.id}
                className="bg-card border border-border hover:border-primary/40 hover:shadow-md transition-all overflow-hidden flex flex-col"
              >
                <CardHeader className="p-6 pb-3">
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-primary">
                      {project.type[locale]}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      CS-{String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <CardTitle className="text-lg font-semibold leading-snug text-foreground">
                    {project.name[locale]}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-1.5">
                    {project.description[locale]}
                  </p>
                </CardHeader>

                <CardContent className="p-6 pt-3 flex-1 flex flex-col justify-between gap-5">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-primary">
                        {t(dict, "caseStudies.problem", "Problema")}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {project.problem[locale]}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-primary">
                        {t(dict, "caseStudies.solution", "Solución")}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {project.solution[locale]}
                      </p>
                    </div>

                    {!isPlaceholderResult && (
                      <div className="rounded-lg border border-border/80 bg-muted/50 p-3 space-y-1">
                        <h3 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-foreground">
                          {t(dict, "caseStudies.result", "Resultado")}
                        </h3>
                        <p className="text-sm text-foreground/90 leading-relaxed font-medium">
                          {rawResult}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-border/80 bg-muted/60 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/${locale}/contacto`}
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline transition-colors"
                    >
                      {t(dict, "contact.cta", "Hablemos de tu proyecto")}
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Link
            href={`/${locale}/contacto`}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:border-primary/40 hover:bg-muted/60 transition-colors w-full sm:w-auto"
          >
            {t(dict, "contact.cta", "Hablemos de tu proyecto")}
          </Link>
        </div>
      </div>
    </section>
  );
}
