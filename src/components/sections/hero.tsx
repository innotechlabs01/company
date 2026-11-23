import Link from "next/link";
import React from "react";
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
        className="relative px-4 pt-12 pb-20 sm:pt-16 sm:pb-24 lg:pt-24 lg:pb-32 overflow-hidden"
        id="inicio"
      >
        {/* Subtle radial glow and architectural grid accent */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(22,136,248,0.08),_transparent_60%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(22,136,248,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(22,136,248,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
          aria-hidden="true"
        />

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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="mb-6 sm:mb-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-muted/60 px-3.5 py-1.5 backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-primary shrink-0" aria-hidden="true" />
                  <span className="eyebrow text-muted-foreground tracking-[0.12em] sm:tracking-[0.16em]">
                    {t(dict, "hero.eyebrow", "Software development · Digital solutions")}
                  </span>
                </div>
              </div>

              <h1 className="display-xl mb-6 sm:mb-8 tracking-tight text-foreground">
                {highlightTitle(dict)}
              </h1>

              <p className="body-lg text-muted-foreground mb-9 sm:mb-12 max-w-xl leading-relaxed">
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

            {/* Tarjeta arquitectónica del monograma AR (conecta la intro con el landing) */}
            <div className="hidden lg:flex lg:col-span-5 justify-end">
              <div className="relative w-full max-w-[380px] rounded-2xl border border-border/80 bg-[#080B12] p-8 text-white shadow-xl overflow-hidden">
                <div
                  className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-[#1688F8]/20 blur-3xl"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"
                  aria-hidden="true"
                />
                <div className="relative flex flex-col items-center text-center py-6">
                  <svg
                    width={128}
                    height={128}
                    viewBox="0 0 64 64"
                    fill="none"
                    aria-hidden="true"
                    className="mb-6"
                  >
                    <path d="M18 58 L26 10 L36 58" stroke="#FFFFFF" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" />
                    <path d="M22 38 L30 38" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
                    <path d="M36 58 L36 14" stroke="#299BFF" strokeWidth="3.5" strokeLinecap="round" />
                    <path d="M36 14 Q44 14 44 26 Q44 36 36 36" stroke="#299BFF" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                    <path d="M36 36 L46 58" stroke="#299BFF" strokeWidth="3.5" strokeLinecap="round" />
                  </svg>
                  <p className="text-xl font-bold tracking-tight text-white">
                    Anthony Rivera
                  </p>
                  <div className="h-px w-12 bg-[#299BFF]/70 my-3" />
                  <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400 font-medium">
                    Software Developer &amp; Technology Partner
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionFade>
  );
}
