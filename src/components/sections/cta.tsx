import { BrandLogo } from "@/components/ui/brand-logo";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail } from "lucide-react";
import { getDictionary, t } from "@/i18n/dictionary";

type CTASectionProps = {
  locale: "es" | "en";
};

export function CTASection({ locale }: CTASectionProps) {
  const dict = getDictionary(locale);

  const whatsappMessage =
    locale === "es"
      ? "Hola Anthony, estoy interesado en conocer tus servicios y conversar sobre un proyecto."
      : "Hi Anthony, I'm interested in your services and would like to discuss a project.";
  const whatsappUrl = `https://wa.me/573128386640?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="px-4 py-24 lg:py-32" id="contacto">
      <div className="mx-auto container-x">
        <div className="max-w-2xl mx-auto rounded-xl border border-border bg-card p-10 lg:p-16 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <BrandLogo variant="monogram" mode="dark" width={18} height={18} className="shrink-0" alt="AR" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
              Anthony Rivera
            </span>
          </div>
          <h2 className="display-lg mb-6 tracking-tight text-foreground">
            {t(dict, "cta.title", "Tu próximo proyecto puede comenzar aquí.")}
          </h2>
          <p className="body-lg text-muted-foreground leading-relaxed mb-12 max-w-xl mx-auto">
            {t(dict, "cta.description", "Conversemos sobre lo que quieres construir y encontremos la mejor manera de hacerlo realidad.")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild variant="default" size="lg" className="w-full sm:w-auto shadow-md shadow-primary/20">
              <a href={whatsappUrl} className="flex items-center gap-2 w-full justify-center">
                <MessageCircle className="h-5 w-5" />
                {t(dict, "cta.whatsapp", "Contactar por WhatsApp")}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <a href="mailto:anthonyrivera51@icloud.com" className="flex items-center gap-2 w-full justify-center">
                <Mail className="h-5 w-5" />
                {t(dict, "cta.email", "Enviar un correo")}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
