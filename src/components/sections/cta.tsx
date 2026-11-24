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
    <section
      className="relative overflow-hidden bg-slate-950 text-white py-24 lg:py-28 border-t border-slate-800/80"
      id="contacto"
    >
      {/* Subtle radial accent glow & grid */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(22,136,248,0.22),_transparent_60%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto container-x">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3.5 py-1.5 mb-7">
            <BrandLogo
              variant="monogram"
              mode="light"
              width={16}
              height={16}
              className="shrink-0"
              alt="AR"
            />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-sky-400">
              Anthony Rivera
            </span>
          </div>

          <h2 className="display-lg mb-5 tracking-tight text-white">
            {t(dict, "cta.title", "Tu próximo proyecto puede comenzar aquí.")}
          </h2>
          <p className="body-lg text-slate-300 leading-relaxed mb-10 max-w-xl mx-auto">
            {t(
              dict,
              "cta.description",
              "Conversemos sobre lo que quieres construir y encontremos la mejor manera de hacerlo realidad.",
            )}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              variant="default"
              size="lg"
              className="w-full sm:w-auto shadow-lg shadow-primary/25"
            >
              <a
                href={whatsappUrl}
                className="flex items-center gap-2 w-full justify-center"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                {t(dict, "cta.whatsapp", "Contactar por WhatsApp")}
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-slate-700 bg-slate-900/70 text-white hover:bg-slate-800 hover:text-white"
            >
              <a
                href="mailto:anthonyrivera51@icloud.com"
                className="flex items-center gap-2 w-full justify-center"
              >
                <Mail className="h-5 w-5" aria-hidden="true" />
                {t(dict, "cta.email", "Enviar un correo")}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
