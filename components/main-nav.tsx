"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Logo } from "@/components/logo"

const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Introduction",
    href: "/tutorials/introduction",
  },
  {
    title: "Fundamentals",
    href: "/tutorials/fundamentals",
  },
  {
    title: "Making Requests",
    href: "/tutorials/requests",
  },
  {
    title: "Handling Responses",
    href: "/tutorials/responses",
  },
  {
    title: "Authentication",
    href: "/tutorials/authentication",
  },
  {
    title: "Advanced Topics",
    href: "/tutorials/advanced",
  },
  {
    title: "Playground",
    href: "/tutorials/playground",
  },
]

export function MainNav() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex items-center gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-1 md:flex">
        <Logo className="w-6 h-6" />
        <span className="font-shadows-into-light text-[#FFB300] text-xl font-bold">Apix</span>
      </Link>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pr-0">
          <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <Logo className="w-6 h-6" />
            <span className="font-shadows-into-light text-[#FFB300] text-xl font-bold">APIX</span>
          </Link>
          <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-muted-foreground transition-colors hover:text-foreground",
                    pathname === item.href && "text-foreground",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
      <nav className="hidden md:flex items-center space-x-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-foreground/80",
              pathname === item.href ? "text-foreground font-semibold" : "text-foreground/60",
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  )
}

