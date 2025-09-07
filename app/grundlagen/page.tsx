import type { Metadata } from "next"
import { AiBasicsSection } from "@/components/ai-basics-section"
import { BackNavigation } from "@/components/back-navigation"

export const metadata: Metadata = {
  title: "ki-Grundlagen | ki-benefits",
  description:
    "Wichtige KI-Begriffe und Konzepte einfach erklärt - Ihr Einstieg in die Welt der Künstlichen Intelligenz",
}

export default function GrundlagenPage() {
  return (
    <main className="min-h-screen bg-background">
      <BackNavigation />
      <div className="pt-1">
        <AiBasicsSection />
      </div>
    </main>
  )
}
