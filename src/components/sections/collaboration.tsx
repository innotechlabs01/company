import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Building, RefreshCw, ArrowRight } from "lucide-react";
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

// Token-based icon backgrounds that adapt to light/dark mode.
const collaborationIconBase =
  "w-10 h-10 rounded-lg flex items-center justify-center transition-colors bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground";

export function Collaboration({ locale }: CollaborationProps) {
  const dict = getDictionary(locale);
  const items = t(dict, "collaboration.items", []) as Array<{
    name: string;
    description: string;
  }>;

  return (
    <section
      className="py-24 lg:py-28 bg-muted/35 border-y border-border/60"
      id="colaboracion"
    >
      <div className="mx-auto container-x">
        <div className="text-center lg:max-w-2xl mx-auto mb-16">
          <p className="eyebrow text-primary mb-3">
            {t(dict, "collaboration.eyebrow", "Modelos de Trabajo")}
          </p>
          <h2 className="display-lg mb-5 tracking-tight text-foreground">
            {t(dict, "collaboration.title", "Diferentes formas de trabajar contigo.")}
          </h2>
          <p className="body-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {t(
              dict,
              "collaboration.intro",
              "Me adapto al modelo de contratación que mejor se ajuste a tu negocio.",
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, index) => {
            const Icon = collaborationIcons[item.name] || FileText;
            const stepNum = String(index + 1).padStart(2, "0");

            return (
              <Card
                key={item.name}
                className="bg-card border border-border hover:border-primary/40 hover:shadow-md transition-all group flex flex-col"
              >
                <CardHeader className="p-6 pb-3">
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className={collaborationIconBase}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <span className="font-mono text-xs font-medium text-muted-foreground">
                      {stepNum}
                    </span>
                  </div>
                  <CardTitle className="text-lg font-semibold leading-snug">
                    {item.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-2">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="w-full sm:w-auto shadow-md shadow-primary/20">
            <Link href={`/${locale}/contacto`} className="inline-flex items-center gap-2">
              {t(dict, "collaboration.cta", "Cuéntame qué necesitas")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
