"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  const pathname = usePathname()
  
  const routes = [
    {
      href: "/",
      label: "首页",
      active: pathname === "/",
    },
    {
      href: "/blog",
      label: "博客",
      active: pathname === "/blog" || pathname.startsWith("/blog/"),
    },
    {
      href: "/about",
      label: "关于",
      active: pathname === "/about",
    },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-8">
          <Link href="/" className="flex items-center space-x-2">
            <h1 className="font-bold text-xl">WR </h1>
          </Link>
        </div>
        <nav className="flex items-center space-x-6 text-sm font-medium flex-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                route.active ? "text-foreground" : "text-foreground/60"
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
} 