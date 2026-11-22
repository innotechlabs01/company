import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Methodology } from "@/components/sections/methodology";
import { Collaboration } from "@/components/sections/collaboration";
import { Technologies } from "@/components/sections/technologies";
import { Projects } from "@/components/sections/projects";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { About } from "@/components/sections/about";
import { CTASection } from "@/components/sections/cta";
import type { Locale } from "@/i18n/dictionary";

export const generateStaticParams = () => {
  return [{ locale: "es" }, { locale: "en" }];
};

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <>
      <Hero locale={locale} />
      <Services locale={locale} />
      <Methodology locale={locale} />
      <Collaboration locale={locale} />
      <Technologies locale={locale} />
      <Projects locale={locale} />
      <TestimonialsSection locale={locale} />
      <About locale={locale} />
      <CTASection locale={locale} />
    </>
  );
}
