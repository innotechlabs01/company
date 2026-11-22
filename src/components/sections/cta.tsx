import { Button } from "@/components/ui/button";
import { MessageCircle, Mail } from "lucide-react";
import { getDictionary, t } from "@/i18n/dictionary";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

type CTASectionProps = {
  locale: "es" | "en";
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const reducedFadeUp = { hidden: { opacity: 1 }, show: { opacity: 1 } };

export function CTASection({ locale }: CTASectionProps) {
  const dict = getDictionary(locale);
  const reduced = useReducedMotion();
  const variants = reduced ? reducedFadeUp : fadeUp;

  const whatsappMessage =
    locale === "es"
      ? "Hola Anthony, estoy interesado en conocer tus servicios y conversar sobre un proyecto."
      : "Hi Anthony, I'm interested in your services and would like to discuss a project.";
  const whatsappUrl = `https://wa.me/573128386640?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="px-4 py-32 lg:py-40" id="contacto">
      <div className="mx-auto container-x">
        <motion.div
          variants={variants}
          initial="hidden"
          animate="show"
          className="max-w-2xl mx-auto rounded-xl border border-border bg-card p-12 lg:p-16 text-center"
        >
          <h2 className="display-lg mb-6 tracking-tight text-foreground">
            {t(dict, "cta.title", "¿Tienes una idea o un proyecto en mente?")}
          </h2>
          <p className="body-lg text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto">
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
        </motion.div>
      </div>
    </section>
  );
}
