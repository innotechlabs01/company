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
import { cn } from "@/lib/utils";

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
    <section className="px-4 py-24 lg:py-32" id="servicios">
      <div className="mx-auto container-x">
        <div className="text-center lg:max-w-2xl mx-auto mb-20">
          <h2 className="display-lg mb-6 tracking-tight text-foreground">
            {t(dict, "services.title", "Soluciones digitales para cada etapa de tu negocio.")}
          </h2>
          <p className="body-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Soluciones diseñadas para acompañar el crecimiento de tu negocio en
            cada etapa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => {
            const Icon = serviceIcons[item.name] || Code;
            const isFeatured = index === 0;
            return (
              <Card
                key={item.name}
                className={cn(
                  "border border-border hover:border-primary/60 hover:shadow-md transition-colors group",
                  isFeatured ? "lg:col-span-2" : "",
                )}
              >
                <CardHeader className="p-6 pb-4">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="ml-auto text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                      {index + 1}
                    </span>
                  </div>
                  <CardTitle className="text-lg font-semibold leading-tight mb-2">
                    {item.name}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <ul className="space-y-2">
                    {item.subitems.map((sub, si) => (
                      <li key={si} className="flex items-center gap-2 text-sm text-muted-foreground leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
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
