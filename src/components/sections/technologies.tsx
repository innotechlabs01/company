import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDictionary, t } from "@/i18n/dictionary";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

type TechnologiesProps = {
  locale: "es" | "en";
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const reducedFadeUp = { hidden: { opacity: 1 }, show: { opacity: 1 } };

export function Technologies({ locale }: TechnologiesProps) {
  const dict = getDictionary(locale);
  const reduced = useReducedMotion();
  const variants = reduced ? reducedFadeUp : fadeUp;
  const categories = t(dict, "technologies.categories", []) as Array<{
    name: string;
    items: string[];
  }>;

  return (
    <section className="px-4 py-32 lg:py-40 border-t border-border/60" id="tecnologias">
      <div className="mx-auto container-x">
        <div className="text-center lg:max-w-2xl mx-auto mb-24">
          <motion.h2
            variants={variants}
            initial="hidden"
            animate="show"
            className="display-lg mb-6 tracking-tight text-foreground"
          >
            {t(dict, "technologies.title", "Tecnologías y capacidades.")}
          </motion.h2>
          <motion.p
            variants={variants}
            initial="hidden"
            animate="show"
            className="body-lg text-muted-foreground max-w-xl mx-auto leading-relaxed"
          >
            {t(dict, "technologies.note", "Tecnologías destacadas aplicadas en proyectos reales. Sin listados interminables de logos.")}
          </motion.p>
        </div>

        <motion.div
          variants={variants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {categories.map((category, index) => (
            <Card
              key={index}
              className="border border-border bg-card hover:shadow-sm transition-colors p-8"
            >
              <CardHeader>
                <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {category.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
