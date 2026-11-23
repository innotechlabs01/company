import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getDictionary, t } from "@/i18n/dictionary";

type CtaRepeatedProps = {
  locale: "es" | "en";
  position: "afterServices" | "afterProjects";
};

export function CtaRepeated({ locale, position }: CtaRepeatedProps) {
  const dict = getDictionary(locale);

  const config = {
    afterServices: {
      title: t(dict, "ctaRepeated.afterServices", "¿Tienes un proyecto en mente?"),
      description: t(
        dict,
        "ctaRepeated.afterServicesDesc",
        "Conversemos sobre lo que quieres construir y definamos los próximos pasos.",
      ),
    },
    afterProjects: {
      title: t(dict, "ctaRepeated.afterProjects", "¿Listo para tu próximo proyecto?"),
      description: t(
        dict,
        "ctaRepeated.afterProjectsDesc",
        "Hablemos de lo que quieres construir y encontremos la mejor manera de hacerlo realidad.",
      ),
    },
  }[position];

  return (
    <section className="px-4 py-20 lg:py-28 border-t border-border/60">
      <div className="mx-auto container-x">
        <div className="max-w-2xl mx-auto rounded-xl border border-border bg-card p-10 lg:p-16 text-center">
          <h2 className="display-lg mb-6 tracking-tight text-foreground">
            {config.title}
          </h2>
          <p className="body-lg text-muted-foreground leading-relaxed mb-10 max-w-lg mx-auto">
            {config.description}
          </p>
          <Button asChild size="lg" className="shadow-md shadow-primary/20">
            <Link href={`/${locale}/contacto`}>
              {t(dict, "ctaRepeated.button", "Hablemos de tu proyecto")}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
