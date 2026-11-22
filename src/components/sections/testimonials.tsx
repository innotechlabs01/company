"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/lib/supabase/server";
import { getDictionary, t } from "@/i18n/dictionary";

type TestimonialsSectionProps = {
  locale: "es" | "en";
};

export default function TestimonialsSection({
  locale,
}: TestimonialsSectionProps) {
  const dict = getDictionary(locale);
  const [testimonials, setTestimonials] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("testimonials")
      .select("*")
      .eq("featured", true)
      .eq("language", locale)
      .order("created_at", { ascending: false })
      .then(({ data, error: supabaseError }) => {
        if (cancelled) return;
        if (supabaseError) {
          setError(supabaseError);
          setIsLoading(false);
          return;
        }
        setTestimonials(data || []);
        setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [locale, supabase]);

  if (isLoading) {
    return (
      <section className="px-4 py-24 lg:py-32 border-t border-border/60">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-4">
              {t(dict, "testimonials.title", "Las experiencias hablan por sí solas.")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6">
                <div className="h-8 bg-muted rounded w-3/4 mb-4 animate-pulse" />
                <div className="h-4 bg-muted rounded w-1/2 mb-2 animate-pulse" />
                <div className="h-4 bg-muted rounded w-1/3 animate-pulse" />
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !testimonials?.length) {
    return null;
  }

  return (
    <section className="px-4 py-24 lg:py-32 border-t border-border/60">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-4">
            {t(dict, "testimonials.title", "Las experiencias hablan por sí solas.")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t(dict, "testimonials.subtitle", "Opiniones reales de quienes han trabajado conmigo y los resultados de sus proyectos.")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="p-6">
              <div className="text-xl text-foreground font-medium italic mb-4">
                "{testimonial.content}"
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                  {testimonial.avatar_url ? (
                    <img
                      src={testimonial.avatar_url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-medium">
                      {testimonial.name.charAt(0)}
                    </span>
                  )}
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
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href={`/${locale}/testimonios`} className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            {t(dict, "testimonials.seeAll", "Conoce todas las experiencias")}
          </Link>
        </div>
      </div>
    </section>
  );
}
