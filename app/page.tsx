import { Header } from "../components/header"
import { Hero } from "../components/hero"
import { SectionOverview } from "../components/section-overview"
import { Footer } from "../components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <SectionOverview />
      </main>
      <Footer />
    </div>
  )
}
