import Link from "next/link"
import { Mail, MapPin } from "lucide-react"
import { LogoFooter } from "./logo"

export function Footer() {
  return (
    <footer id="kontakt" className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Company Info */}
          <div className="space-y-4">
            <LogoFooter />
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Ihr Partner für aktuelle Informationen und Insights zu Künstlicher Intelligenz und deren praktischen
              Anwendungen.
            </p>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-work-sans font-semibold">Rechtliches</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/kontakt/impressum"
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Impressum
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-work-sans font-semibold">Kontakt</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-accent" aria-hidden="true" />
                <a
                  href="mailto:info@ki-benefits.de"
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  info@ki-benefits.de
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
                <span className="text-primary-foreground/80">Verl, Deutschland</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-primary-foreground/60">© 2025 ki-benefits. Alle Rechte vorbehalten.</p>
            <p className="text-xs text-primary-foreground/60">Erstellt mit modernsten Web-Technologien</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
