import Link from "next/link";
import React from "react";
import { ArrowRight, CheckCircle2, Cpu, GitBranch, Layers, ShieldCheck, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
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

  const trustPillars = [
    { icon: Layers, labelKey: "hero.trustPillars.0" },
    { icon: Cpu, labelKey: "hero.trustPillars.1" },
    { icon: ShieldCheck, labelKey: "hero.trustPillars.2" },
  ];

  const modules = [
    {
      name: "web-platform",
      stack: "Next.js · TypeScript",
      status: "99.98%",
    },
    {
      name: "core-api",
      stack: "Node.js · PostgreSQL",
      status: "42ms p95",
    },
    {
      name: "mobile-client",
      stack: "React Native · Expo",
      status: "iOS / Android",
    },
    {
      name: "cloud-infra",
      stack: "Docker · CI/CD",
      status: "Automated",
    },
  ];

  return (
    <section
      className="relative pt-14 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28 overflow-hidden"
      id="inicio"
    >
      {/* Subtle radial glow and architectural grid accent */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(22,136,248,0.08),_transparent_58%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_78%)]"
        aria-hidden="true"
      />

      <div className="mx-auto container-x relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card/90 px-3.5 py-1.5 shadow-sm backdrop-blur-sm">
                <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="eyebrow text-muted-foreground tracking-[0.12em] sm:tracking-[0.14em]">
                  {t(dict, "hero.eyebrow", "Software development · Digital solutions")}
                </span>
              </div>
            </div>

            <h1 className="display-xl mb-6 tracking-tight text-foreground">
              {highlightTitle(dict)}
            </h1>

            <p className="body-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
              {t(
                dict,
                "hero.subtitle",
                "Diseño y desarrollo experiencias digitales, plataformas y sistemas a medida para emprendedores y empresas que buscan construir, escalar y transformar sus negocios mediante tecnología.",
              )}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3.5">
              <Button asChild size="lg" className="w-full sm:w-auto shadow-md shadow-primary/20">
                <Link href={`/${locale}/contacto`} className="inline-flex items-center gap-2">
                  {t(dict, "hero.ctaPrimary", "Hablemos de tu proyecto")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button variant="outline" asChild size="lg" className="w-full sm:w-auto bg-card">
                <Link href={`/${locale}/casos-de-estudio`}>
                  {t(dict, "hero.ctaSecondary", "Explorar proyectos")}
                </Link>
              </Button>
            </div>

            {/* Engineering trust bar */}
            <div className="mt-10 pt-7 border-t border-border/70 flex flex-wrap items-center gap-x-7 gap-y-3">
              {trustPillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.labelKey}
                    className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground"
                  >
                    <Icon className="h-3.5 w-3.5 text-primary shrink-0" aria-hidden="true" />
                    <span>{t(dict, pillar.labelKey, pillar.labelKey)}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dark-surface engineering telemetry & architecture panel */}
          <div className="lg:col-span-5">
            <div className="relative w-full rounded-2xl border border-slate-800 bg-slate-950 text-slate-100 shadow-2xl overflow-hidden">
              <div
                className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:28px_28px]"
                aria-hidden="true"
              />

              {/* Window header */}
              <div className="relative flex items-center justify-between px-5 py-3.5 border-b border-slate-800/80 bg-slate-900/60">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                  <span className="ml-2 inline-flex items-center gap-1.5 font-mono text-[11px] text-slate-400">
                    <Terminal className="h-3 w-3 text-primary" aria-hidden="true" />
                    architecture.spec.ts
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 font-mono text-[10px] font-medium text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  CI/CD Ready
                </span>
              </div>

              {/* System modules */}
              <div className="relative p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {modules.map((mod) => (
                    <div
                      key={mod.name}
                      className="rounded-xl border border-slate-800/90 bg-slate-900/70 p-3.5 transition-colors hover:border-primary/40"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="font-mono text-xs font-medium text-slate-100 truncate">
                          {mod.name}
                        </span>
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" aria-hidden="true" />
                      </div>
                      <p className="text-[11px] text-slate-400 mb-2">{mod.stack}</p>
                      <span className="inline-block font-mono text-[10px] text-sky-400 bg-sky-500/10 border border-sky-500/20 rounded px-1.5 py-0.5">
                        {mod.status}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Delivery pipeline footer */}
                <div className="rounded-xl border border-slate-800/90 bg-slate-900/80 p-3.5">
                  <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                    <span className="inline-flex items-center gap-1.5 text-slate-300">
                      <GitBranch className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                      main → production
                    </span>
                    <span className="text-emerald-400">
                      {t(dict, "hero.checks", "100% checks OK")}
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full w-full rounded-full bg-gradient-to-r from-primary via-sky-400 to-emerald-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
