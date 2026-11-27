import { getDictionary, t } from "@/i18n/dictionary";
import { TestimonialsGrid } from "@/components/testimonials/testimonials-grid";
import { supabase } from "@/lib/supabase/server";
import Link from "next/link";
import { Metadata } from "next";
import type { Locale } from "@/i18n/dictionary";

const testimoniosMeta: Record<Locale, { title: string; description: string }> = {
  es: {
    title: "Testimonios",
    description:
      "Experiencias reales de clientes que han trabajado conmigo. Conoce los resultados de sus proyectos y construye confianza.",
  },
  en: {
    title: "Testimonials",
    description:
      "Real experiences from clients who have worked with me. Meet the results of their projects and build trust.",
  },
};

export const generateStaticParams = () => {
  return [{ locale: "es" }, { locale: "en" }];
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const m = testimoniosMeta[locale] || testimoniosMeta.es;
  return {
    title: m.title,
    description: m.description,
  };
}

export default async function TestimonialsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  if (!supabase) {
    return (
      <>
        <section className="px-4 py-16 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
              {t(dict, "testimonialsPage.heroTitle", "Experiencias que construyen confianza.")}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t(dict, "testimonialsPage.heroSubtitle", "Cada proyecto representa una oportunidad para crear algo significativo. Conoce las experiencias de quienes han trabajado conmigo y los resultados de sus proyectos.")}
            </p>
          </div>
        </section>
        <section className="px-4 pb-24 lg:pb-32">
          <div className="mx-auto max-w-7xl">
            <div className="text-center py-12 text-muted-foreground">
              Configura Supabase para ver los testimonios.
            </div>
          </div>
        </section>
      </>
    );
  }

  const { data: testimonials, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("language", locale)
    .order("created_at", { ascending: false });

  if (error || !testimonials?.length) {
    // Fallback vacío si no hay datos aún
    return (
      <>
        <section className="px-4 py-16 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
              {t(dict, "testimonialsPage.heroTitle", "Experiencias que construyen confianza.")}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t(dict, "testimonialsPage.heroSubtitle", "Cada proyecto representa una oportunidad para crear algo significativo. Conoce las experiencias de quienes han trabajado conmigo y los resultados de sus proyectos.")}
            </p>
          </div>
        </section>

        <section className="px-4 pb-24 lg:pb-32">
          <div className="mx-auto max-w-7xl">
            <div className="text-center py-12 text-muted-foreground">
              {t(dict, "testimonials.noTestimonials", "No hay testimonios disponibles aún.")}
            </div>
          </div>
        </section>

        <section className="px-4 py-24 lg:py-32 border-t border-border/60">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-6">
              {t(dict, "testimonialsPage.ctaTitle", "Construyamos algo que también pueda contar su historia.")}
            </h2>
            <Link
              href={`/${locale}/contacto`}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors w-full lg:w-auto"
            >
              {t(dict, "testimonialsPage.ctaButton", "Hablemos de tu proyecto")}
            </Link>
          </div>
        </section>
      </>
    );
  }

  const filters = [
    { value: "all", label: t(dict, "testimonialsPage.filters.all", "Todos") },
    { value: "landing_page", label: t(dict, "testimonialsPage.filters.landing_page", "Landing Page") },
    { value: "web", label: t(dict, "testimonialsPage.filters.web", "Desarrollo web") },
    { value: "apps", label: t(dict, "testimonialsPage.filters.apps", "Aplicaciones") },
    { value: "enterprise", label: t(dict, "testimonialsPage.filters.enterprise", "Software empresarial") },
    { value: "inhouse", label: t(dict, "testimonialsPage.filters.inhouse", "Proyectos In-house") },
    { value: "consulting", label: t(dict, "testimonialsPage.filters.consulting", "Consultoría") },
    { value: "other", label: t(dict, "testimonialsPage.filters.other", "Otros proyectos") },
  ];

  return (
    <>
      <section className="px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="display-xl mb-6 tracking-tight text-foreground">
            {t(dict, "testimonialsPage.heroTitle", "Experiencias que construyen confianza.")}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t(dict, "testimonialsPage.heroSubtitle", "Cada proyecto representa una oportunidad para crear algo significativo. Conoce las experiencias de quienes han trabajado conmigo y los resultados de sus proyectos.")}
          </p>
        </div>
      </section>

      <section className="px-4 pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          <TestimonialsGrid
            testimonials={testimonials}
            locale={locale}
            filters={filters}
            ctaTitle={t(dict, "testimonialsPage.ctaTitle", "Construyamos algo que también pueda contar su historia.")}
            ctaButton={t(dict, "testimonialsPage.ctaButton", "Hablemos de tu proyecto")}
            featuredTitle={t(dict, "testimonialsPage.featured", "Destacados")}
            featuredSubtitle={t(dict, "testimonialsPage.featuredSubtitle", "Testimonios destacados que también aparecen en la página de inicio.")}
          />
        </div>
      </section>
    </>
  );
}
