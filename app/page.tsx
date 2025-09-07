import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { SectionOverview } from "@/components/section-overview"
import { Footer } from "@/components/footer"
import { StructuredData } from "@/components/structured-data"

export const metadata: Metadata = {
  title: "ki-benefits - Startseite",
  description:
    "Aktuelle KI-Entwicklungen und Anwendungen im Überblick. Filtern Sie nach Veröffentlichungsdatum und entdecken Sie die neuesten Trends.",
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <StructuredData />
      <Header />
      <main>
        <Hero />
        <SectionOverview />
      </main>
      <Footer />
    </div>
  )
}
