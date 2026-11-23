"use client";

import { useState } from "react";
import { BrandIntro } from "./BrandIntro";
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

type IntroGateProps = {
  locale: string;
};

export function IntroGate({ locale }: IntroGateProps) {
  const [introDone, setIntroDone] = useState(false);

  // Una sola vez por sesión: si ya se mostró, ir directo al contenido.
  if (!introDone) {
    return <BrandIntro onFinish={() => setIntroDone(true)} />;
  }

  return (
    <>
      <SectionFade delay={0}>
        <Hero locale={locale as "es" | "en"} />
      </SectionFade>
      <SectionFade delay={0.1}>
        <Services locale={locale as "es" | "en"} />
      </SectionFade>
      <SectionFade delay={0.2}>
        <Methodology locale={locale as "es" | "en"} />
      </SectionFade>
      <SectionFade delay={0.3}>
        <Collaboration locale={locale as "es" | "en"} />
      </SectionFade>
      <SectionFade delay={0.4}>
        <Technologies locale={locale as "es" | "en"} />
      </SectionFade>
      <SectionFade delay={0.5}>
        <Projects locale={locale as "es" | "en"} />
      </SectionFade>
      <SectionFade delay={0.6}>
        <TestimonialsSection locale={locale as "es" | "en"} />
      </SectionFade>
      <SectionFade delay={0.7}>
        <About locale={locale as "es" | "en"} />
      </SectionFade>
      <SectionFade delay={0.8}>
        <CTASection locale={locale as "es" | "en"} />
      </SectionFade>
    </>
  );
}
