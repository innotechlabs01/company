import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { getDictionary, t } from "@/i18n/dictionary";
import { projects } from "@/data/projects";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

type ProjectsProps = {
  locale: "es" | "en";
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const reducedFadeUp = { hidden: { opacity: 1 }, show: { opacity: 1 } };

export function Projects({ locale }: ProjectsProps) {
  const dict = getDictionary(locale);
  const reduced = useReducedMotion();
  const variants = reduced ? reducedFadeUp : fadeUp;

  return (
    <section className="px-4 py-32 lg:py-40" id="proyectos">
      <div className="mx-auto container-x">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-4">
          <div>
            <motion.h2
              variants={variants}
              initial="hidden"
              animate="show"
              className="display-lg mb-4 tracking-tight text-foreground"
            >
              {t(dict, "projects.title", "Proyectos destacados")}
            </motion.h2>
            <motion.p
              variants={variants}
              initial="hidden"
              animate="show"
              className="body-lg text-muted-foreground text-sm max-w-md"
            >
              {t(dict, "projects.subtitle", "Selección de trabajos realizados. Contenido de demostración hasta que se agreguen proyectos reales.")}
            </motion.p>
          </div>
          <Link href={`/${locale}/#proyectos`} className="text-sm font-medium text-primary hover:underline transition-colors">
            Ver todos los proyectos
          </Link>
        </div>

        <motion.div
          variants={variants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -4 }}
              className="group"
            >
              <Card className="border border-border bg-card overflow-hidden">
                {project.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    {project.demo && (
                      <span className="absolute bottom-2 left-2 z-10 inline-flex items-center gap-1 px-2 py-1 rounded-md border border-white/20 bg-black/50 text-[10px] text-white">
                        {t(dict, "projects.demo", "Contenido de demostración")}
                      </span>
                    )}
                  </div>
                )}
                <CardHeader className="pt-5">
                  <CardTitle className="text-base font-semibold">{project.name}</CardTitle>
                  <CardDescription className="text-xs text-muted-foreground line-clamp-2 mt-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 rounded border border-border/60 bg-secondary text-xs font-medium text-secondary-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mb-4">
                    {project.type}
                  </p>
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
