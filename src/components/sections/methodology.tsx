import { getDictionary, t } from "@/i18n/dictionary";

type MethodologyProps = {
  locale: "es" | "en";
};

export function Methodology({ locale }: MethodologyProps) {
  const dict = getDictionary(locale);
  const steps = t(dict, "methodology.steps", []) as Array<{
    number: string;
    title: string;
    description: string;
  }>;

  return (
    <section
      className="py-24 lg:py-28 bg-muted/35 border-y border-border/60"
      id="metodologia"
    >
      <div className="mx-auto container-x">
        <div className="text-center lg:max-w-2xl mx-auto mb-16">
          <p className="eyebrow text-primary mb-3">
            {t(dict, "methodology.eyebrow", "Proceso de Ingeniería")}
          </p>
          <h2 className="display-lg mb-5 tracking-tight text-foreground">
            {t(dict, "methodology.title", "De la idea a una solución funcional.")}
          </h2>
          <p className="body-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {t(
              dict,
              "methodology.subtitle",
              "Un proceso claro y transparente desde el primer contacto hasta el despliegue y más allá.",
            )}
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Horizontal connector line on desktop */}
          <div
            className="hidden lg:block absolute top-8 left-12 right-12 h-px bg-border"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => {
              const formattedNum = String(step.number || index + 1).padStart(2, "0");
              return (
                <div
                  key={step.number}
                  className="flex flex-col items-center text-center"
                >
                  <div className="flex items-center justify-center w-16 h-16 rounded-2xl border border-border bg-card shadow-sm mb-6 shrink-0">
                    <span className="font-mono text-base font-bold text-primary">
                      {formattedNum}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2.5 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
