"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useReducedMotion } from "framer-motion";

type TrustFeature = {
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
};

const FEATURES: TrustFeature[] = [
  {
    title: "Peluqueros certificados",
    titleEn: "Certified groomers",
    description: "Manejo experto de perros y gatos de todas las razas y tamaños.",
    descriptionEn: "Expert handling of dogs and cats of all breeds and sizes.",
  },
  {
    title: "Productos naturales",
    titleEn: "Natural products",
    description: "Shampoos hipoalergénicos, libres de parabenos y aptos para pieles sensibles.",
    descriptionEn: "Hypoallergenic shampoos, paraben-free and safe for sensitive skin.",
  },
  {
    title: "Ambiente sin estrés",
    titleEn: "Stress-free environment",
    description: "Espacio tranquilo, mimos sin prisas y mucho refuerzo positivo.",
    descriptionEn: "Quiet space, unhurried cuddles, and plenty of positive reinforcement.",
  },
];

type GroomingTrustProps = {
  locale: "es" | "en";
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const reducedFadeUp = { hidden: { opacity: 1 }, show: { opacity: 1 } };

export function GroomingTrust({ locale }: GroomingTrustProps) {
  const reduced = useReducedMotion();
  const variants = reduced ? reducedFadeUp : fadeUp;
  const isEs = locale === "es";

  return (
    <section className="px-4 py-24 bg-stone-50 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid md:grid-cols-3 gap-8">
          {FEATURES.map((feature) => (
            <motion.div
              key={feature.title}
              variants={variants}
              initial="hidden"
              animate="show"
              className="flex flex-col items-center rounded-3xl border border-stone-200 bg-white p-8 text-center shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600 mb-6">
                <Check className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold mb-3">{isEs ? feature.title : feature.titleEn}</h3>
              <p className="text-sm text-stone-500">{isEs ? feature.description : feature.descriptionEn}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
