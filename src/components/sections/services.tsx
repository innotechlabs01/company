import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Layers, Smartphone, Building2, GitBranch, Headset } from "lucide-react";
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
    <section className="px-4 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="display-lg mb-4 tracking-tight text-foreground">
            {t(dict, "services.title", "Soluciones digitales para cada etapa de tu negocio.")}
          </h2>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            Soluciones diseñadas para acompañar el crecimiento de tu negocio en
            cada etapa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => {
            const Icon = serviceIcons[item.name] || Code;
            return (
              <Card
                key={index}
                className="group hover:border-primary/50 transition-colors cursor-default"
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {index + 1}
                    </span>
                  </div>
                  <CardTitle className="mb-2">{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {item.subitems.map((sub, si) => (
                      <li key={si} className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary/50"></span>
                        {sub}
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
