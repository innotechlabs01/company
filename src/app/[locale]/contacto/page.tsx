import { QuoteForm } from "@/components/contact/quote-form";
import { Mail, Send, Phone, Clock, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/dictionary";
import { getDictionary, t } from "@/i18n/dictionary";
import { site, getContactPhone } from "@/config/site";
import { cn } from "@/lib/utils";

const contactoMeta: Record<Locale, { title: string; description: string }> = {
  es: {
    title: "Contacto",
    description:
      "Solicita una cotización para tu proyecto de desarrollo de software. Escríbeme por WhatsApp o correo electrónico.",
  },
  en: {
    title: "Contact",
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

const contactCard = (
  icon: React.ElementType,
  title: string,
  value: string,
  href: string,
) => {
  const Icon = icon;
  return (
    <a
      href={href}
      className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 hover:border-primary/50 hover:bg-primary/5 transition-colors"
    >
      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
        <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary-foreground" aria-hidden="true" />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </p>
        <p className="font-semibold text-foreground text-sm leading-tight">
          {value}
        </p>
      </div>
    </a>
  );
};

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  const whatsappMessage = t(
    dict,
    "contact.whatsappMessage",
    "Hola Anthony, estoy interesado en conocer más sobre tus servicios.",
  );
  const whatsappUrl = `${site.contact.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="px-4 py-24 lg:py-32">
      <div className="mx-auto container-x">
        <div className="text-center mb-20 lg:mb-28">
          <h1 className="display-lg mb-6 tracking-tight text-foreground">
            {t(dict, "contact.title", "¿Tienes un proyecto en mente?")}
          </h1>
          <p className="body-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
            {t(dict, "contact.description", "Cuéntame qué quieres construir. Respondo generalmente en menos de 24 horas hábiles.")}
          </p>
        </div>

        {/* Contact methods */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 mb-20 lg:mb-24">
          <div className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {t(dict, "contact.writeDirectly", "Escríbeme directamente")}
            </h3>
            <ul className="space-y-4">
              {contactCard(
                Send,
                t(dict, "contact.whatsappLabel", "WhatsApp"),
                getContactPhone(locale),
                whatsappUrl,
              )}
              {contactCard(
                Mail,
                t(dict, "contact.emailLabel", "Correo electrónico"),
                site.contact.email,
                `mailto:${site.contact.email}`,
              )}
            </ul>
          </div>
          <div className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {t(dict, "contact.whatToExpect", "Qué puedes esperar")}
            </h3>
            <ul className="space-y-4">
              {[
                {
                  icon: Clock,
                  title: "contact.responseTime",
                  text: t(dict, "contact.responseTime", "Respuesta en menos de 24 horas hábiles"),
                },
                {
                  icon: CheckCircle2,
                  title: "contact.noMiddlemen",
                  text: t(dict, "contact.noMiddlemen", "Habla directo conmigo, sin intermediarios ni account managers"),
                },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                    <item.icon className="h-3 w-3" aria-hidden="true" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          <div className="order-last lg:order-first">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6">
              {t(dict, "contact.requestQuote", "Solicita una cotización")}
            </h3>
            <QuoteForm locale={locale} />
          </div>
          <div className="order-first lg:order-last">
            <div className="rounded-2xl border border-border bg-muted/50 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Phone className="h-5 w-5 text-primary" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-foreground">
                  {t(dict, "contact.preferTalk", "¿Prefieres hablar por teléfono?")}
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t(
                  dict,
                  "contact.callDescription",
                  "Agenda una llamada breve para conversar sobre tu proyecto y definir los próximos pasos.",
                )}
              </p>
              <a
                href={whatsappUrl}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:border-primary/40 hover:bg-muted/60 transition-colors w-full sm:w-auto"
              >
                <Send className="h-4 w-4 shrink-0" aria-hidden="true" />
                {t(dict, "contact.scheduleCall", "Agendar llamada por WhatsApp")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
