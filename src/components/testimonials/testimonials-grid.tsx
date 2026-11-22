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
          <div className="flex flex-col lg:flex-row justify-between items-end mb-10 gap-4">
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

          <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                  activeFilter === filter.value
                    ? "bg-primary border-primary text-white"
                    : "border-border text-muted-foreground hover:bg-accent"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {!testimonials?.length ? (
              <div className="col-span-3 text-center py-20 text-muted-foreground">
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
                  className="p-6 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                      {testimonial.avatar_url ? (
                        <Image
                          src={testimonial.avatar_url}
                          alt=""
                          className="w-full h-full object-cover"
                          fill
                          sizes="(max-width: 768px) 100vw, 25vw"
                          style={{ objectFit: "cover" }}
                          priority={false}
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
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    “{testimonial.content}”
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border/40">
                    <p className="text-xs text-muted-foreground">
                      {new Date(testimonial.created_at).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                      })}
                    </p>
                    {testimonial.url && (
                      <a
                        href={testimonial.url}
                        className="text-xs font-medium text-primary hover:underline"
                      >
                        {t(dict, "projects.viewProject", "Ver proyecto")}
                      </a>
                    )}
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center py-12 text-muted-foreground">
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
            className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors w-full lg:w-auto"
          >
            {ctaButton}
          </Link>
        </div>
      </section>
    </>
  );
}
