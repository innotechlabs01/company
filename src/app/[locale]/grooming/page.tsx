import type { Metadata } from "next";
import { GroomingHero } from "@/components/sections/grooming/hero";
import { GroomingServices } from "@/components/sections/grooming/services";
import { GroomingTrust } from "@/components/sections/grooming/trust";
import { GroomingTestimonials } from "@/components/sections/grooming/testimonials";
import { GroomingBooking } from "@/components/sections/grooming/booking";
import { getDictionary, t } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/dictionary";

const metaByLocale: Record<Locale, { title: string; description: string }> = {
  es: {
    title: "Patitas Felices · Peluquería Canina y Felina",
    description:
      "Baños, cortes de raza, uñas y mimos con mucho cariño para perros y gatos. Peluqueros certificados, productos naturales y ambiente sin estrés. Reserva tu cita hoy.",
  },
  en: {
    title: "Happy Paws · Dog & Cat Grooming",
    description:
      "Baths, breed cuts, nail trims, and lots of love for dogs and cats. Certified groomers, natural products, and a stress-free environment. Book your appointment today.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const m = metaByLocale[locale] || metaByLocale.es;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `https://example.com/grooming/${locale}`,
      languages: {
        es: `https://example.com/grooming/es`,
        en: `https://example.com/grooming/en`,
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: `https://example.com/grooming/${locale}`,
      siteName: "Patitas Felices",
      locale: locale === "es" ? "es_CO" : "en_US",
      type: "website",
    },
  };
}

export const generateStaticParams = () => {
  return [{ locale: "es" }, { locale: "en" }];
};

export default async function GroomingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-rose-600 focus:px-4 focus:py-2 focus:text-white"
      >
        {t(dict, "grooming.skipLink", "Saltar al contenido")}
      </a>
      <GroomingHero locale={locale} />
      <GroomingServices locale={locale} />
      <GroomingTrust locale={locale} />
      <GroomingTestimonials locale={locale} />
      <section id="contenido" className="sr-only">
        <span id="content" />
      </section>
      <GroomingBooking locale={locale} />
      <footer className="border-t border-stone-200 bg-stone-50 px-4 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-sm text-stone-500">
            <p>
              {t(dict, "grooming.footer.name", "Patitas Felices")} · {t(
                dict,
                "grooming.footer.tagline",
                "Peluquería y spa para perros y gatos"
              )}
            </p>
            <p>
              {t(dict, "grooming.footer.demo", "Demo content. No representa clientes reales.")}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
