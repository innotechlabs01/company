import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Layers, Smartphone, Globe } from "lucide-react";
import { projects } from "@/data/projects";
import { getDictionary, t } from "@/i18n/dictionary";

type CaseStudiesProps = {
  locale: "es" | "en";
};

const headerAccents = [
  "from-primary/25 via-sky-500/10 to-transparent",
  "from-indigo-500/25 via-primary/10 to-transparent",
  "from-emerald-500/20 via-primary/10 to-transparent",
];

const headerIcons = [Layers, Globe, Smartphone];

export function CaseStudies({ locale }: CaseStudiesProps) {
  const dict = getDictionary(locale);

  return (
    <section className="py-24 lg:py-28" id="casos-de-estudio">
      <div className="mx-auto container-x">
        <div className="text-center lg:max-w-2xl mx-auto mb-16">
          <p className="eyebrow text-primary mb-3">
            {t(dict, "caseStudies.eyebrow", "Ingeniería Aplicada")}
          </p>
          <h2 className="display-lg mb-5 tracking-tight text-foreground">
            {t(dict, "caseStudies.title", "Casos de estudio")}
          </h2>
          <p className="body-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {t(dict, "caseStudies.subtitle", "De un problema a un resultado medible.")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {projects.map((project, index) => {
            const AccentIcon = headerIcons[index % headerIcons.length];
            const accentGradient = headerAccents[index % headerAccents.length];
            const codeId = `CS-${String(index + 1).padStart(2, "0")}`;
            const rawResult = project.result[locale];
            const isPlaceholderResult = rawResult.trim().toUpperCase().startsWith("TODO:");

            return (
              <Card
                key={project.id}
                className="bg-card border border-border hover:border-primary/40 hover:shadow-md transition-all overflow-hidden flex flex-col"
              >
                {/* Custom engineering visual frame */}
                <div className="relative h-44 bg-slate-950 text-slate-100 p-5 flex flex-col justify-between overflow-hidden border-b border-border/60">
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accentGradient}`}
                    aria-hidden="true"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:24px_24px]"
                    aria-hidden="true"
                  />

                  <div className="relative flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-slate-700" />
                      <span className="h-2 w-2 rounded-full bg-slate-700" />
                      <span className="h-2 w-2 rounded-full bg-slate-700" />
                    </div>
                    <span className="font-mono text-[11px] text-slate-400">
                      {codeId}
                    </span>
                  </div>

                  <div className="relative flex items-end justify-between gap-3">
                    <div>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700/80 bg-slate-900/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-sky-300 mb-2">
                        {project.type[locale]}
                      </span>
                      <p className="font-mono text-xs text-slate-300">
                        {project.technologies.slice(0, 3).join(" · ")}
                      </p>
                    </div>
                    <div className="h-10 w-10 rounded-xl border border-slate-800 bg-slate-900/90 flex items-center justify-center text-sky-400 shrink-0">
                      <AccentIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                <CardHeader className="p-6 pb-3">
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

                    {project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline transition-colors"
                      >
                        {t(dict, "projects.viewProject", "Ver proyecto")}
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
