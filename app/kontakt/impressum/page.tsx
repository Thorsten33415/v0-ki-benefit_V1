import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Impressum | ki-benefits",
  description: "Impressum und rechtliche Angaben für ki-benefits",
  robots: "noindex, nofollow",
}

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="p-0 h-auto">
              <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                Zurück zur Startseite
              </Link>
            </Button>
          </div>

          {/* Page Header */}
          <div className="mb-12">
            <h1 className="font-work-sans text-4xl font-bold text-foreground mb-4">Impressum</h1>
            <div className="w-24 h-1 bg-accent rounded-full"></div>
          </div>

          {/* Legal Content */}
          <div className="prose prose-slate max-w-none">
            <div className="bg-card border border-border rounded-lg p-8 space-y-8">
              {/* TMG Section */}
              <section>
                <h2 className="font-work-sans text-2xl font-semibold text-foreground mb-4">Angaben gemäß § 5 TMG:</h2>
                <div className="text-muted-foreground space-y-1">
                  <p className="font-medium text-foreground">Thorsten Rohde</p>
                  <p>Kettelerstraße 6</p>
                  <p>33415 Verl</p>
                  <p>Deutschland</p>
                </div>
              </section>

              {/* Contact Section */}
              <section>
                <h2 className="font-work-sans text-2xl font-semibold text-foreground mb-4">Kontakt:</h2>
                <div className="text-muted-foreground">
                  <p>
                    E-Mail:
                    <a
                      href="mailto:info@ki-benefits.de"
                      className="ml-2 text-accent hover:text-accent/80 transition-colors"
                    >
                      info@ki-benefits.de
                    </a>
                  </p>
                </div>
              </section>

              {/* Disclaimer Section */}
              <section>
                <h2 className="font-work-sans text-2xl font-semibold text-foreground mb-4">Haftungsausschluss:</h2>
                <div className="text-muted-foreground">
                  <p>Dies ist eine private Webseite ohne kommerzielle Interessen.</p>
                </div>
              </section>

              {/* Additional Legal Information */}
              <section className="pt-6 border-t border-border">
                <h3 className="font-work-sans text-lg font-medium text-foreground mb-3">Haftung für Inhalte</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
                  allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
                  unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach
                  Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>
              </section>

              <section>
                <h3 className="font-work-sans text-lg font-medium text-foreground mb-3">Haftung für Links</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
                  Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
                  verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
