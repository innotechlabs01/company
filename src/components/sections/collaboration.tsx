import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Building, RefreshCw } from "lucide-react";
import { getDictionary, t } from "@/i18n/dictionary";
import { cn } from "@/lib/utils";

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

const collaborationIconClasses: Record<string, string> = {
  "Proyectos por alcance": "bg-[#1688f8]/10 text-[#1688f8] group-hover:bg-[#1688f8] group-hover:text-white",
  "Scope-based projects": "bg-[#1688f8]/10 text-[#1688f8] group-hover:bg-[#1688f8] group-hover:text-white",
  "Proyectos In-house": "bg-[#0866c6]/10 text-[#0866c6] group-hover:bg-[#0866c6] group-hover:text-white",
  "In-house projects": "bg-[#0866c6]/10 text-[#0866c6] group-hover:bg-[#0866c6] group-hover:text-white",
  "Proyectos de largo plazo": "bg-[#299bff]/10 text-[#299bff] group-hover:bg-[#299bff] group-hover:text-white",
  "Long-term projects": "bg-[#299bff]/10 text-[#299bff] group-hover:bg-[#299bff] group-hover:text-white",
};

export function Collaboration({ locale }: CollaborationProps) {
  const dict = getDictionary(locale);
  const items = t(dict, "collaboration.items", []) as Array<{
    name: string;
    description: string;
  }>;

  return (
    <section className="px-4 py-24 lg:py-32" id="colaboracion">
      <div className="mx-auto container-x">
        <div className="text-center lg:max-w-2xl mx-auto mb-20">
          <h2 className="display-lg mb-6 tracking-tight text-foreground">
            {t(dict, "collaboration.title", "Diferentes formas de trabajar contigo.")}
          </h2>
          <p className="body-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {t(dict, "collaboration.intro", "Me adapto al modelo de contratación que mejor se ajuste a tu negocio.")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, index) => {
            const Icon = collaborationIcons[item.name] || FileText;
            const iconClass =
              collaborationIconClasses[item.name] ||
              "bg-[#1688f8]/10 text-[#1688f8] group-hover:bg-[#1688f8] group-hover:text-white";
            return (
              <Card
                key={item.name}
                className={cn(
                  "border border-border p-8 hover:shadow-md transition-colors group",
                  index === 1 ? "lg:mt-4" : "",
                )}
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                        iconClass,
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="ml-auto text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {index + 1}
                    </span>
                  </div>
                  <CardTitle className="text-lg font-semibold leading-tight mb-3">
                    {item.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
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
