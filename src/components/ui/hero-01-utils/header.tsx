"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"

export type NavigationSection = {
  title: string
  href: string
  isActive?: boolean
}

type HeaderProps = {
  navigationData: NavigationSection[]
}

export default function Header({ navigationData }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="px-4 py-4 lg:px-8 lg:py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-foreground">
            Agency
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <NavigationMenu>
              <NavigationMenuList className="gap-8">
                {navigationData.map((item) => (
                  <NavigationMenuItem key={item.href} asChild>
                    <NavigationMenuTrigger asChild>
                      <Link
                        href={item.href}
                        className={cnLink(
                          item.isActive
                            ? "text-accent-foreground font-medium"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {item.title}
                      </Link>
                    </NavigationMenuTrigger>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                Log in
              </Button>
              <Button size="sm">Get started</Button>
            </div>
          </div>

          <button
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Open menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </header>
  )
}

function cnLink(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}
