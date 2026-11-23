import { QuoteForm } from "@/components/contact/quote-form";
import { Mail, Send } from "lucide-react";
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
      <div className="mx-auto container-x">
        <div className="text-center mb-20 lg:mb-24">
          <h2 className="display-lg mb-6 tracking-tight text-foreground">
            {t(dict, "contact.title", "¿Tienes un proyecto en mente?")}
          </h2>
          <p className="body-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
            {t(dict, "contact.description", "Cuéntame qué quieres construir. Respondo generalmente en menos de 24 horas hábiles.")}
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          <div className="space-y-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {t(dict, "contact.writeDirectly", "Escríbeme directamente")}
            </h3>
            <ul className="space-y-6 text-muted-foreground">
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <Send className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">WhatsApp</p>
                  <a href={whatsappUrl} className="text-primary hover:underline text-sm">
                    +57 312 8386640
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Correo electrónico</p>
                  <a href="mailto:anthonyrivera51@icloud.com" className="text-primary hover:underline text-sm">
                    anthonyrivera51@icloud.com
                  </a>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6">
              {t(dict, "contact.requestQuote", "Solicita una cotización")}
            </h3>
            <QuoteForm locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
