"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { Logo } from "@/components/logo"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Logo size="sm" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link
              href="/entwicklungen"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Entwicklungen
            </Link>
            <Link
              href="/anwendungen"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Anwendungen
            </Link>
            <Link
              href="/grundlagen"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Grundlagen
            </Link>
            <Link
              href="/tools"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Tools
            </Link>
            <Link
              href="/chancen-risiken"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Chancen & Risiken
            </Link>
            <Link
              href="/faq"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="/kontakt/impressum"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Impressum
            </Link>
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menü öffnen"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border">
              <Link
                href="/entwicklungen"
                className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                KI-Entwicklungen
              </Link>
              <Link
                href="/anwendungen"
                className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Anwendungen
              </Link>
              <Link
                href="/grundlagen"
                className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                KI-Grundlagen
              </Link>
              <Link
                href="/tools"
                className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                KI-Tools
              </Link>
              <Link
                href="/chancen-risiken"
                className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Chancen & Risiken
              </Link>
              <Link
                href="/faq"
                className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="/kontakt/impressum"
                className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Impressum
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
