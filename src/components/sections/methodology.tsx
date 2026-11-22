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
    <section className="px-4 py-24 lg:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-4">
            {t(dict, "methodology.title", "De la idea a una solución funcional.")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un proceso claro y transparente desde el primer contacto hasta el
            despliegue y más allá.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute top-16 bottom-16 left-1/2 -translate-x-1/2 w-px bg-border/50 lg:hidden"></div>

          <div className="space-y-16 lg:space-y-0 lg:flex lg:flex-col lg:gap-16">
            {steps.map((step, index) => {
              const isLast = index === steps.length - 1;
              return (
                <div
                  key={step.number}
                  className="relative group lg:flex lg:items-start lg:gap-6"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold text-lg mb-4 lg:mb-0 lg:shrink-0">
                    {step.number}
                  </div>
                  <div className="lg:w-full">
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  {!isLast && (
                    <div
                      className="hidden lg:block absolute -left-3 top-6 w-px h-8 bg-primary"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
