import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Building, RefreshCw } from "lucide-react";
import { getDictionary, t } from "@/i18n/dictionary";

type CollaborationProps = {
  locale: "es" | "en";
};

const collaborationIcons: Record<string, React.ElementType> = {
  "Proyectos por alcance": FileText,
  "Scope-based projects": FileText,
  "Proyectos In-house": Building,
  "In-house projects": Building,
  "Proyectos de largo plazo": RefreshCw,
  "Long-term projects": RefreshCw,
};

export function Collaboration({ locale }: CollaborationProps) {
  const dict = getDictionary(locale);
  const items = t(dict, "collaboration.items", []) as Array<{
    name: string;
    description: string;
  }>;

  return (
    <section className="px-4 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-4">
            {t(dict, "collaboration.title", "Diferentes formas de trabajar contigo.")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t(dict, "collaboration.intro", "Me adapto al modelo de contratación que mejor se ajuste a tu negocio.")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, index) => {
            const Icon = collaborationIcons[item.name] || FileText;
            return (
              <Card
                key={index}
                className="group hover:border-primary/50 transition-colors cursor-default"
              >
                <CardHeader>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle>{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Button asChild size="lg" className="w-full lg:w-auto">
            <Link href={`/${locale}/contacto`}>
              {t(dict, "collaboration.cta", "Cuéntame qué necesitas")}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
