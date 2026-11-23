"use client";

import Image from "next/image";
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
   */
  mode?: "dark" | "light" | "mono";
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
};

const ASSET = {
  horizontal: {
    dark: "/brand/anthony-rivera-logo-dark.svg",
    light: "/brand/anthony-rivera-logo-light.svg",
    mono: "/brand/anthony-rivera-logo-mono.svg",
  },
  monogram: "/brand/anthony-rivera-monogram.svg",
};

// Proporción alto/ancho inversa (width / height) para calcular la medida faltante.
const ASPECT = {
  horizontal: 340 / 72,
  monogram: 1,
};

export function BrandLogo({
  variant = "horizontal",
  mode = "dark",
  width,
  height,
  className,
  alt = "Anthony Rivera",
}: BrandLogoProps) {
  const src = variant === "monogram" ? ASSET.monogram : ASSET.horizontal[mode];
  const ar = ASPECT[variant];
  const w = width ?? (height ? Math.round(height * ar) : undefined);
  const h = height ?? (width ? Math.round(width / ar) : undefined);

  return (
    <Image
      src={src}
      alt={alt}
      width={w}
      height={h}
      className={cn("block max-h-full", className)}
      loading="eager"
      priority
    />
  );
}

BrandLogo.displayName = "BrandLogo";
