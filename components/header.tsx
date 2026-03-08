"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, X, Globe, Heart, Phone } from "lucide-react"

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी" },
  { code: "ta", name: "தமிழ்" },
  { code: "te", name: "తెలుగు" },
  { code: "bn", name: "বাংলা" },
  { code: "mr", name: "मराठी" },
]

const navLinks = [
  { href: "/", label: "Home", hindi: "होम" },
  { href: "/symptoms", label: "Check Problem", hindi: "समस्या जांचें" },
  { href: "/hospitals", label: "Find Hospital", hindi: "अस्पताल खोजें" },
  { href: "/rush", label: "Hospital Crowd", hindi: "भीड़ देखें" },
  { href: "/book", label: "Book Visit", hindi: "मिलने का समय" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState("en")

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary shadow-md">
            <Heart className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="hidden flex-col sm:flex">
            <span className="text-lg font-bold leading-tight text-foreground">Health Help</span>
            <span className="text-xs text-muted-foreground">स्वास्थ्य सहायता</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-4 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col items-center rounded-lg px-3 py-2 text-center transition-colors hover:bg-muted"
            >
              <span className="text-sm font-semibold text-foreground">{link.label}</span>
              <span className="text-xs text-muted-foreground">{link.hindi}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Emergency Button */}
          <Button variant="destructive" size="default" className="hidden font-bold shadow-md sm:flex">
            <Phone className="mr-2 h-5 w-5" />
            Emergency 108
          </Button>

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Globe className="mr-2 h-4 w-4" />
                {languages.find((l) => l.code === currentLang)?.name}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setCurrentLang(lang.code)}
                >
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-card lg:hidden">
          <nav className="container mx-auto flex flex-col gap-2 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between rounded-xl bg-muted/50 px-5 py-4 text-foreground transition-colors hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-base font-semibold">{link.label}</span>
                <span className="text-sm text-muted-foreground">{link.hindi}</span>
              </Link>
            ))}
            <Button variant="destructive" className="mt-3 h-14 w-full text-lg font-bold sm:hidden">
              <Phone className="mr-2 h-5 w-5" />
              Emergency 108 | आपातकाल
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
