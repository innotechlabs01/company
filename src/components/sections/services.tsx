import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    <section className="px-4 py-32 lg:py-40" id="servicios">
      <div className="mx-auto container-x">
        <div className="text-center lg:max-w-2xl mx-auto mb-24">
          <h2 className="display-lg mb-6 tracking-tight text-foreground">
            {t(dict, "services.title", "Soluciones digitales para cada etapa de tu negocio.")}
          </h2>
          <p className="body-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Soluciones diseñadas para acompañar el crecimiento de tu negocio en
            cada etapa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => {
            const Icon = serviceIcons[item.name] || Code;
            return (
              <Card
                key={index}
                className="border border-border bg-card hover:shadow-sm transition-colors group"
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center text-secondary-foreground group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {index + 1}
                    </span>
                  </div>
                  <CardTitle className="text-lg mb-3">{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                    {item.subitems.map((sub, si) => (
                      <li key={si} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
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
