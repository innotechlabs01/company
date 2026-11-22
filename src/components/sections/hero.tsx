import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getDictionary, t } from "@/i18n/dictionary";

type HeroProps = {
  locale: "es" | "en";
};

export function Hero({ locale }: HeroProps) {
  const dict = getDictionary(locale);

  return (
    <section className="relative px-4 py-20 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="text-center lg:max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 mb-6 rounded-full border border-border bg-background text-xs font-medium text-muted-foreground tracking-wide uppercase">
            {t(dict, "hero.eyebrow", "Desarrollo de software · Soluciones digitales · Tecnología")}
          </span>
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight mb-6">
            {t(dict, "hero.title", "Transformo ideas en soluciones digitales que generan resultados.")}
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
            {t(dict, "hero.subtitle", "Diseño y desarrollo experiencias digitales, plataformas y sistemas a medida para emprendedores y empresas que buscan construir, escalar y transformar sus negocios mediante tecnología.")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href={`/${locale}/contacto`}>{t(dict, "hero.ctaPrimary", "Hablemos de tu proyecto")}</Link>
            </Button>
            <Button variant="outline" asChild size="lg" className="w-full sm:w-auto">
              <Link href={`/${locale}/proyectos`}>{t(dict, "hero.ctaSecondary", "Explorar mi trabajo")}</Link>
            </Button>
          </div>
        </div>

        <div className="mt-20 lg:mt-28 relative h-64 lg:h-80 mx-auto max-w-[600px]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-primary/5 border border-primary/10 blur-sm"
              ></div>
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary"
              ></div>
              {[1, 2, 3, 4, 5, 6].map((i) => {
                const angle = (i * 60) * (Math.PI / 180);
                const x = Math.cos(angle);
                const y = Math.sin(angle);
                return (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-accent"
                    style={{
                      transform: `translate(calc(-50% + ${x * 100}px), calc(-50% + ${y * 100}px))`,
                    }}
                  />
                );
              })}
              <svg
                className="absolute inset-0 w-full h-full"
                width="600"
                height="400"
                stroke="currentColor"
                strokeOpacity="0.1"
                strokeWidth="1"
              >
                <line x1="300" y1="200" x2="426" y2="293" />
                <line x1="300" y1="200" x2="326" y2="293" />
                <line x1="300" y1="200" x2="174" y2="293" />
                <line x1="300" y1="200" x2="426" y2="107" />
                <line x1="300" y1="200" x2="326" y2="107" />
                <line x1="300" y1="200" x2="174" y2="107" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
