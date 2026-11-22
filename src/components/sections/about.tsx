import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDictionary, t } from "@/i18n/dictionary";

type AboutProps = {
  locale: "es" | "en";
};

export function About({ locale }: AboutProps) {
  const dict = getDictionary(locale);

  return (
    <section className="px-4 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div className="order-last lg:order-first">
            <div className="relative">
              <div className="relative rounded-xl border border-border overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1272e8e0ea?q=80&w=800&auto=format&fit=crop"
                  alt="Anthony Rivera"
                  width={800}
                  height={800}
                  className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-6">
              {t(dict, "about.title", "Detrás de cada solución, hay una visión.")}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {t(dict, "about.intro", "Soy Anthony Rivera, desarrollador de software enfocado en transformar necesidades de negocio en soluciones tecnológicas funcionales, escalables y sostenibles.")}
            </p>
            {t(dict, "about.body", "Me interesa construir productos que resuelvan problemas reales, combinando arquitectura de software, desarrollo, diseño de experiencias y visión de negocio.\n\nTrabajo con emprendedores y empresas en proyectos de diferentes dimensiones, desde desarrollos puntuales hasta plataformas tecnológicas y productos de largo recorrido.").split("\n\n").map((paragraph, index) => (
              <p key={index} className="text-lg text-muted-foreground leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
