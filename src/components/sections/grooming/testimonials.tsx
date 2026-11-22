"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { getDictionary, t } from "@/i18n/dictionary";
import { useReducedMotion } from "framer-motion";

type Testimonial = {
  quote: string;
  quoteEn: string;
  owner: string;
  ownerEn: string;
  pet: string;
  petEn: string;
  breed: string;
  breedEn: string;
  avatar: React.ReactNode;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Luna jamás había disfrutado tanto un baño. Salió oliendo a vainilla y con un moño precioso.",
    quoteEn: "Luna had never enjoyed a bath so much. She came out smelling of vanilla with a gorgeous bow.",
    owner: "Sofía & Luna",
    ownerEn: "Sofía & Luna",
    pet: "Luna",
    petEn: "Luna",
    breed: "Golden Retriever",
    breedEn: "Golden Retriever",
    avatar: (
      <svg className="h-12 w-12" viewBox="0 0 24 24" fill="#F59E0B" stroke="#92400E" strokeWidth="1.5" strokeLinejoin="round">
        <ellipse cx="12" cy="10" rx="8" ry="6" />
        <ellipse cx="7" cy="6" rx="3" ry="4" />
        <ellipse cx="17" cy="6" rx="3" ry="4" />
        <circle cx="10" cy="10" r="1" fill="#451A03" />
        <circle cx="14" cy="10" r="1" fill="#451A03" />
        <path d="M 11 13 Q 12 14 13 13" stroke="#451A03" strokeWidth="1.5" fill="none" />
      </svg>
    ),
  },
  {
    quote: "Trato excepcional con Michi, que es muy miedoso. Salió relajado y hermoso.",
    quoteEn: "Exceptional care with Michi, who is very shy. He came out relaxed and beautiful.",
    owner: "Carlos & Michi",
    ownerEn: "Carlos & Michi",
    pet: "Michi",
    petEn: "Michi",
    breed: "Gato siamés",
    breedEn: "Siamese cat",
    avatar: (
      <svg className="h-12 w-12" viewBox="0 0 24 24" fill="#E5E7EB" stroke="#374151" strokeWidth="1.5" strokeLinejoin="round">
        <ellipse cx="12" cy="10" rx="7" ry="5" />
        <path d="M 6 5 Q 8 1 12 5" fill="none" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 18 5 Q 16 1 12 5" fill="none" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="10" cy="10" r="1" fill="#111827" />
        <circle cx="14" cy="10" r="1" fill="#111827" />
        <path d="M 11 13 Q 12 13.5 13 13" stroke="#111827" strokeWidth="1.5" fill="none" />
      </svg>
    ),
  },
  {
    quote: "Los mejores de la ciudad. Toby siempre sale feliz y listo para presumir su nuevo corte.",
    quoteEn: "The best in the city. Toby always leaves happy and ready to show off his new cut.",
    owner: "Martina & Toby",
    ownerEn: "Martina & Toby",
    pet: "Toby",
    petEn: "Toby",
    breed: "Poodle toy",
    breedEn: "Toy poodle",
    avatar: (
      <svg className="h-12 w-12" viewBox="0 0 24 24" fill="#C4B5FD" stroke="#5B21B6" strokeWidth="1.5" strokeLinejoin="round">
        <circle cx="12" cy="10" r="6" />
        <path d="M 6 6 Q 8 3 12 6" fill="none" stroke="#5B21B6" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 18 6 Q 16 3 12 6" fill="none" stroke="#5B21B6" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="10" cy="10" r="1" fill="#1F2937" />
        <circle cx="14" cy="10" r="1" fill="#1F2937" />
        <path d="M 11 13 Q 12 13.5 13 13" stroke="#1F2937" strokeWidth="1.5" fill="none" />
      </svg>
    ),
  },
];

type GroomingTestimonialsProps = {
  locale: "es" | "en";
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
};
const reducedFadeUp = { hidden: { opacity: 1 }, show: { opacity: 1 } };

const stars = <div className="flex gap-1 text-amber-400">
  {[1, 2, 3, 4, 5].map((i) => (
    <Star key={i} className="h-4 w-4 fill-amber-400" />
  ))}
</div>;

export function GroomingTestimonials({ locale }: GroomingTestimonialsProps) {
  const dict = getDictionary(locale);
  const reduced = useReducedMotion();
  const variants = reduced ? reducedFadeUp : fadeUp;
  const isEs = locale === "es";

  return (
    <section className="px-4 py-24 lg:py-32" id="testimonios">
      <div className="mx-auto max-w-7xl">
        <div className="text-center lg:max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 mb-6 rounded-full border border-rose-200 bg-rose-50 text-xs font-medium text-rose-700 tracking-wide uppercase font-mono">
            {t(dict, "grooming.testimonials.eyebrow", "Lo que dicen las familias")}
          </span>
          <motion.h2
            variants={variants}
            initial="hidden"
            animate="show"
            className="display-lg mb-6 tracking-tight text-foreground"
          >
            {t(dict, "grooming.testimonials.title", "Historias con cola")}
          </motion.h2>
        </div>

        <motion.div
          variants={variants}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-3 gap-6"
        >
          {TESTIMONIALS.map((item) => (
            <motion.div
              key={item.pet}
              whileHover={{ y: -4 }}
              className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50">
                  {item.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.owner}</p>
                  <p className="text-xs text-stone-500">
                    {isEs ? item.breed : item.breedEn} · {isEs ? item.pet : item.petEn}
                  </p>
                </div>
              </div>
              <p className="text-sm text-stone-600 mb-4 leading-relaxed">
                “{isEs ? item.quote : item.quoteEn}”
              </p>
              <div className="flex items-center">{stars}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
