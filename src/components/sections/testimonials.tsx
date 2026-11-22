"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { featuredTestimonials } from "@/data/testimonials";
import { getDictionary, t } from "@/i18n/dictionary";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

type TestimonialsSectionProps = {
  locale: "es" | "en";
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const reducedFadeUp = { hidden: { opacity: 1 }, show: { opacity: 1 } };

export default function TestimonialsSection({
  locale,
}: TestimonialsSectionProps) {
  const dict = getDictionary(locale);
  const reduced = useReducedMotion();
  const variants = reduced ? reducedFadeUp : fadeUp;
  const featured = featuredTestimonials.filter((t) => t.language === locale);

  return (
    <section className="px-4 py-32 lg:py-40 border-t border-border/60">
      <div className="mx-auto container-x">
        <div className="text-center mb-20">
          <motion.h2
            variants={variants}
            initial="hidden"
            animate="show"
            className="display-lg mb-6 tracking-tight text-foreground"
          >
            {t(dict, "testimonials.title", "Las experiencias hablan por sí solas.")}
          </motion.h2>
          <motion.p
            variants={variants}
            initial="hidden"
            animate="show"
            className="body-lg text-muted-foreground max-w-xl mx-auto leading-relaxed"
          >
            {t(dict, "testimonials.subtitle", "Opiniones reales de quienes han trabajado conmigo y los resultados de sus proyectos.")}
          </motion.p>
        </div>

        <motion.div
          variants={variants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featured.length > 0 ? (
            featured.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="p-8 border border-border bg-card"
              >
                <div className="flex items-center gap-2 mb-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                    <span className="text-xs font-medium">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}{testimonial.company ? ` · ${testimonial.company}` : ""}
                    </p>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center py-20">
              <p className="text-muted-foreground text-sm">
                {t(dict, "testimonials.seeAll", "Próximamente: experiencias de clientes")}
              </p>
            </div>
          )}
        </motion.div>

        <motion.div
          variants={variants}
          initial="hidden"
          animate="show"
          className="mt-16 text-center"
        >
          <Link
            href={`/${locale}/testimonios`}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors w-full lg:w-auto"
          >
            {t(dict, "testimonials.seeAll", "Conoce todas las experiencias")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
