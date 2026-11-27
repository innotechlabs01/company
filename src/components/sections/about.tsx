import { CheckCircle2, Code2, ShieldCheck, Repeat } from "lucide-react";
import Image from "next/image";
import { BrandLogo } from "@/components/ui/brand-logo";
import { getDictionary, t } from "@/i18n/dictionary";
import { cn } from "@/lib/utils";

type AboutProps = {
  locale: "es" | "en";
};

export function About({ locale }: AboutProps) {
  const dict = getDictionary(locale);

  const items =
    locale === "en"
      ? [
          {
            icon: Code2,
            title: t(dict, "about.principles.seniorLed.title", "Senior-Led Delivery"),
            description: t(
              dict,
              "about.principles.seniorLed.desc",
              "Direct technical leadership from architecture to production without unnecessary layers.",
            ),
          },
          {
            icon: ShieldCheck,
            title: t(dict, "about.principles.cleanArch.title", "Clean Architecture & QA"),
            description: t(
              dict,
              "about.principles.cleanArch.desc",
              "Maintainable codebases, strict typing, and automated checks built for long-term scale.",
            ),
          },
          {
            icon: Repeat,
            title: t(dict, "about.principles.transparent.title", "Transparent Sprints"),
            description: t(
              dict,
              "about.principles.transparent.desc",
              "Clear milestones, continuous demos, and measurable business outcomes every week.",
            ),
          },
        ]
      : [
          {
            icon: Code2,
            title: t(dict, "about.principles.seniorLed.title", "Ejecución Senior Directa"),
            description: t(
              dict,
              "about.principles.seniorLed.desc",
              "Liderazgo técnico directo desde la arquitectura hasta producción, sin intermediarios innecesarios.",
            ),
          },
          {
            icon: ShieldCheck,
            title: t(dict, "about.principles.cleanArch.title", "Arquitectura Limpia y QA"),
            description: t(
              dict,
              "about.principles.cleanArch.desc",
              "Código mantenible, tipado estricto y pruebas automatizadas pensadas para escalar.",
            ),
          },
          {
            icon: Repeat,
            title: t(dict, "about.principles.transparent.title", "Sprints Transparentes"),
            description: t(
              dict,
              "about.principles.transparent.desc",
              "Entregables claros, demos continuas y foco constante en resultados de negocio.",
            ),
          },
        ];

  return (
    <section className="py-24 lg:py-28" id="sobre-mi">
      <div className="mx-auto container-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: photo + intro */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative">
              <Image
                src="/images/profile.jpg"
                alt={t(dict, "about.photoAlt", "Anthony Rivera")}
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="rounded-2xl object-cover border border-border/60 shadow-lg"
                priority
              />
              <div className="absolute -right-4 -bottom-4 flex items-center gap-2 rounded-full border border-border bg-card p-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
                <span className="text-xs font-semibold text-foreground">
                  {t(dict, "about.available", "Disponible para nuevos proyectos")}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <BrandLogo variant="monogram" mode="dark" width={20} height={20} className="shrink-0" />
                <span className="eyebrow text-primary">Anthony Rivera</span>
              </div>
              <h2 className="display-lg tracking-tight text-foreground">
                {t(dict, "about.title", "Detrás de cada solución, hay una visión.")}
              </h2>
              <p className="body-lg text-muted-foreground leading-relaxed">
                {t(dict, "about.intro", "Soy Anthony Rivera, desarrollador de software enfocado en transformar necesidades de negocio en soluciones tecnológicas funcionales, escalables y sostenibles.")}
              </p>
            </div>

            <div className="flex gap-4">
              <a
                href={`/${locale}/contacto`}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:border-primary/40 hover:bg-muted/60 transition-colors"
              >
                <SendIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {t(dict, "contact.scheduleCall", "Contáctame")}
              </a>
            </div>
          </div>

          {/* Right: engineering principles */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between gap-3 pb-5 mb-6 border-b border-border/60">
              <div className="flex items-center gap-2.5">
                <BrandLogo variant="monogram" mode="light" width={24} height={24} className="shrink-0" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t(dict, "about.eyebrow", "Principios de Ingeniería")}
                </span>
              </div>
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" aria-hidden="true" />
            </div>

            <div className="space-y-4">
              {items.map((principle, i) => {
                const Icon = principle.icon;
                return (
                  <div
                    key={principle.title}
                    className={cn(
                      "rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50",
                      i === 0 ? "pt-1" : "",
                    )}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="mt-0.5 h-9 w-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-foreground mb-1">
                          {principle.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {principle.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed italic">
              {t(
                dict,
                "about.body",
                "Me interesa construir productos que resuelvan problemas reales, combinando arquitectura de software, desarrollo, diseño de experiencias y visión de negocio.\n\nTrabajo con emprendedores y empresas en proyectos de diferentes dimensiones, desde desarrollos puntuales hasta plataformas tecnológicas y productos de largo recorrido.",
              )
                .split("\n\n")
                .map((paragraph, index) => (
                  <p key={index} className="mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox=" 0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}
