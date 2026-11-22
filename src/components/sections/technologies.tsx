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
    <section className="px-4 py-24 lg:py-32 border-t border-border/60">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-4">
            {t(dict, "technologies.title", "Tecnologías y capacidades.")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t(dict, "technologies.note", "Tecnologías destacadas aplicadas en proyectos reales. Sin listados interminables de logos.")}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card key={index} className="p-5">
              <CardHeader>
                <CardTitle className="text-sm font-semibold">{category.name}</CardTitle>
              </CardHeader>
              <CardContent className="pt-3">
                <ul className="space-y-1 text-xs text-muted-foreground leading-relaxed">
                  {category.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
