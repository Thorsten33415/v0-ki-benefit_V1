import type { Metadata } from "next"
import { AiUpdatesSection } from "@/components/ai-updates-section"
import { BackNavigation } from "@/components/back-navigation"

export const metadata: Metadata = {
  title: "ki-Entwicklungen | ki-benefits",
  description: "Neueste Fortschritte und Trends in der KI-Forschung - Aktuelle Entwicklungen und Insights",
}

export default function EntwicklungenPage() {
  return (
    <main className="min-h-screen bg-background">
      <BackNavigation />
      <div className="pt-1">
        <AiUpdatesSection />
      </div>
    </main>
  )
}
