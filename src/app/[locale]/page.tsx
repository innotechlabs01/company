import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Methodology } from "@/components/sections/methodology";
import { Collaboration } from "@/components/sections/collaboration";
import { Technologies } from "@/components/sections/technologies";
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
      <Hero locale={l} />
      <SectionFade>
        <Services locale={l} />
      </SectionFade>
      <SectionFade>
        <Methodology locale={l} />
      </SectionFade>
      <SectionFade>
        <Collaboration locale={l} />
      </SectionFade>
      <SectionFade>
        <Technologies locale={l} />
      </SectionFade>
      <SectionFade>
        <CaseStudies locale={l} />
      </SectionFade>
      <SectionFade>
        <TestimonialsSection locale={l} />
      </SectionFade>
      <SectionFade>
        <About locale={l} />
      </SectionFade>
      <SectionFade>
        <CTASection locale={l} />
      </SectionFade>
    </>
  );
}
