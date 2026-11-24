import type { Metadata } from "next";
import { TestimonialForm } from "@/components/testimonials/testimonial-form";
import type { Locale } from "@/i18n/dictionary";

export const generateStaticParams = () => {
  return [{ locale: "es" }, { locale: "en" }];
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const isEn = locale === "en";
  return {
    title: isEn ? "Submit a Testimonial" : "Enviar testimonio",
    description: isEn
      ? "Share your experience working with Anthony Rivera."
      : "Comparte tu experiencia trabajando con Anthony Rivera.",
    robots: { index: false, follow: false },
  };
}

export default async function SubmitTestimonialPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const isEn = locale === "en";

  return (
    <section className="px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="space-y-3 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
            {isEn ? "Client Feedback" : "Feedback de clientes"}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            {isEn ? "Leave a testimonial" : "Deja tu testimonio"}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto">
            {isEn
              ? "Your feedback helps other teams understand how we work and the impact of our software engineering."
              : "Tu opinión ayuda a otros equipos a conocer cómo trabajamos y el impacto de nuestras soluciones de software."}
          </p>
        </div>

        <TestimonialForm locale={locale} />
      </div>
    </section>
  );
}
