import Link from "next/link";
import { Card } from "@/components/ui/card";
import { featuredTestimonials } from "@/data/testimonials";
import { getDictionary, t } from "@/i18n/dictionary";

type TestimonialsSectionProps = {
  locale: "es" | "en";
};

export default function TestimonialsSection({
  locale,
}: TestimonialsSectionProps) {
  const dict = getDictionary(locale);
  const featured = featuredTestimonials.filter((item) => item.language === locale);
  const gridClass =
    featured.length === 1
      ? "grid grid-cols-1 max-w-xl mx-auto gap-6"
      : featured.length === 2
        ? "grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-6"
        : featured.length >= 3
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          : "grid grid-cols-1 gap-6";

  return (
    <section className="px-4 py-24 lg:py-32 border-t border-border/60">
      <div className="mx-auto container-x">
        <div className="text-center mb-20">
          <h2 className="display-lg mb-6 tracking-tight text-foreground">
            {t(dict, "testimonials.title", "Las experiencias hablan por sí solas.")}
          </h2>
          <p className="body-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {t(dict, "testimonials.subtitle", "Opiniones reales de quienes han trabajado conmigo y los resultados de sus proyectos.")}
          </p>
        </div>

        <div className={gridClass}>
          {featured.length > 0 ? (
            featured.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="p-8 border border-border hover:border-primary/40 transition-colors"
              >
                <div className="flex items-start gap-3 mb-6">
                  <span className="text-3xl font-serif text-primary/20 leading-none">“</span>
                </div>
                <p className="body-lg text-muted-foreground leading-relaxed mb-8">
                  {testimonial.content}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center overflow-hidden shrink-0">
                    <span className="text-xs font-medium text-muted-foreground">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground leading-tight">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground leading-tight">
                      {testimonial.role}{testimonial.company ? ` · ${testimonial.company}` : ""}
                    </p>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center py-24">
              <p className="text-muted-foreground text-sm">
                {t(dict, "testimonials.seeAll", "Próximamente: experiencias de clientes")}
              </p>
            </div>
          )}
        </div>

        <div className="mt-16 text-center">
          <Link
            href={`/${locale}/testimonios`}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors w-full lg:w-auto"
          >
            {t(dict, "testimonials.seeAll", "Conoce todas las experiencias")}
          </Link>
        </div>
      </div>
    </section>
  );
}
