import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Play } from "lucide-react";
import { getDictionary, t } from "@/i18n/dictionary";
import { projects } from "@/data/projects";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { cn } from "@/lib/utils";

type ProjectsProps = {
  locale: "es" | "en";
};

const accentColors = ["#1688f8", "#0866c6", "#299bff"];

export function Projects({ locale }: ProjectsProps) {
  const dict = getDictionary(locale);

  return (
    <section className="px-4 py-24 lg:py-32" id="proyectos">
      <div className="mx-auto container-x">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-4">
          <div>
            <h2 className="display-lg mb-4 tracking-tight text-foreground">
              {t(dict, "projects.title", "Proyectos destacados")}
            </h2>
            <p className="body-lg text-muted-foreground text-sm max-w-md">
              {t(dict, "projects.subtitle", "Selección de trabajos realizados. Contenido de demostración hasta que se agreguen proyectos reales.")}
            </p>
          </div>
          <Link href={`/${locale}/#proyectos`} className="text-sm font-medium text-primary hover:underline transition-colors">
            Ver todos los proyectos
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const accent = accentColors[index % accentColors.length];
            return (
              <Card
                key={project.id}
                className={cn(
                  "border border-border overflow-hidden hover:shadow-md transition-colors group",
                  index % 2 === 0 ? "border-t-2 border-t-transparent" : "",
                  index % 2 === 0 ? `border-[${accent}]` : "",
                )}
              >
                <div className="relative h-60 overflow-hidden">
                  <ImagePlaceholder
                    width={800}
                    height={400}
                    label={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    variant="landscape"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  {project.demo && (
                    <span className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-white/20 bg-black/40 text-[10px] text-white font-medium">
                      <Play className="h-3 w-3" aria-hidden="true" />
                      {t(dict, "projects.demo", "Contenido de demostración")}
                    </span>
                  )}
                  <div className="absolute top-3 left-3 z-10 w-6 h-6 rounded-full bg-black/30 backdrop-blur" />
                </div>
                <CardHeader className="pt-5 pb-2">
                  <CardTitle className="text-base font-semibold leading-tight">
                    {project.name}
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground line-clamp-2 mt-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4 pb-6">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded border border-border/60 bg-muted text-[10px] font-medium text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">{project.type}</p>
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
