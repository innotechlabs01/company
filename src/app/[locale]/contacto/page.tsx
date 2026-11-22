import { QuoteForm } from "@/components/contact/quote-form";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/dictionary";
import { getDictionary, t } from "@/i18n/dictionary";

const contactoMeta: Record<Locale, { title: string; description: string }> = {
  es: {
    title: "Contacto — Anthony Rivera",
    description:
      "Solicita una cotización para tu proyecto de desarrollo de software. Escríbeme por WhatsApp o correo electrónico.",
  },
  en: {
    title: "Contact — Anthony Rivera",
    description:
      "Request a quote for your software development project. Write me on WhatsApp or email.",
  },
};

export const generateStaticParams = () => {
  return [{ locale: "es" }, { locale: "en" }];
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const m = contactoMeta[locale] || contactoMeta.es;
  return {
    title: m.title,
    description: m.description,
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  const whatsappMessage =
    locale === "es"
      ? "Hola Anthony, estoy interesado en conocer más sobre tus servicios. Me gustaría conversar sobre un proyecto."
      : "Hi Anthony, I'm interested in learning more about your services. I'd like to discuss a project.";
  const whatsappUrl = `https://wa.me/573128386640?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="px-4 py-24 lg:py-32">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-6">
            {t(dict, "contact.title", "¿Tienes un proyecto en mente?")}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
            {t(dict, "contact.description", "Cuéntame qué quieres construir. Respondo generalmente en menos de 24 horas hábiles.")}
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-6">
              {t(dict, "contact.writeDirectly", "Escríbeme directamente")}
            </h3>
            <ul className="space-y-5 text-muted-foreground">
              <li className="flex items-center gap-4">
                <span className="w-10 flex items-center">
                  💬
                </span>
                <a
                  href={whatsappUrl}
                  className="text-primary hover:underline"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-4">
                <span className="w-10 flex items-center">
                  ✉️
                </span>
                <a
                  href="mailto:anthonyrivera51@icloud.com"
                  className="text-primary hover:underline"
                >
                  anthonyrivera51@icloud.com
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-6">
              {t(dict, "contact.requestQuote", "Solicita una cotización")}
            </h3>
            <QuoteForm locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
