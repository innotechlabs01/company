"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/ui/brand-logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { getDictionary, t } from "@/i18n/dictionary";

type HeaderProps = {
  locale: "es" | "en";
};

const navItems: Array<{ key: string; href: string; labelKey: string }> = [
  { key: "home", href: "/", labelKey: "nav.home" },
  { key: "services", href: "#servicios", labelKey: "nav.services" },
  { key: "projects", href: "#proyectos", labelKey: "nav.projects" },
  { key: "testimonials", href: "/testimonios", labelKey: "nav.testimonials" },
  { key: "about", href: "#sobre-mi", labelKey: "nav.about" },
  { key: "contact", href: "/contacto", labelKey: "nav.contact" },
];

export function Header({ locale }: HeaderProps) {
  const dict = getDictionary(locale);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const hrefFor = (key: string) => {
    const base = navItems.find((i) => i.key === key)?.href || "/";
    if (base.startsWith("/") && !base.startsWith("#")) {
      return `/${locale}${base}`;
    }
    if (base.startsWith("#")) {
      return `/${locale}${base}`;
    }
    return key === "home" ? `/${locale}` : `/${locale}${base}`;
  };

  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === `/${locale}` || pathname === `/`;
    }
    return pathname === href;
  };

  const handleLanguageChange = (nextLocale: string) => () => {
    const withoutLocale = pathname.replace(`/${locale}`, "") || "/";
    router.push(`/${nextLocale}${withoutLocale}`);
  };

  return (
    <>
      <div className="sticky top-0 z-40">
        <div className="border-b border-border/60 bg-background/70 backdrop-blur-md supports-[backdrop-blur]:bg-background/50 transition-colors">
          <div className="flex h-13 items-center justify-between px-4 lg:px-8">
            <Link
              href={`/${locale}`}
              className="flex items-center"
              title="Anthony Rivera"
            >
              <BrandLogo variant="horizontal" mode="dark" width={132} />
            </Link>

            <div className="hidden lg:flex items-center gap-7">
              <nav className="flex items-center gap-7 text-sm font-medium">
                {navItems.map((item) => {
                  const href = hrefFor(item.key);
                  const active = isActive(href);
                  return (
                    <Link
                      key={item.key}
                      href={href}
                      className={cn(
                        "transition-colors",
                        active
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      {t(dict, item.labelKey, item.key)}
                    </Link>
                  );
                })}
              </nav>

              <div className="flex items-center gap-3">
                <LanguageSwitcher locale={locale} dict={dict} onChange={handleLanguageChange} />
                <Button asChild size="sm">
                  <a href={hrefFor("contact")}>
                    {t(dict, "nav.cta", "Hablemos de tu proyecto")}
                  </a>
                </Button>
              </div>
            </div>

            <button
              className="lg:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-muted-foreground hover:text-foreground"
              aria-label="Abrir menú"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <span />
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:w-[340px] p-6">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-lg font-semibold tracking-tight">
              {t(dict, "nav.contact", "Menú")}
            </SheetTitle>
            <SheetDescription className="text-muted-foreground text-sm">
              Navegación y contacto
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-3">
            {navItems.map((item) => {
              const href = hrefFor(item.key);
              const active = isActive(href);
              return (
                <Link
                  key={item.key}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {t(dict, item.labelKey, item.key)}
                </Link>
              );
            })}
          </div>
          <div className="mt-8 pt-6 border-t border-border/60 space-y-3">
            <LanguageSwitcher
              locale={locale}
              dict={dict}
              onChange={handleLanguageChange}
              className="w-full"
            />
            <Button asChild variant="outline" className="w-full">
              <a href={hrefFor("contact")}>
                {t(dict, "nav.cta", "Hablemos de tu proyecto")}
              </a>
            </Button>
          </div>
          <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">Cerrar menú</span>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </>
  );
}

type Dictionary = Record<string, unknown>;

function LanguageSwitcher({
  locale,
  dict,
  onChange,
  className,
}: {
  locale: "es" | "en";
  dict: Dictionary;
  onChange: (nextLocale: string) => () => void;
  className?: string;
}) {
  const options = [
    { value: "es", labelKey: "localeSwitcher.es" },
    { value: "en", labelKey: "localeSwitcher.en" },
  ];

  return (
    <div className={cn("relative inline-block text-sm", className)}>
      <Button variant="outline" size="sm" className="flex items-center gap-2 px-2">
        {t(dict, (options.find((o) => o.value === locale)?.labelKey) ?? "localeSwitcher.es", locale)}
      </Button>
      <div className="absolute top-full right-0 mt-1.5 w-24 rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-lg">
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
