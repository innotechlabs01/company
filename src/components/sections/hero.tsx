import Link from "next/link";
import React from "react";
import { BrandLogo } from "@/components/ui/brand-logo";
import { Button } from "@/components/ui/button";
import { SectionFade } from "@/components/ui/section-fade";
import { getDictionary, t } from "@/i18n/dictionary";
type HeroProps = {
  locale: "es" | "en";
};

function highlightTitle(dict: Record<string, unknown>) {
  const title: string = t(dict, "hero.title", "");
  const highlight: string = t(dict, "hero.titleHighlight", "");
  if (!highlight) return <span>{title}</span>;
  const parts = title.split(highlight);
  if (parts.length < 2) return <span>{title}</span>;
  return (
    <span>
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {part}
          {i < parts.length - 1 && <span className="highlight">{highlight}</span>}
        </React.Fragment>
      ))}
    </span>
  );
}

export function Hero({ locale }: HeroProps) {
  const dict = getDictionary(locale);

  return (
    <SectionFade delay={0}>
      <section
        className="relative px-4 pt-16 pb-24 lg:pt-24 lg:pb-32 overflow-hidden"
        id="inicio"
      >
        {/* Decoración geométrica sutil inspirada en el monograma (solo escritorio). */}
        <div className="hidden lg:block absolute top-0 right-0 w-[700px] h-[700px] -mt-20 -mr-20 overflow-hidden pointer-events-none">
          <div className="relative w-full h-full">
            <div
              className="absolute top-1/3 right-1/5 w-32 h-32 rounded-full border border-primary/10"
            />
            <div
              className="absolute bottom-1/4 right-1/6 w-40 h-40 rounded-full border border-primary/10"
            />
            <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[1px] h-[300px] bg-primary/20" />
          </div>
        </div>

        <div className="mx-auto container-x relative">
          <div className="lg:max-w-3xl">
            <div className="flex items-center gap-3 mb-8">
              <BrandLogo
                variant="monogram"
                mode="dark"
                width={22}
                height={22}
                className="shrink-0"
                alt="Monograma AR"
              />
              <span className="eyebrow text-muted-foreground">
                {t(dict, "hero.eyebrow", "Software development · Digital solutions")}
              </span>
            </div>

            <h1 className="display-xl mb-10 tracking-tight text-foreground">
              {highlightTitle(dict)}
            </h1>

            <p className="body-lg text-muted-foreground mb-14 max-w-lg leading-relaxed">
              {t(
                dict,
                "hero.subtitle",
                "Diseño y desarrollo experiencias digitales, plataformas y sistemas a medida para emprendedores y empresas que buscan construir, escalar y transformar sus negocios mediante tecnología.",
              )}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto shadow-md shadow-primary/20">
                <Link href={`/${locale}/contacto`}>
                  {t(dict, "hero.ctaPrimary", "Hablemos de tu proyecto")}
                </Link>
              </Button>
              <Button variant="outline" asChild size="lg" className="w-full sm:w-auto">
                <Link href={`/${locale}/#proyectos`}>
                  {t(dict, "hero.ctaSecondary", "Explorar proyectos")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SectionFade>
  );
}
