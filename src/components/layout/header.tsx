"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Send } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getDictionary, t } from "@/i18n/dictionary";

type HeaderProps = {
  locale: "es" | "en";
};

const navItems: Array<{ key: string; labelEs: string; labelEn: string }> = [
  { key: "home", labelEs: "Inicio", labelEn: "Home" },
  { key: "services", labelEs: "Servicios", labelEn: "Services" },
  { key: "projects", labelEs: "Proyectos", labelEn: "Projects" },
  { key: "testimonials", labelEs: "Testimonios", labelEn: "Testimonials" },
  { key: "about", labelEs: "Sobre mí", labelEn: "About me" },
  { key: "contact", labelEs: "Contacto", labelEn: "Contact" },
];

const pathByKey: Record<string, string> = {
  home: "/",
  services: "/servicios",
  projects: "/proyectos",
  testimonials: "/testimonios",
  about: "/sobre-mi",
  contact: "/contacto",
};

export function Header({ locale }: HeaderProps) {
  const dict = getDictionary(locale);
  const [mobileOpen, setMobileOpen] = useState(false);

  const label = (key: string) => {
    const item = navItems.find((i) => i.key === key);
    return item ? (locale === "en" ? item.labelEn : item.labelEs) : key;
  };

  const hrefFor = (key: string) => {
    const base = pathByKey[key] || "/";
    return key === "home" ? `/${locale}` : `/${locale}${base}`;
  };

  const isActive = (href: string) => {
    const p = typeof window !== "undefined" ? window.location.pathname : "";
    if (href === `/${locale}`) return p === `/${locale}` || p === `/`;
    return p === href;
  };

  const handleLanguageChange = (nextLocale: string) => {
    const p = typeof window !== "undefined" ? window.location.pathname : "";
    const withoutLocale = p.replace(`/${locale}`, "") || "/";
    window.location.href = `/${nextLocale}${withoutLocale}`;
  };

  return (
    <>
      <div className="sticky top-0 z-40">
        <div className="border-y border-border/60 bg-background/80 backdrop-blur supports-[backdrop-blur]:bg-background/60">
          <div className="flex h-16 items-center justify-between px-4 lg:px-8">
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight">Anthony Rivera</span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={hrefFor(item.key)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {label(item.key)}
                </a>
              ))}
              <a
                href={hrefFor("contact")}
                className="ml-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                aria-label={label("contact")}
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className="flex items-center gap-2">
              <LanguageSwitcher locale={locale} onChange={handleLanguageChange} />
              <Button asChild>
                <a href={hrefFor("contact")}>
                  {t(dict, "nav.cta", "Hablemos de tu proyecto")}
                </a>
              </Button>
            </div>

            <button
              className="lg:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-muted-foreground"
              aria-label="Abrir menú"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <Dialog open={mobileOpen} onOpenChange={setMobileOpen}>
        <DialogTrigger asChild>
          <span />
        </DialogTrigger>
        <DialogContent className="p-6 lg:p-8">
          <DialogHeader>
            <DialogDescription className="text-lg font-semibold">Menú</DialogDescription>
          </DialogHeader>
          <div className="mt-6 space-y-4">
            {navItems.map((item) => {
              const href = hrefFor(item.key);
              return (
                <a
                  key={item.key}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive(href)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  {label(item.key)}
                </a>
              );
            })}
          </div>
          <div className="mt-8 flex items-center gap-2">
            <Button variant="outline" className="flex-1" asChild>
              <a href={hrefFor("contact")}>
                {t(dict, "nav.cta", "Hablemos de tu proyecto")}
              </a>
            </Button>
          </div>
        </DialogContent>
        <DialogDescription className="sr-only">
          Menú móvil. Contiene enlaces de navegación y llamada a la acción.
        </DialogDescription>
      </Dialog>
    </>
  );
}

function LanguageSwitcher({
  locale,
  onChange,
}: {
  locale: "es" | "en";
  onChange: (nextLocale: string) => void;
}) {
  const options = [
    { value: "es", label: "Español" },
    { value: "en", label: "English" },
  ];

  return (
    <div className="relative inline-block text-sm">
      <Button variant="outline" size="sm" className="flex items-center gap-2 px-2">
        {options.find((o) => o.value === locale)?.label || locale}
      </Button>
      <div className="absolute right-0 mt-1 w-24 rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-lg">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value as "es" | "en")}
            className={cn(
              "flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors",
              option.value === locale
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
