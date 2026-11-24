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
    <section className="py-24 lg:py-28 bg-muted/35 border-y border-border/60">
      <div className="mx-auto container-x">
        <div className="text-center mb-16">
          <p className="eyebrow text-primary mb-3">
            {locale === "en" ? "Client Feedback" : "Testimonios"}
          </p>
          <h2 className="display-lg mb-5 tracking-tight text-foreground">
            {t(dict, "testimonials.title", "Las experiencias hablan por sí solas.")}
          </h2>
          <p className="body-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            {t(
              dict,
              "testimonials.subtitle",
              "Opiniones reales de quienes han trabajado conmigo y los resultados de sus proyectos.",
            )}
          </p>
        </div>

        <div className={gridClass}>
          {featured.length > 0 ? (
            featured.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="p-7 bg-card border border-border hover:border-primary/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="mb-4">
                    <span className="font-mono text-2xl font-bold text-primary/40 leading-none">
                      &ldquo;
                    </span>
                  </div>
                  <p className="body text-muted-foreground leading-relaxed mb-7">
                    {testimonial.content}
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-border/60">
                  <div className="w-9 h-9 rounded-full border border-border bg-muted flex items-center justify-center overflow-hidden shrink-0">
                    <span className="font-mono text-xs font-semibold text-foreground">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground leading-tight">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground leading-tight mt-0.5">
                      {testimonial.role}
                      {testimonial.company ? ` · ${testimonial.company}` : ""}
                    </p>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center py-16">
              <p className="text-muted-foreground text-sm">
                {t(dict, "testimonials.seeAll", "Próximamente: experiencias de clientes")}
              </p>
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <Link
            href={`/${locale}/testimonios`}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:border-primary/40 hover:bg-muted/60 transition-colors w-full sm:w-auto"
          >
            {t(dict, "testimonials.seeAll", "Conoce todas las experiencias")}
          </Link>
        </div>
      </div>
    </section>
  );
}
