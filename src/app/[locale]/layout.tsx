import type { Locale } from "@/i18n/dictionary";
import GroomingShell from "./grooming-shell";

const SITE_NAME = "Anthony Rivera";
const SITE_URL = "https://anthonyrivera.dev";

const metaByLocale: Record<Locale, { title: string; description: string }> = {
  es: {
    title: "Anthony Rivera — Desarrollo de software a medida",
    description:
      "Transformo ideas en soluciones digitales que generan resultados. Desarrollo web, aplicaciones móviles, software empresarial y consultoría tecnológica.",
  },
  en: {
    title: "Anthony Rivera — Custom Software Development",
    description:
      "I turn ideas into digital solutions that drive results. Web development, mobile applications, enterprise software, and technology consulting.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  const m = metaByLocale[locale] || metaByLocale.es;
  const otherLocale = locale === "es" ? "en" : "es";

  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        es: `${SITE_URL}/es`,
        en: `${SITE_URL}/en`,
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: `${SITE_URL}/${locale}`,
      siteName: SITE_NAME,
      locale: locale === "es" ? "es_CO" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
    },
    other: {
      "hreflang-es": `${SITE_URL}/es`,
      "hreflang-en": `${SITE_URL}/en`,
      "hreflang-x-default": `${SITE_URL}/es`,
    },
  };
}

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = (await params) as { locale: Locale };

  return <GroomingShell locale={locale}>{children}</GroomingShell>;
}
