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
    <section className="px-4 py-24 lg:py-32" id="metodologia">
      <div className="mx-auto container-x">
        <div className="text-center lg:max-w-2xl mx-auto mb-20">
          <h2 className="display-lg mb-6 tracking-tight text-foreground">
            {t(dict, "methodology.title", "De la idea a una solución funcional.")}
          </h2>
          <p className="body-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {t(
              dict,
              "methodology.subtitle",
              locale === "en"
                ? "A clear and transparent process from first contact to deployment and beyond."
                : "Un proceso claro y transparente desde el primer contacto hasta el despliegue y más allá.",
            )}
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-12 bottom-12 w-[1px] bg-border" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 relative z-10">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg mb-6 shrink-0 mx-auto">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3 leading-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
