import type { Metadata } from "next"
import { OpportunitiesRisksSection } from "@/components/opportunities-risks-section"
import { BackNavigation } from "@/components/back-navigation"

export const metadata: Metadata = {
  title: "Chancen & Risiken | ki-benefits",
  description: "Ausgewogene Betrachtung von KI-Vor- und Nachteilen - Chancen und Risiken der Künstlichen Intelligenz",
}

export default function ChancenRisikenPage() {
  return (
    <main className="min-h-screen bg-background">
      <BackNavigation />
      <div className="pt-1">
        <OpportunitiesRisksSection />
      </div>
    </main>
  )
}
