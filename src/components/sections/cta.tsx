import { Button } from "@/components/ui/button";
import { MessageCircle, Mail } from "lucide-react";
import { getDictionary, t } from "@/i18n/dictionary";

type CTASectionProps = {
  locale: "es" | "en";
};

export function CTASection({ locale }: CTASectionProps) {
  const dict = getDictionary(locale);

  const whatsappUrl = `https://wa.me/573128386640?text=${encodeURIComponent(
    t(dict, "whatsapp.message", "Hola Anthony, estoy interesado en conocer más sobre tus servicios. Me gustaría conversar sobre un proyecto."),
  )}`;

  return (
    <section className="px-4 py-24 lg:py-32 bg-primary">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
          {t(dict, "cta.title", "¿Tienes una idea o un proyecto en mente?")}
        </h2>
        <p className="text-primary-foreground/90 text-lg leading-relaxed mb-10">
          {t(dict, "cta.description", "Cuéntame qué quieres construir. Podemos conversar sobre tus necesidades y encontrar la mejor manera de llevarlo a cabo.")}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
            <a href={whatsappUrl} className="flex items-center gap-2 w-full justify-center">
              <MessageCircle className="h-5 w-5" />
              {t(dict, "cta.whatsapp", "Contactar por WhatsApp")}
            </a>
          </Button>
          <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto">
            <a href="mailto:anthonyrivera51@icloud.com" className="flex items-center gap-2 w-full justify-center">
              <Mail className="h-5 w-5" />
              {t(dict, "cta.email", "Enviar un correo")}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
