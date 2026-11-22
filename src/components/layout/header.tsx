"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Send } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getDictionary, t } from "@/i18n/dictionary";

type HeaderProps = {
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

export function Header({ locale }: HeaderProps) {
  const dict = getDictionary(locale);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const hrefFor = (key: string) => {
    const base = navItems.find((i) => i.key === key)?.href || "/";
    // Si es ruta absoluta (empieza con / y no es #), agregar locale
    if (base.startsWith("/") && !base.startsWith("#")) {
      return `/${locale}${base}`;
    }
    // Si es ancla, agregar locale + ancla
    if (base.startsWith("#")) {
      return `/${locale}${base}`;
    }
    return key === "home" ? `/${locale}` : `/${locale}${base}`;
  };

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === `/${locale}` || pathname === `/`;
    return pathname === href;
  };

  const handleLanguageChange = (nextLocale: string) => () => {
    const withoutLocale = pathname.replace(`/${locale}`, "") || "/";
    router.push(`/${nextLocale}${withoutLocale}`);
  };

  return (
    <>
      <div className="sticky top-0 z-40">
        <div className="border-y border-border/60 bg-background/80 backdrop-blur supports-[backdrop-blur]:bg-background/60">
          <div className="flex h-16 items-center justify-between px-4 lg:px-8">
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight">Anthony Rivera</span>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              <nav className="flex items-center gap-8 text-sm">
                {navItems.map((item) => (
                  <a
                    key={item.key}
                    href={hrefFor(item.key)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t(dict, `nav.${item.key}`, item.key)}
                  </a>
                ))}
              </nav>

              <div className="flex items-center gap-4">
                <a
                  href={hrefFor("contact")}
                  className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={t(dict, "nav.contact", "Contacto")}
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                </a>
                <Button asChild>
                  <a href={hrefFor("contact")}>
                    {t(dict, "nav.cta", "Hablemos de tu proyecto")}
                  </a>
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <LanguageSwitcher locale={locale} dict={dict} onChange={handleLanguageChange} />
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
            <DialogDescription className="text-lg font-semibold">{t(dict, "nav.contact", "Menú")}</DialogDescription>
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
                  {t(dict, `nav.${item.key}`, item.key)}
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

type Dictionary = Record<string, unknown>;

function LanguageSwitcher({
  locale,
  dict,
  onChange,
}: {
  locale: "es" | "en";
  dict: Dictionary;
  onChange: (nextLocale: string) => () => void;
}) {
  const options = [
    { value: "es", labelKey: "localeSwitcher.es" },
    { value: "en", labelKey: "localeSwitcher.en" },
  ];

  return (
    <div className="relative inline-block text-sm">
      <Button variant="outline" size="sm" className="flex items-center gap-2 px-2">
        {t(dict, (options.find((o) => o.value === locale)?.labelKey) ?? "localeSwitcher.es", locale)}
      </Button>
      <div className="absolute top-full right-0 mt-1 w-24 rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-lg">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value as "es" | "en")()}
            className={cn(
              "flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors",
              option.value === locale
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            {t(dict, option.labelKey, option.value)}
          </button>
        ))}
      </div>
    </div>
  );
}
