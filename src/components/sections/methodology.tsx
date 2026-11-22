import { getDictionary, t } from "@/i18n/dictionary";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

type MethodologyProps = {
  locale: "es" | "en";
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const reducedFadeUp = { hidden: { opacity: 1 }, show: { opacity: 1 } };

export function Methodology({ locale }: MethodologyProps) {
  const dict = getDictionary(locale);
  const reduced = useReducedMotion();
  const variants = reduced ? reducedFadeUp : fadeUp;
  const steps = t(dict, "methodology.steps", []) as Array<{
    number: string;
    title: string;
    description: string;
  }>;

  return (
    <section className="px-4 py-32 lg:py-40" id="metodologia">
      <div className="mx-auto container-x">
        <div className="text-center lg:max-w-2xl mx-auto mb-24">
          <motion.h2
            variants={variants}
            initial="hidden"
            animate="show"
            className="display-lg mb-6 tracking-tight text-foreground"
          >
            {t(dict, "methodology.title", "De la idea a una solución funcional.")}
          </motion.h2>
          <motion.p
            variants={variants}
            initial="hidden"
            animate="show"
            className="body-lg text-muted-foreground max-w-xl mx-auto leading-relaxed"
          >
            Un proceso claro y transparente desde el primer contacto hasta el
            despliegue y más allá.
          </motion.p>
        </div>

        <motion.div
          variants={variants}
          initial="hidden"
          animate="show"
          className="relative max-w-3xl mx-auto"
        >
          <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-border" />

          <div className="space-y-20 lg:space-y-0 lg:flex lg:flex-col lg:gap-20">
            {steps.map((step, index) => {
              const isLast = index === steps.length - 1;
              return (
                <div
                  key={step.number}
                  className="relative lg:flex lg:items-start lg:gap-8"
                >
                  <div className="flex flex-shrink-0 items-center justify-center w-10 h-10 rounded-md bg-primary text-white font-bold text-lg mb-4 lg:mb-0">
                    {step.number}
                  </div>
                  <div className="lg:w-full">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
