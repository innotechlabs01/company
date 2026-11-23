import Link from "next/link";
import { BrandLogo } from "@/components/ui/brand-logo";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDictionary, t } from "@/i18n/dictionary";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/dictionary";

export const generateStaticParams = () => {
  return [{ locale: "es" }, { locale: "en" }];
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const resolved = params ? await params : {};
  const { locale = "es" } = resolved as { locale?: Locale };
  const dict = getDictionary(locale);
  return {
    title: t(dict, "notFound.title", "Página no encontrada · Anthony Rivera"),
  };
}

export default async function NotFound({
  params,
}: {
  params?: Promise<{ locale: Locale }>;
}) {
  const resolved = params ? await params : {};
  const { locale = "es" } = resolved as { locale?: Locale };
  const dict = getDictionary(locale);

  return (
    <section className="px-4 py-24 lg:py-40">
      <div className="mx-auto container-x text-center">
        <BrandLogo variant="monogram" mode="dark" width={48} height={48} className="mx-auto mb-8" alt="AR" />
        <h1 className="display-xl mb-6 tracking-tight text-foreground">
          {t(dict, "notFound.title", "Página no encontrada")}
        </h1>
        <p className="body-lg text-muted-foreground mb-10 max-w-lg mx-auto leading-relaxed">
          {t(dict, "notFound.description", "La página que buscas no existe. Vuelve al inicio o contáctame directamente.")}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={`/${locale}`} className="text-sm font-medium text-primary hover:underline transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1.5" aria-hidden="true" />
            {t(dict, "notFound.back", "Volver al inicio")}
          </Link>
          <Button size="sm" asChild className="ml-0 sm:ml-0">
            <a href={`/${locale}/contacto`}>
              {t(dict, "nav.cta", "Hablemos de tu proyecto")}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
