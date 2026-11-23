import type { Locale } from "@/i18n/dictionary";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LangSetter } from "@/components/layout/lang-setter";
import { site } from "@/config/site";
import { FloatingWhatsApp } from "@/components/brand/floating-whatsapp";

const SITE_NAME = site.name;

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
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const m = metaByLocale[locale] || metaByLocale.es;
  const alternates = site.locales.reduce<Record<string, string>>((acc, l) => {
    acc[l] = `${site.url}/${l}`;
    return acc;
  }, {});

  return {
    metadataBase: new URL(site.url),
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `${site.url}/${locale}`,
      languages: alternates,
    },
    icons: [{ url: "/favicon.svg" }],
    openGraph: {
      title: m.title,
      description: m.description,
      url: `${site.url}/${locale}`,
      siteName: SITE_NAME,
      locale: locale === "es" ? "es_CO" : "en_US",
      type: "website",
      images: [
        {
          url: `/images/og-${locale}.jpg`,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
      images: [`/images/og-${locale}.jpg`],
    },
    other: {
      "hreflang-es": `${site.url}/es`,
      "hreflang-en": `${site.url}/en`,
      "hreflang-x-default": `${site.url}/es`,
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

  return (
    <div className="flex flex-col min-h-[100dvh]" data-lang={locale}>
      <LangSetter locale={locale} />
      <Header locale={locale} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} />
      <FloatingWhatsApp />
    </div>
  );
}
