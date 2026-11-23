"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Filter } from "lucide-react";
import { getDictionary, t } from "@/i18n/dictionary";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  project_type: string;
  created_at: string;
  url?: string;
  avatar_url?: string;
};

type FilterOption = { value: string; label: string };

type TestimonialsGridProps = {
  testimonials: Testimonial[];
  locale: "es" | "en";
  filters: FilterOption[];
  ctaTitle: string;
  ctaButton: string;
  featuredTitle: string;
  featuredSubtitle: string;
};

export function TestimonialsGrid({
  testimonials,
  locale,
  filters,
  ctaTitle,
  ctaButton,
  featuredTitle,
  featuredSubtitle,
}: TestimonialsGridProps) {
  const dict = getDictionary(locale);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filtered =
    activeFilter === "all"
      ? testimonials
      : testimonials.filter(
          (testimonial) => testimonial.project_type === activeFilter,
        );

  return (
    <>
      <section className="px-4 pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-14 gap-4">
            <div>
              <h2 className="display-lg mb-2 tracking-tight text-foreground">
                {featuredTitle}
              </h2>
              <p className="body-lg text-sm text-muted-foreground">
                {featuredSubtitle}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {t(dict, "testimonials.filter", "Filtrar")}
              </span>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-4 mb-10 scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                  activeFilter === filter.value
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {!testimonials?.length ? (
              <div className="col-span-3 text-center py-24 text-muted-foreground">
                <p className="text-sm font-medium mb-2">
                  {t(dict, "testimonials.noTestimonials", "No hay testimonios disponibles.")}
                </p>
                <p className="text-xs">
                  {t(dict, "testimonials.addFirst", "Agregá tus primeros testimonios desde el panel de administración.")}
                </p>
              </div>
            ) : filtered.length > 0 ? (
              filtered.map((testimonial) => (
                <Card
                  key={testimonial.id}
                  className="p-8 border border-border hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-start gap-3 mb-6">
                    <span className="text-3xl font-serif text-primary/20 leading-none">“</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {testimonial.content}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center overflow-hidden shrink-0">
                      {testimonial.avatar_url ? (
                        <Image
                          src={testimonial.avatar_url}
                          alt=""
                          className="w-full h-full object-cover"
                          fill
                          sizes="(max-width: 768px) 100vw, 25vw"
                          priority={false}
                        />
                      ) : (
                        <span className="text-xs font-medium text-muted-foreground">
                          {testimonial.name.charAt(0)}
                        </span>
                      )}
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
              <div className="col-span-3 text-center py-16 text-muted-foreground">
                {t(dict, "testimonials.noTestimonialsForFilter", "No hay testimonios para este filtro.")}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="px-4 py-24 lg:py-32 border-t border-border/60">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="display-lg mb-6 tracking-tight text-foreground">
            {ctaTitle}
          </h2>
          <Link
            href={`/${locale}/contacto`}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors w-full lg:w-auto"
          >
            {ctaButton}
          </Link>
        </div>
      </section>
    </>
  );
}
