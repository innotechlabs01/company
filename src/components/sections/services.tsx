import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Code,
  Layers,
  Smartphone,
  Building2,
  GitBranch,
  Headset,
} from "lucide-react";
import { getDictionary, t } from "@/i18n/dictionary";

type ServicesProps = {
  locale: "es" | "en";
};

const serviceIcons: Record<string, React.ElementType> = {
  "Desarrollo Web": Code,
  "Web Development": Code,
  "Desarrollo de Software a Medida": Layers,
  "Custom Software Development": Layers,
  "Aplicaciones Móviles": Smartphone,
  "Mobile Applications": Smartphone,
  "Proyectos In-house": Building2,
  "In-house Projects": Building2,
  "Proyectos de Largo Plazo": GitBranch,
  "Long-term Projects": GitBranch,
  "Consultoría Tecnológica": Headset,
  "Technology Consulting": Headset,
};

export function Services({ locale }: ServicesProps) {
  const dict = getDictionary(locale);
  const items = t(dict, "services.items", []) as Array<{
    name: string;
    description: string;
    subitems: string[];
  }>;

  return (
    <section
      className="py-24 lg:py-28 bg-muted/35 border-y border-border/60"
      id="servicios"
    >
      <div className="mx-auto container-x">
        <div className="text-center lg:max-w-2xl mx-auto mb-16">
          <p className="eyebrow text-primary mb-3">
            {locale === "en" ? "Capabilities" : "Capacidades"}
          </p>
          <h2 className="display-lg mb-5 tracking-tight text-foreground">
            {t(dict, "services.title", "Soluciones digitales para cada etapa de tu negocio.")}
          </h2>
          <p className="body-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {t(
              dict,
              "services.subtitle",
              locale === "en"
                ? "Solutions designed to support your business growth at every stage."
                : "Soluciones diseñadas para acompañar el crecimiento de tu negocio en cada etapa.",
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => {
            const Icon = serviceIcons[item.name] || Code;
            const stepNum = String(index + 1).padStart(2, "0");
            return (
              <Card
                key={item.name}
                className="bg-card border border-border hover:border-primary/40 hover:shadow-md transition-all group flex flex-col"
              >
                <CardHeader className="p-6 pb-4">
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-10 h-10 rounded-lg border border-border/80 bg-muted/70 flex items-center justify-center text-foreground group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <span className="font-mono text-xs font-medium text-muted-foreground">
                      {stepNum}
                    </span>
                  </div>
                  <CardTitle className="text-lg font-semibold leading-snug mb-2">
                    {item.name}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-2 mt-auto">
                  <ul className="space-y-2 border-t border-border/60 pt-4">
                    {item.subitems.map((sub, si) => (
                      <li
                        key={si}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed"
                      >
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/70 shrink-0" />
                        <span>{sub}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
