"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { getDictionary, t } from "@/i18n/dictionary";
import { useReducedMotion } from "framer-motion";

type GroomingHeroProps = {
  locale: "es" | "en";
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const reducedFadeUp = {
  hidden: { opacity: 1 },
  show: { opacity: 1 },
};

export function GroomingHero({ locale }: GroomingHeroProps) {
  const dict = getDictionary(locale);
  const reduced = useReducedMotion();
  const variants = reduced ? reducedFadeUp : fadeUp;

  return (
    <section className="relative px-4 pt-20 pb-32 lg:pt-36 lg:pb-44 overflow-hidden" id="inicio">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <motion.div
          className="absolute top-[-8%] left-[-10%] w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply blur-[120px]"
          animate={reduced ? {} : { y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-amber-200 rounded-full mix-blend-multiply blur-[100px]"
          animate={reduced ? {} : { y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-[20%] right-[-6%] w-64 h-64 bg-violet-200 rounded-full mix-blend-multiply blur-[80px]"
          animate={reduced ? {} : { y: [0, -16, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1" style={{ animationDelay: "0.1s" }}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 rounded-full border border-rose-200 bg-rose-50 text-xs font-medium text-rose-700 tracking-wide uppercase">
              <span className="h-2 w-2 rounded-full bg-rose-500" aria-hidden="true" />
              {t(dict, "grooming.hero.eyebrow", "Cuidado con mucho cariño")}
            </span>
            <motion.h1
              variants={variants}
              initial="hidden"
              animate="show"
              className="display-xl mb-6 tracking-tight text-foreground"
            >
              {t(dict, "grooming.hero.title", "Tu mejor amigo merece el mejor cuidado")}
            </motion.h1>
            <motion.p
              variants={variants}
              initial="hidden"
              animate="show"
              className="body-lg text-muted-foreground mb-10 max-w-lg"
            >
              {t(
                dict,
                "grooming.hero.subtitle",
                "Baños, cortes de raza, uñas y mimos con mucho cariño para perros y gatos. Shampoos naturales, peluqueros certificados y un ambiente sin estrés."
              )}
            </motion.p>
            <motion.div
              variants={variants}
              initial="hidden"
              animate="show"
              className="flex flex-col sm:flex-row items-center justify-start sm:justify-start gap-4"
            >
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="#reservas">{t(dict, "grooming.hero.ctaBook", "Reservar cita")}</Link>
              </Button>
              <Button variant="outline" asChild size="lg" className="w-full sm:w-auto">
                <Link href="#servicios">{t(dict, "grooming.hero.ctaServices", "Ver servicios")}</Link>
              </Button>
            </motion.div>
            <motion.div
              variants={variants}
              initial="hidden"
              animate="show"
              className="mt-10 flex items-center gap-3 text-sm text-stone-500"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 bg-white">
                <span className="text-[10px] font-bold">4,9★</span>
              </span>
              <span>
                {t(dict, "grooming.hero.ratingLabel", "+500 mimos entregados · valoración promedio")}
              </span>
            </motion.div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="relative mx-auto max-w-sm">
              <svg
                className="w-full max-w-[320px] drop-shadow-md"
                viewBox="0 0 320 320"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-labelledby="heroTitle"
              >
                <title id="heroTitle">Perrito feliz en la tina de baño con burbujas</title>
                <defs>
                  <linearGradient id="dogGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FCD34D" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </linearGradient>
                </defs>
                <rect x="44" y="150" width="232" height="126" rx="34" fill="#FDEDEC" stroke="#E11D48" strokeWidth="7" />
                <rect x="56" y="160" width="208" height="106" rx="26" fill="#FDEDEC" />
                <rect x="64" y="188" width="192" height="72" rx="18" fill="#FEE2E2" />
                <circle cx="92" cy="200" r="6" fill="none" stroke="#F472B6" strokeWidth="2" opacity="0.9" />
                <circle cx="132" cy="192" r="5" fill="none" stroke="#F472B6" strokeWidth="2" opacity="0.8" />
                <circle cx="174" cy="204" r="6" fill="none" stroke="#F472B6" strokeWidth="2" opacity="0.9" />
                <circle cx="218" cy="196" r="5" fill="none" stroke="#F472B6" strokeWidth="2" opacity="0.8" />
                <ellipse cx="160" cy="114" rx="40" ry="34" fill="url(#dogGrad)" />
                <ellipse cx="128" cy="90" rx="13" ry="16" fill="url(#dogGrad)" />
                <ellipse cx="192" cy="90" rx="13" ry="16" fill="url(#dogGrad)" />
                <circle cx="144" cy="112" r="3.5" fill="#5B2112" />
                <circle cx="176" cy="112" r="3.5" fill="#5B2112" />
                <path d="M 152 122 Q 160 130 168 122" stroke="#5B2112" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M 156 126 Q 160 124 164 126" stroke="#5B2112" strokeWidth="2" fill="none" strokeLinecap="round" />
                <circle cx="152" cy="118" r="1.5" fill="#FCD34D" />
                <circle cx="168" cy="118" r="1.5" fill="#FCD34D" />
                <path d="M 64 130 Q 160 60 256 130" stroke="#E11D48" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.6" />
                <circle cx="104" cy="96" r="4" fill="#E11D48" opacity="0.7" />
                <circle cx="216" cy="96" r="4" fill="#E11D48" opacity="0.7" />
                <circle cx="160" cy="136" r="3" fill="#E11D48" opacity="0.6" />
              </svg>
              <span className="absolute -top-4 -left-4 flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-amber-400" aria-hidden="true" />
                {t(dict, "grooming.hero.bathLabel", "Baño relajante")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
