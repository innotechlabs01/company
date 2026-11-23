import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { CtaRepeated } from "@/components/sections/cta-repeated";
import { Methodology } from "@/components/sections/methodology";
import { Collaboration } from "@/components/sections/collaboration";
import { Technologies } from "@/components/sections/technologies";
import { Projects } from "@/components/sections/projects";
import { CaseStudies } from "@/components/sections/case-studies";
import TestimonialsSection from "@/components/sections/testimonials";
import { About } from "@/components/sections/about";
import { CTASection } from "@/components/sections/cta";
import { SectionFade } from "@/components/ui/section-fade";
import { IntroOverlay } from "@/components/brand/IntroOverlay";
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
  const l = locale as "es" | "en";

  return (
    <>
      <IntroOverlay />

      <SectionFade delay={0}>
        <Hero locale={l} />
      </SectionFade>
      <SectionFade delay={0.1}>
        <Services locale={l} />
      </SectionFade>
      <SectionFade delay={0.2}>
        <CtaRepeated locale={l} position="afterServices" />
      </SectionFade>
      <SectionFade delay={0.3}>
        <Methodology locale={l} />
      </SectionFade>
      <SectionFade delay={0.4}>
        <Collaboration locale={l} />
      </SectionFade>
      <SectionFade delay={0.5}>
        <Technologies locale={l} />
      </SectionFade>
      <SectionFade delay={0.6}>
        <Projects locale={l} />
      </SectionFade>
      <SectionFade delay={0.7}>
        <CaseStudies locale={l} />
      </SectionFade>
      <SectionFade delay={0.8}>
        <CtaRepeated locale={l} position="afterProjects" />
      </SectionFade>
      <SectionFade delay={0.9}>
        <TestimonialsSection locale={l} />
      </SectionFade>
      <SectionFade delay={1.0}>
        <About locale={l} />
      </SectionFade>
      <SectionFade delay={1.1}>
        <CTASection locale={l} />
      </SectionFade>
    </>
  );
}
