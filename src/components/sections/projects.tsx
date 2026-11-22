import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { getDictionary, t } from "@/i18n/dictionary";
import { projects } from "@/data/projects";

type ProjectsProps = {
  locale: "es" | "en";
};

export function Projects({ locale }: ProjectsProps) {
  const dict = getDictionary(locale);

  return (
    <section className="px-4 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-2">
              {t(dict, "projects.title", "Proyectos destacados")}
            </h2>
            <p className="text-muted-foreground text-sm">
              {t(dict, "projects.subtitle", "Selección de trabajos realizados. Contenido de demostración hasta que se agreguen proyectos reales.")}
            </p>
          </div>
          <Link href={`/${locale}/proyectos`} className="text-sm font-medium text-primary hover:underline">
            Ver todos los proyectos
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card key={index} className="group overflow-hidden">
              {project.image && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  {project.demo && (
                    <span className="absolute bottom-2 left-2 z-10 inline-flex items-center gap-1 px-2 py-1 rounded-md border border-white/20 bg-black/50 text-xs text-white">
                      {t(dict, "projects.demo", "Contenido de demostración")}
                    </span>
                  )}
                </div>
              )}
              <CardHeader className="pt-5">
                <CardTitle className="text-base font-semibold">{project.name}</CardTitle>
                <CardDescription className="text-xs text-muted-foreground line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 rounded border border-border/60 bg-background text-xs font-medium text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  {project.type}
                </p>
                {project.url ? (
                  <a
                    href={project.url}
                    className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
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
