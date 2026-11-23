import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import { getDictionary, t } from "@/i18n/dictionary";

type CaseStudiesProps = {
  locale: "es" | "en";
};

export function CaseStudies({ locale }: CaseStudiesProps) {
  const dict = getDictionary(locale);

  return (
    <section className="px-4 py-24 lg:py-32 border-t border-border/60" id="casos-de-estudio">
      <div className="mx-auto container-x">
        <div className="text-center lg:max-w-2xl mx-auto mb-20">
          <h2 className="display-lg mb-6 tracking-tight text-foreground">
            {t(dict, "caseStudies.title", "Casos de estudio")}
          </h2>
          <p className="body-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {t(dict, "caseStudies.subtitle", "De un problema a un resultado medible.")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="border border-border hover:shadow-md transition-colors overflow-hidden"
            >
              <div className="h-48 overflow-hidden relative">
                <Image
                  src={project.image ?? "/brand/anthony-rivera-monogram.svg"}
                  alt={project.name[locale]}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  priority={false}
                />
              </div>
              <CardHeader className="pt-5 pb-2">
                <CardTitle className="text-base font-semibold leading-tight">
                  {project.name[locale]}
                </CardTitle>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-2">
                  {project.description[locale]}
                </p>
              </CardHeader>
              <CardContent className="pt-4 pb-6">
                <div className="space-y-3 mb-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {t(dict, "caseStudies.problem", "Problema")}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.problem[locale]}
                  </p>
                </div>
                <div className="space-y-3 mb-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {t(dict, "caseStudies.solution", "Solución")}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.solution[locale]}
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {t(dict, "caseStudies.result", "Resultado")}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.result[locale]}
                  </p>
                </div>
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline transition-colors"
                  >
                    {t(dict, "projects.viewProject", "Ver proyecto")} <ExternalLink className="h-3 w-3" />
                  </a>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
