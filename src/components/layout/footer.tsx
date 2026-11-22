"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Send, Mail } from "lucide-react";
import { useState } from "react";
import { getDictionary, t } from "@/i18n/dictionary";

type FooterProps = {
  locale: "es" | "en";
};

const navItems: Array<{ key: string; labelEs: string; href: string }> = [
  { key: "home", labelEs: "Inicio", href: "/" },
  { key: "services", labelEs: "Servicios", href: "/servicios" },
  { key: "projects", labelEs: "Proyectos", href: "/proyectos" },
  { key: "testimonials", labelEs: "Testimonios", href: "/testimonios" },
  { key: "about", labelEs: "Sobre mí", href: "/sobre-mi" },
  { key: "contact", labelEs: "Contacto", href: "/contacto" },
];

export function Footer({ locale }: FooterProps) {
  const dict = getDictionary(locale);
  const [languageOpen, setLanguageOpen] = useState(false);

  const whatsappUrl = `https://wa.me/573128386640?text=${encodeURIComponent(
    t(dict, "whatsapp.message", "Hola Anthony, estoy interesado en conocer más sobre tus servicios. Me gustaría conversar sobre un proyecto."),
  )}`;

  const handleLanguageChange = (nextLocale: string) => {
    const p = typeof window !== "undefined" ? window.location.pathname : "";
    const withoutLocale = p.replace(`/${locale}`, "") || "/";
    window.location.href = `/${nextLocale}${withoutLocale}`;
  };

  return (
    <footer className="border-y border-border/60 bg-background">
      <div className="px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href={`/${locale}`} className="text-xl font-bold tracking-tight">
              Anthony Rivera
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Desarrollador de software enfocado en transformar necesidades de
              negocio en soluciones tecnológicas funcionales, escalables y
              sostenibles.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              {t(dict, "footer.nav", "Navegación")}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link href={`/${locale}${item.href}`} className="hover:text-foreground transition-colors">
                    {item.labelEs}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              {t(dict, "footer.services", "Servicios")}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href={`/${locale}/servicios`} className="hover:text-foreground transition-colors">
                  Desarrollo Web
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/software-a-medida`} className="hover:text-foreground transition-colors">
                  Software a Medida
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/aplicaciones-moviles`} className="hover:text-foreground transition-colors">
                  Aplicaciones Móviles
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/proyectos-inhouse`} className="hover:text-foreground transition-colors">
                  Proyectos In-house
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/consultoria`} className="hover:text-foreground transition-colors">
                  Consultoría Tecnológica
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              {t(dict, "footer.contact", "Contacto")}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <a href={whatsappUrl} className="hover:text-foreground transition-colors">
                  <Send className="h-4 w-4" aria-hidden="true" />
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2">
                <a href="mailto:anthonyrivera51@icloud.com" className="hover:text-foreground transition-colors">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  anthonyrivera51@icloud.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/60 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>
            {t(dict, "footer.rights", "Derechos reservados.")}{" "}
            {new Date().getFullYear()} Anthony Rivera.
          </p>
          <div className="flex items-center gap-4">
            <span>{t(dict, "footer.language", "Idioma")}</span>
            <div className="relative inline-block">
              <button
                onClick={() => setLanguageOpen(!languageOpen)}
                className="text-sm font-medium hover:text-foreground"
                aria-expanded={languageOpen}
                aria-haspopup="listbox"
              >
                {locale.toUpperCase()}
              </button>
              {languageOpen && (
                <div className="absolute bottom-full left-0 mb-2 w-24 rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-lg z-10">
                  {["es", "en"].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        handleLanguageChange(option);
                        setLanguageOpen(false);
                      }}
                      className={cnLanguage(
                        "flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors",
                        option === locale
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      {option.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function cnLanguage(
  base: string,
  conditional: string,
): string {
  return `${base} ${conditional}`;
}
