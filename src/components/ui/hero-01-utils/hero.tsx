"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export type AvatarList = {
  image: string
}

type HeroSectionProps = {
  avatarList: AvatarList[]
}

export default function HeroSection({ avatarList }: HeroSectionProps) {
  return (
    <section className="relative px-4 py-20 lg:px-8 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="text-center lg:max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            Build your next big idea
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            The all-in-one platform to design, ship, and scale your product
            faster than ever before.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto">
              Get started
            </Button>
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
              <Link href="#">Learn more</Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 relative">
          <div className="flex justify-center">
            <div className="relative inline-block">
              {avatarList.map((avatar, i) => (
                <Image
                  key={i}
                  src={avatar.image}
                  alt={`Avatar ${i + 1}`}
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-background shadow-lg"
                  style={{
                    transform: `translateX(${i * -20}px)`,
                    zIndex: avatarList.length - i,
                  }}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
