"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
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
      <header className="sticky top-0 z-40">
        <div className="border-b border-border/60 bg-background/80 backdrop-blur-md supports-[backdrop-blur]:bg-background/60 transition-colors">
          <div className="mx-auto container-x flex h-16 items-center justify-between px-4 lg:px-8">
            <Link
              href={`/${locale}`}
              className="flex items-center shrink-0"
              title="Anthony Rivera"
            >
              <BrandLogo variant="horizontal" mode="auto" />
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
              aria-label={locale === "en" ? "Open menu" : "Abrir menú"}
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <span />
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:w-[340px] p-6">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-lg font-semibold tracking-tight">
              {locale === "en" ? "Menu" : "Menú"}
            </SheetTitle>
            <SheetDescription className="text-muted-foreground text-sm">
              {locale === "en" ? "Navigation and contact" : "Navegación y contacto"}
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
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options = [
    { value: "es", labelKey: "localeSwitcher.es" },
    { value: "en", labelKey: "localeSwitcher.en" },
  ];

  return (
    <div ref={containerRef} className={cn("relative inline-block text-sm", className)}>
      <Button
        variant="outline"
        size="sm"
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-2"
      >
        {t(dict, (options.find((o) => o.value === locale)?.labelKey) ?? "localeSwitcher.es", locale)}
      </Button>
      {open && (
        <div className="absolute top-full right-0 mt-1.5 w-28 rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-lg z-50">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                setOpen(false);
                onChange(option.value as "es" | "en")();
              }}
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
      )}
    </div>
  );
}
