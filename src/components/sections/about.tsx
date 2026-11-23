import { Card } from "@/components/ui/card";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { BrandLogo } from "@/components/ui/brand-logo";
import { getDictionary, t } from "@/i18n/dictionary";

type AboutProps = {
  locale: "es" | "en";
};

export function About({ locale }: AboutProps) {
  const dict = getDictionary(locale);

  return (
    <section className="px-4 py-24 lg:py-32" id="sobre-mi">
      <div className="mx-auto container-x">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="order-last lg:order-first relative">
            <div className="relative">
              <Card className="overflow-hidden border border-border bg-card">
                <div className="absolute top-4 left-4 z-10">
                  <BrandLogo variant="monogram" mode="dark" width={32} height={32} className="bg-white/90 rounded-full p-1" alt="AR" />
                </div>
                <ImagePlaceholder
                  width={500}
                  height={500}
                  label="Anthony Rivera"
                  className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000"
                  variant="portrait"
                />
              </Card>
            </div>
          </div>
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-2">
              <BrandLogo variant="monogram" mode="dark" width={20} height={20} className="shrink-0" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">Anthony Rivera</span>
            </div>
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
