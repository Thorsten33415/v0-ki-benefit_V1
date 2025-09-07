"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Cpu, BookOpen, Wrench, Scale, HelpCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

const sections = [
  {
    id: "entwicklungen",
    title: "KI-Entwicklungen",
    description: "Neueste Fortschritte und Trends in der KI-Forschung",
    icon: TrendingUp,
    color: "bg-blue-50 text-blue-700 border-blue-200",
    href: "/entwicklungen",
  },
  {
    id: "anwendungen",
    title: "KI-Anwendungen",
    description: "Praktische Einsatzgebiete in Industrie und Alltag",
    icon: Cpu,
    color: "bg-green-50 text-green-700 border-green-200",
    href: "/anwendungen",
  },
  {
    id: "grundlagen",
    title: "KI-Grundlagen",
    description: "Wichtige Begriffe und Konzepte einfach erklärt",
    icon: BookOpen,
    color: "bg-purple-50 text-purple-700 border-purple-200",
    href: "/grundlagen",
  },
  {
    id: "tools",
    title: "KI-Tools",
    description: "Benutzerfreundliche Tools zum Ausprobieren",
    icon: Wrench,
    color: "bg-orange-50 text-orange-700 border-orange-200",
    href: "/tools",
  },
  {
    id: "chancen-risiken",
    title: "Chancen & Risiken",
    description: "Ausgewogene Betrachtung von Vor- und Nachteilen",
    icon: Scale,
    color: "bg-amber-50 text-amber-700 border-amber-200",
    href: "/chancen-risiken",
  },
  {
    id: "faq",
    title: "FAQ",
    description: "Antworten auf häufig gestellte Fragen",
    icon: HelpCircle,
    color: "bg-gray-50 text-gray-700 border-gray-200",
    href: "/faq",
  },
]

export function SectionOverview() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Entdecken Sie KI in all ihren Facetten</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Von den Grundlagen bis zu praktischen Anwendungen - hier finden Sie alles Wichtige über Künstliche
            Intelligenz
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => {
            const IconComponent = section.icon
            return (
              <Link key={section.id} href={section.href}>
                <Card
                  className={`hover:shadow-lg transition-all duration-300 cursor-pointer border-2 ${section.color} h-full`}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto p-3 rounded-full bg-white/80 w-fit mb-3">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                    <CardDescription className="text-base">{section.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button variant="ghost" className="w-full group">
                      Mehr erfahren
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
