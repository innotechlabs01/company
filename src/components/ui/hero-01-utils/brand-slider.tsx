"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

export type BrandList = {
  image: string
  lightimg: string
  name: string
}

type BrandSliderProps = {
  brandList: BrandList[]
}

export default function BrandSlider({ brandList }: BrandSliderProps) {
  return (
    <section className="px-4 py-16 border-t border-border lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-12">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Trusted by
          </h3>
          <div className="hidden lg:block h-px w-full bg-border" />
        </div>

        <div className="flex items-center justify-center gap-8 lg:gap-16 overflow-hidden">
          {brandList.map((brand, i) => (
            <div
              key={i}
              className={cn(
                "flex items-center gap-3 px-6 py-4 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all",
                i % 2 === 0 ? "border-r border-border" : "",
              )}
            >
              <Image
                src={brand.image}
                alt={brand.name}
                width={100}
                height={32}
                className="object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
