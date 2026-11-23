import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Methodology } from "@/components/sections/methodology";
import { Collaboration } from "@/components/sections/collaboration";
import { Technologies } from "@/components/sections/technologies";
import { Projects } from "@/components/sections/projects";
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
      <IntroOverlay onFinish={() => {}} />

      <SectionFade delay={0}>
        <Hero locale={l} />
      </SectionFade>
      <SectionFade delay={0.1}>
        <Services locale={l} />
      </SectionFade>
      <SectionFade delay={0.2}>
        <Methodology locale={l} />
      </SectionFade>
      <SectionFade delay={0.3}>
        <Collaboration locale={l} />
      </SectionFade>
      <SectionFade delay={0.4}>
        <Technologies locale={l} />
      </SectionFade>
      <SectionFade delay={0.5}>
        <Projects locale={l} />
      </SectionFade>
      <SectionFade delay={0.6}>
        <TestimonialsSection locale={l} />
      </SectionFade>
      <SectionFade delay={0.7}>
        <About locale={l} />
      </SectionFade>
      <SectionFade delay={0.8}>
        <CTASection locale={l} />
      </SectionFade>
    </>
  );
}
