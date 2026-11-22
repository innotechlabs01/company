import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getDictionary, t } from "@/i18n/dictionary";

type HeroProps = {
  locale: "es" | "en";
};

export function Hero({ locale }: HeroProps) {
  const dict = getDictionary(locale);

  return (
    <section className="relative px-4 pt-20 pb-32 lg:pt-36 lg:pb-44 overflow-hidden" id="inicio">
      <div className="mx-auto container-x">
        <div className="text-center lg:max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1.5 mb-8 rounded-full border border-border bg-background text-xs font-medium text-muted-foreground tracking-wide uppercase font-mono">
            <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
            {t(dict, "hero.eyebrow", "Software development · Digital solutions · Technology")}
          </span>

          <h1 className="display-xl mb-8 tracking-tight text-foreground">
            {t(dict, "hero.title", "Transformo ideas en soluciones digitales que generan resultados.")}
          </h1>

          <p className="body-lg text-muted-foreground mb-12 max-w-xl mx-auto leading-relaxed">
            {t(dict, "hero.subtitle", "Diseño y desarrollo experiencias digitales, plataformas y sistemas a medida para emprendedores y empresas que buscan construir, escalar y transformar sus negocios mediante tecnología.")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href={`/${locale}/contacto`}>{t(dict, "hero.ctaPrimary", "Hablemos de tu proyecto")}</Link>
            </Button>
            <Button variant="outline" asChild size="lg" className="w-full sm:w-auto">
              <Link href={`/${locale}/#proyectos`}>{t(dict, "hero.ctaSecondary", "Explorar mi trabajo")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
