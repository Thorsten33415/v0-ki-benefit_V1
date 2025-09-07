import type { Metadata } from "next"
import { AiApplicationsSection } from "@/components/ai-applications-section"
import { BackNavigation } from "@/components/back-navigation"

export const metadata: Metadata = {
  title: "ki-Anwendungen | ki-benefits",
  description: "Praktische Einsatzgebiete von KI in Industrie und Alltag - Reale Anwendungsfälle und Beispiele",
}

export default function AnwendungenPage() {
  return (
    <main className="min-h-screen bg-background">
      <BackNavigation />
      <div className="pt-1">
        <AiApplicationsSection />
      </div>
    </main>
  )
}
