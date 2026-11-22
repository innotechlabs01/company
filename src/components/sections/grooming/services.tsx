"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { getDictionary, t } from "@/i18n/dictionary";
import { useReducedMotion } from "framer-motion";

type GroomingService = {
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  price: string;
  priceEn: string;
  icon: string;
};

const SERVICES: GroomingService[] = [
  {
    name: "Baño y cepillado",
    nameEn: "Bath & brush",
    description:
      "Shampoo suave, cepillado profundo y secado con cariño para dejar el pelaje brillante y suave.",
    descriptionEn: "Gentle shampoo, deep brushing, and loving drying for a shiny, soft coat.",
    price: "$18.000",
    priceEn: "$18.00",
    icon: "bath",
  },
  {
    name: "Corte de raza",
    nameEn: "Breed haircut",
    description:
      "Estilo según el estándar de la raza o como tú prefieras, con tijera o maquinilla.",
    descriptionEn: "Breed-standard styling or your own cut, with scissors or clippers.",
    price: "$25.000",
    priceEn: "$25.00",
    icon: "scissors",
  },
  {
    name: "Corte de uñas",
    nameEn: "Nail trim",
    description: "Uñas cortas y limpias, sin estrés para sus patitas.",
    descriptionEn: "Short, clean nails with zero stress for their paws.",
    price: "$8.000",
    priceEn: "$8.00",
    icon: "nails",
  },
  {
    name: "Limpieza de oídos",
    nameEn: "Ear cleaning",
    description: "Higiene suave para prevenir infecciones y molestias.",
    descriptionEn: "Gentle cleaning to prevent infections and discomfort.",
    price: "$10.000",
    priceEn: "$10.00",
    icon: "ears",
  },
];

const icons: Record<string, React.ReactNode> = {
  bath: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18V3" />
      <path d="M7 7h10v10H7z" />
      <path d="M12 3v18" />
      <path d="M3 12h18" />
    </svg>
  ),
  scissors: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="7" r="3" />
      <path d="M7 7L5 5" />
      <path d="M7 10v4" />
      <path d="M10 3v6l4 4" />
      <line x1="17" y1="21" x2="17" y2="12" />
      <line x1="14" y1="15" x2="17" y2="12" />
      <line x1="20" y1="15" x2="17" y2="12" />
    </svg>
  ),
  nails: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L15 9l6 1l-4 5l-2 8l-5-3l-5 3l-2-8l-4-5l6-1z" />
      <circle cx="12" cy="10" r="2" />
    </svg>
  ),
  ears: (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2c4.5 0 7 2 7 6.5s-1.5 6.5-7 6.5S5 10.5 5 6.5 9.5 2 12 2z" />
      <path d="M12 8c1.5 0 2 1.5 2 3s-0.5 3-2 3" />
      <path d="M8 6.5c0-2 1-4 4-4" />
    </svg>
  ),
};

type GroomingServicesProps = {
  locale: "es" | "en";
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
};
const reducedFadeUp = { hidden: { opacity: 1 }, show: { opacity: 1 } };

export function GroomingServices({ locale }: GroomingServicesProps) {
  const dict = getDictionary(locale);
  const reduced = useReducedMotion();
  const variants = reduced ? reducedFadeUp : fadeUp;
  const isEs = locale === "es";

  return (
    <section className="px-4 py-24 lg:py-32" id="servicios">
      <div className="mx-auto max-w-7xl">
        <div className="text-center lg:max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 mb-6 rounded-full border border-amber-200 bg-amber-50 text-xs font-medium text-amber-700 tracking-wide uppercase font-mono">
            {t(dict, "grooming.services.eyebrow", "Mimos para cada patita")}
          </span>
          <motion.h2
            variants={variants}
            initial="hidden"
            animate="show"
            className="display-lg mb-6 tracking-tight text-foreground"
          >
            {t(dict, "grooming.services.title", "Todo lo que tu mascota necesita")}
          </motion.h2>
          <motion.p
            variants={variants}
            initial="hidden"
            animate="show"
            className="text-lg text-muted-foreground"
          >
            {t(
              dict,
              "grooming.services.subtitle",
              "Servicios de peluquería canina y felina con productos naturales y mucho cariño."
            )}
          </motion.p>
        </div>

        <motion.div
          variants={variants}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {SERVICES.map((service) => {
            const Icon = icons[service.icon];
            return (
              <motion.div
                key={service.name}
                whileHover={{ y: -6 }}
                whileTap={{ y: 0 }}
                className="flex flex-col rounded-3xl border border-stone-200 bg-white p-6 text-stone-900 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700 mb-5">
                  {Icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{isEs ? service.name : service.nameEn}</h3>
                <p className="text-sm text-stone-500 mb-4">
                  {isEs ? service.description : service.descriptionEn}
                </p>
                <div className="mt-auto flex items-end gap-1">
                  <span className="text-xl font-bold text-rose-600">{isEs ? service.price : service.priceEn}</span>
                  <span className="text-xs text-stone-400">sesión</span>
                </div>
                <Button variant="outline" size="sm" asChild className="mt-auto w-full">
                  <Link href="#reservas">{t(dict, "grooming.services.book", "Reservar")} <ArrowRight className="ml-1 h-3 w-3" aria-hidden="true" /></Link>
                </Button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
