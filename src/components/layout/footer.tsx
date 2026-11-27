"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { Mail, Send, ExternalLink } from "lucide-react";
import { BrandLogo } from "@/components/ui/brand-logo";
import { cn } from "@/lib/utils";
import { getDictionary, t } from "@/i18n/dictionary";
import { site, getContactPhone } from "@/config/site";

type FooterProps = {
  locale: "es" | "en";
};

const navItems: Array<{ key: string; href: string }> = [
  { key: "home", href: "/" },
  { key: "services", href: "/servicios" },
  { key: "projects", href: "/casos-de-estudio" },
  { key: "testimonials", href: "/testimonios" },
  { key: "about", href: "/sobre-mi" },
  { key: "contact", href: "/contacto" },
];

const footerServices = [
  { key: "web", href: "/servicios/web" },
  { key: "customSoftware", href: "/servicios/custom-software" },
  { key: "mobileApp", href: "/servicios/mobile" },
  { key: "inhouse", href: "/servicios/inhouse" },
  { key: "consulting", href: "/servicios/consulting" },
];

const socialLinks = [
  {
    icon: ExternalLink,
    label: "LinkedIn",
    href: site.social.linkedin,
  },
  {
    icon: ExternalLink,
    label: "GitHub",
    href: site.social.github,
  },
  {
    icon: Send,
    label: "WhatsApp",
    href: site.social.whatsapp,
  },
];

export function Footer({ locale }: FooterProps) {
  const dict = getDictionary(locale);
  const [languageOpen, setLanguageOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const whatsappMessage = t(dict, "whatsapp.message", "Hola Anthony, estoy interesado en conocer más sobre tus servicios.");
  const whatsappUrl = `${site.contact.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

  const handleLanguageChange = (nextLocale: string) => () => {
    const withoutLocale = pathname.replace(`/${locale}`, "") || "/";
    router.push(`/${nextLocale}${withoutLocale}`);
  };

  return (
    <footer className="border-t border-border/70 bg-background">
      <div className="container-x mx-auto py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <BrandLogo variant="horizontal" mode="auto" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {t(
                dict,
                "about.intro",
                "Desarrollador de software enfocado en transformar necesidades de negocio en soluciones tecnológicas funcionales, escalables y sostenibles.",
              )}
            </p>
          </div>
          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground mb-5">
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
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground mb-5">
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
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground mb-5">
              {t(dict, "footer.contact", "Contacto")}
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href={whatsappUrl}
                  className="inline-flex items-center gap-2.5 hover:text-foreground transition-colors"
                >
                  <Send className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{t(dict, "whatsapp.button", "WhatsApp")}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="inline-flex items-center gap-2.5 hover:text-foreground transition-colors break-all"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{site.contact.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/70 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-muted-foreground">
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
