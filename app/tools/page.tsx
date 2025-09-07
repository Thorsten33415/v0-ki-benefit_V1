import type { Metadata } from "next"
import { AiToolsSection } from "@/components/ai-tools-section"
import { BackNavigation } from "@/components/back-navigation"

export const metadata: Metadata = {
  title: "ki-Tools | ki-benefits",
  description: "Benutzerfreundliche KI-Tools zum Ausprobieren - Praktische Werkzeuge für den Einstieg",
}

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-background">
      <BackNavigation />
      <div className="pt-1">
        <AiToolsSection />
      </div>
    </main>
  )
}
