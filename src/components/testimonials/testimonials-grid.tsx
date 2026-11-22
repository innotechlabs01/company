"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Filter } from "lucide-react";
import { cn } from "@/lib/utils";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  projectType: string;
  date: string;
  url?: string;
  avatarUrl?: string;
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
  const typeMap: Record<string, string> = {
    web: "Desarrollo web",
    apps: "Aplicación móvil",
    enterprise: "Software empresarial",
    inhouse: "Proyectos In-house",
    consulting: "Consultoría",
    other: "Otro",
  };

  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filtered =
    activeFilter === "all"
      ? testimonials
      : testimonials.filter(
          (testimonial) => typeMap[activeFilter] === testimonial.projectType,
        );

  return (
    <>
      <section className="px-4 pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {featuredTitle}
              </h2>
              <p className="text-sm text-muted-foreground">
                {featuredSubtitle}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Filtrar</span>
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
            {filtered.length > 0 ? (
              filtered.map((testimonial) => (
                <Card
                  key={testimonial.id}
                  className="p-6 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                      {testimonial.avatarUrl ? (
                        <img
                          src={testimonial.avatarUrl}
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
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border/40">
                    <p className="text-xs text-muted-foreground">
                      {new Date(testimonial.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                      })}
                    </p>
                    {testimonial.url && (
                      <a
                        href={testimonial.url}
                        className="text-xs font-medium text-primary hover:underline"
                      >
                        Ver proyecto
                      </a>
                    )}
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center py-12 text-muted-foreground">
                No hay testimonios para este filtro.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="px-4 py-24 lg:py-32 border-t border-border/60">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-6">
            {ctaTitle}
          </h2>
          <Link
            href={`/${locale}/contacto`}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors w-full lg:w-auto"
          >
            {ctaButton}
          </Link>
        </div>
      </section>
    </>
  );
}
