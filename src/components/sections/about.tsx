import { Card } from "@/components/ui/card";
import { getDictionary, t } from "@/i18n/dictionary";

type AboutProps = {
  locale: "es" | "en";
};

export function About({ locale }: AboutProps) {
  const dict = getDictionary(locale);

  return (
    <section className="px-4 py-32 lg:py-40" id="sobre-mi">
      <div className="mx-auto container-x">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="order-last lg:order-first">
            <div className="relative">
              <Card className="overflow-hidden border border-border bg-card">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1272e8e0ea?q=80&w=800&auto=format&fit=crop"
                  alt="Anthony Rivera"
                  width={800}
                  height={800}
                  className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                  decoding="async"
                />
              </Card>
            </div>
          </div>
          <div className="space-y-8">
            <h2 className="display-lg tracking-tight text-foreground">
              {t(dict, "about.title", "Detrás de cada solución, hay una visión.")}
            </h2>
            <p className="body-lg text-muted-foreground leading-relaxed">
              {t(dict, "about.intro", "Soy Anthony Rivera, desarrollador de software enfocado en transformar necesidades de negocio en soluciones tecnológicas funcionales, escalables y sostenibles.")}
            </p>
            {t(dict, "about.body", "Me interesa construir productos que resuelvan problemas reales, combinando arquitectura de software, desarrollo, diseño de experiencias y visión de negocio.\n\nTrabajo con emprendedores y empresas en proyectos de diferentes dimensiones, desde desarrollos puntuales hasta plataformas tecnológicas y productos de largo recorrido.").split("\n\n").map((paragraph, index) => (
              <p key={index} className="body-lg text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
