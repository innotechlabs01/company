"use client";

import { cn } from "@/lib/utils";

type BrandLogoProps = {
  /**
   * "horizontal": monograma + nombre + descriptor (header/footer).
   * "monogram": solo el monograma AR (favicon / móvil compacto).
   */
  variant?: "horizontal" | "monogram";
  /**
   * "dark": versión para fondos claros (A en Deep Blue).
   * "light": versión para fondos oscuros (A en blanco).
   * "mono": versión monocromática.
   * "auto": se adapta automáticamente al tema claro/oscuro.
   */
  mode?: "dark" | "light" | "mono" | "auto";
  width?: number;
  height?: number;
  showDescriptor?: boolean;
  className?: string;
  alt?: string;
};

export function BrandLogo({
  variant = "horizontal",
  mode = "auto",
  width,
  height,
  showDescriptor = true,
  className,
  alt = "Anthony Rivera",
}: BrandLogoProps) {
  const iconSize = height ? Math.round(height) : width ? Math.max(30, Math.round(width * 0.22)) : 38;

  const strokeA =
    mode === "light"
      ? "#FFFFFF"
      : mode === "mono"
        ? "currentColor"
        : "#0866C6";

  const strokeR = mode === "mono" ? "currentColor" : "#299BFF";

  if (variant === "monogram") {
    return (
      <svg
        width={width ?? iconSize}
        height={height ?? iconSize}
        viewBox="0 0 64 64"
        fill="none"
        role="img"
        aria-label={alt}
        className={cn("shrink-0 block", className)}
      >
        <path d="M18 58 L26 10 L36 58" stroke={strokeA} strokeWidth="4.2" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M22 38 L30 38" stroke={strokeA} strokeWidth="4.2" strokeLinecap="round" />
        <path d="M36 58 L36 14" stroke={strokeR} strokeWidth="4.2" strokeLinecap="round" />
        <path d="M36 14 Q44 14 44 26 Q44 36 36 36" stroke={strokeR} strokeWidth="4.2" strokeLinecap="round" fill="none" />
        <path d="M36 36 L46 58" stroke={strokeR} strokeWidth="4.2" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <div
      className={cn("inline-flex items-center gap-2.5 select-none", className)}
      role="img"
      aria-label={alt}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/70 bg-muted/50">
        <svg
          width={26}
          height={26}
          viewBox="0 0 64 64"
          fill="none"
          aria-hidden="true"
        >
          <path d="M18 58 L26 10 L36 58" stroke={strokeA} strokeWidth="4.4" strokeLinejoin="round" strokeLinecap="round" />
          <path d="M22 38 L30 38" stroke={strokeA} strokeWidth="4.4" strokeLinecap="round" />
          <path d="M36 58 L36 14" stroke={strokeR} strokeWidth="4.4" strokeLinecap="round" />
          <path d="M36 14 Q44 14 44 26 Q44 36 36 36" stroke={strokeR} strokeWidth="4.4" strokeLinecap="round" fill="none" />
          <path d="M36 36 L46 58" stroke={strokeR} strokeWidth="4.4" strokeLinecap="round" />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span
          className={cn(
            "text-[15px] font-semibold tracking-tight",
            mode === "light" ? "text-white" : "text-foreground",
          )}
        >
          Anthony Rivera
        </span>
        {showDescriptor && (
          <span
            className={cn(
              "mt-1 text-[9px] font-medium uppercase tracking-[0.16em]",
              mode === "light" ? "text-slate-400" : "text-muted-foreground",
            )}
          >
            Software &amp; Tech Partner
          </span>
        )}
      </div>
    </div>
  );
}

BrandLogo.displayName = "BrandLogo";
