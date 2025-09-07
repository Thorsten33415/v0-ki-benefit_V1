import type { Metadata } from "next"
import { FaqSection } from "@/components/faq-section"
import { BackNavigation } from "@/components/back-navigation"

export const metadata: Metadata = {
  title: "FAQ | ki-benefits",
  description: "Häufig gestellte Fragen zu Künstlicher Intelligenz - Antworten auf die wichtigsten KI-Fragen",
}

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-background">
      <BackNavigation />
      <div className="pt-1">
        <FaqSection />
      </div>
    </main>
  )
}
