"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LangSetter } from "@/components/layout/lang-setter";

type GroomingShellProps = {
  children: React.ReactNode;
  locale: "es" | "en";
};

export default function GroomingShell({
  children,
  locale,
}: GroomingShellProps) {
  const pathname = usePathname();
  const isGrooming = pathname.includes("/grooming");

  if (isGrooming) {
    return <main className="flex-1 min-h-[100dvh]">{children}</main>;
  }

  return (
    <div className="flex flex-col min-h-[100dvh]" data-lang={locale}>
      <LangSetter locale={locale} />
      <Header locale={locale} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} />
    </div>
  );
}
