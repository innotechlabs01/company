"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { Mail, Send, ExternalLink } from "lucide-react";
import { BrandLogo } from "@/components/ui/brand-logo";
import { cn } from "@/lib/utils";
import { getDictionary, t } from "@/i18n/dictionary";

type FooterProps = {
  locale: "es" | "en";
};

const navItems: Array<{ key: string; href: string }> = [
  { key: "home", href: "/" },
  { key: "services", href: "#servicios" },
  { key: "projects", href: "#proyectos" },
  { key: "testimonials", href: "/testimonios" },
  { key: "about", href: "#sobre-mi" },
  { key: "contact", href: "/contacto" },
];

const footerServices = [
  { key: "web", href: "#servicios" },
  { key: "customSoftware", href: "#servicios" },
  { key: "mobileApp", href: "#servicios" },
  { key: "inhouse", href: "#servicios" },
  { key: "consulting", href: "#servicios" },
];

const socialLinks = [
  {
    icon: ExternalLink,
    label: "LinkedIn",
    href: "https://linkedin.com/in/anthonyrivera",
  },
  {
    icon: ExternalLink,
    label: "GitHub",
    href: "https://github.com/anthonyrivera",
  },
  {
    icon: Send,
    label: "WhatsApp",
    href: "https://wa.me/573128386640",
  },
];

export function Footer({ locale }: FooterProps) {
  const dict = getDictionary(locale);
  const [languageOpen, setLanguageOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const whatsappMessage =
    locale === "es"
      ? "Hola Anthony, estoy interesado en conocer más sobre tus servicios. Me gustaría conversar sobre un proyecto."
      : "Hi Anthony, I'm interested in learning more about your services. I'd like to discuss a project.";
  const whatsappUrl = `https://wa.me/573128386640?text=${encodeURIComponent(whatsappMessage)}`;

  const handleLanguageChange = (nextLocale: string) => () => {
    const withoutLocale = pathname.replace(`/${locale}`, "") || "/";
    router.push(`/${nextLocale}${withoutLocale}`);
  };

  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <BrandLogo variant="horizontal" mode="dark" width={120} />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Desarrollador de software enfocado en transformar necesidades de
              negocio en soluciones tecnológicas funcionales, escalables y
              sostenibles.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-6">
              {t(dict, "footer.nav", "Navegación")}
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={`/${locale}${item.href}`}
                    className="hover:text-foreground transition-colors"
                  >
                    {t(dict, `nav.${item.key}`, item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-6">
              {t(dict, "footer.services", "Servicios")}
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {footerServices.map((s) => (
                <li key={s.key}>
                  <Link
                    href={`/${locale}${s.href}`}
                    className="hover:text-foreground transition-colors"
                  >
                    {t(dict, `services.names.${s.key}`, s.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-6">
              {t(dict, "footer.contact", "Contacto")}
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <a href={whatsappUrl} className="hover:text-foreground transition-colors">
                  <Send className="h-4 w-4 shrink-0" aria-hidden="true" />
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-3">
                <a
                  href="mailto:anthonyrivera51@icloud.com"
                  className="hover:text-foreground transition-colors"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  anthonyrivera51@icloud.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/60 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-muted-foreground">
          <p className="leading-none">
            {t(dict, "footer.rights", "Derechos reservados.")}{" "}
            {new Date().getFullYear()} Anthony Rivera.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="hidden sm:block">{t(dict, "footer.language", "Idioma")}</span>
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
                  <div className="absolute top-full right-0 mt-1.5 w-24 rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-lg z-10">
                    {["es", "en"].map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          handleLanguageChange(option)();
                          setLanguageOpen(false);
                        }}
                        className={cn(
                          "flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors",
                          option === locale
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                        )}
                      >
                        {t(dict, `localeSwitcher.${option}`, option.toUpperCase())}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
