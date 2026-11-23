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
    <section className="px-4 py-24 lg:py-32 border-t border-border/60" id="tecnologias">
      <div className="mx-auto container-x">
        <div className="text-center lg:max-w-2xl mx-auto mb-20">
          <h2 className="display-lg mb-6 tracking-tight text-foreground">
            {t(dict, "technologies.title", "Tecnologías y capacidades.")}
          </h2>
          <p className="body-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {t(dict, "technologies.note", "Tecnologías destacadas aplicadas en proyectos reales. Sin listados interminables de logos.")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card
              key={category.name}
              className="border border-border p-8 hover:shadow-md transition-colors"
            >
              <CardHeader className="pb-4">
                <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {category.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-full border border-border/60 bg-muted text-xs font-medium text-muted-foreground"
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
