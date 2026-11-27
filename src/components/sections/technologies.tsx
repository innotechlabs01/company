import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDictionary, t } from "@/i18n/dictionary";

type TechnologiesProps = {
  locale: "es" | "en";
};

export function Technologies({ locale }: TechnologiesProps) {
  const dict = getDictionary(locale);
  const categories = t(dict, "technologies.categories", []) as Array<{
    name: string;
    items: string[];
  }>;

  return (
    <section className="py-24 lg:py-28" id="tecnologias">
      <div className="mx-auto container-x">
        <div className="text-center lg:max-w-2xl mx-auto mb-16">
          <p className="eyebrow text-primary mb-3">
            {t(dict, "technologies.eyebrow", "Stack Tecnológico")}
          </p>
          <h2 className="display-lg mb-5 tracking-tight text-foreground">
            {t(dict, "technologies.title", "Tecnologías y capacidades.")}
          </h2>
          <p className="body-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {t(
              dict,
              "technologies.note",
              "Tecnologías destacadas aplicadas en proyectos reales. Sin listados interminables de logos.",
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card
              key={category.name}
              className="bg-card border border-border hover:border-primary/40 hover:shadow-md transition-all flex flex-col"
            >
              <CardHeader className="p-6 pb-4 border-b border-border/60">
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                    {category.name}
                  </CardTitle>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-5">
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md border border-border/80 bg-muted/60 font-mono text-xs text-foreground/85"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
