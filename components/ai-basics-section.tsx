"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Network, Cpu, Zap, BookOpen, ExternalLink, FileText } from "lucide-react"

const aiBasics = [
  {
    id: 1,
    title: "Machine Learning",
    description:
      "Algorithmen, die aus Daten lernen und Vorhersagen treffen können, ohne explizit programmiert zu werden.",
    icon: Brain,
    category: "Grundlagen",
    link: "https://de.wikipedia.org/wiki/Maschinelles_Lernen",
    examples: ["Spam-Filter", "Produktempfehlungen", "Wettervorhersage"],
  },
  {
    id: 2,
    title: "Neuronale Netze",
    description: "Computermodelle, die dem menschlichen Gehirn nachempfunden sind und komplexe Muster erkennen können.",
    icon: Network,
    category: "Grundlagen",
    link: "https://de.wikipedia.org/wiki/K%C3%BCnstliches_neuronales_Netz",
    examples: ["Bilderkennung", "Sprachverarbeitung", "Gesichtserkennung"],
  },
  {
    id: 3,
    title: "Deep Learning",
    description:
      "Eine spezielle Form des Machine Learning mit mehrschichtigen neuronalen Netzen für komplexe Aufgaben.",
    icon: Cpu,
    category: "Fortgeschritten",
    link: "https://de.wikipedia.org/wiki/Deep_Learning",
    examples: ["Autonome Fahrzeuge", "Medizinische Diagnose", "Sprachübersetzung"],
  },
  {
    id: 4,
    title: "Künstliche Intelligenz",
    description: "Computersysteme, die Aufgaben ausführen können, die normalerweise menschliche Intelligenz erfordern.",
    icon: Zap,
    category: "Überblick",
    link: "https://de.wikipedia.org/wiki/K%C3%BCnstliche_Intelligenz",
    examples: ["Chatbots", "Sprachassistenten", "Automatisierung"],
  },
]

const scientificPublications = [
  {
    id: 1,
    title: "AI Theory - Basic Concepts",
    description: "Grundlegende theoretische Konzepte der Künstlichen Intelligenz aus wissenschaftlicher Sicht.",
    journal: "IEEE",
    link: "https://ieeexplore.ieee.org/document/6918230/",
    type: "Forschungsarbeit",
  },
  {
    id: 2,
    title: "Comprehensive Review of AI and ML",
    description: "Umfassende Übersicht über KI- und ML-Konzepte, Trends und Anwendungen in der modernen Forschung.",
    journal: "ResearchGate",
    link: "https://www.researchgate.net/publication/384231012_A_Comprehensive_Review_of_Artificial_Intelligence_and_Machine_Learning_Concepts_Trends_and_Applications",
    type: "Review-Artikel",
  },
  {
    id: 3,
    title: "AI for Scientific Research",
    description: "KI als mächtiges Paradigma für wissenschaftliche Forschung und Entdeckungen.",
    journal: "Nature",
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8633405/",
    type: "Übersichtsarbeit",
  },
  {
    id: 4,
    title: "Global AI Innovation Dataset",
    description:
      "Globaler Datensatz zur Kartierung von KI-Innovationen von der akademischen Forschung zu industriellen Patenten.",
    journal: "Nature Scientific Data",
    link: "https://www.nature.com/articles/s41597-025-05518-3",
    type: "Datensatz-Studie",
  },
]

export function AiBasicsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Alle")
  const [activeTab, setActiveTab] = useState<string>("grundlagen")

  const categories = ["Alle", "Grundlagen", "Fortgeschritten", "Überblick"]

  const filteredBasics =
    selectedCategory === "Alle" ? aiBasics : aiBasics.filter((basic) => basic.category === selectedCategory)

  return (
    <section id="grundlagen" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <BookOpen className="w-4 h-4 mr-2" />
            KI-Grundlagen verstehen
          </Badge>
          <h2 className="text-3xl font-bold text-foreground mb-4">KI-Grundlagen einfach erklärt</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Verstehen Sie die wichtigsten Begriffe und Konzepte der Künstlichen Intelligenz
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <Button
            variant={activeTab === "grundlagen" ? "default" : "outline"}
            onClick={() => setActiveTab("grundlagen")}
            className="flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            Grundlagen
          </Button>
          <Button
            variant={activeTab === "publikationen" ? "default" : "outline"}
            onClick={() => setActiveTab("publikationen")}
            className="flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Wissenschaftliche Publikationen
          </Button>
        </div>

        {activeTab === "grundlagen" && (
          <>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="mb-2"
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredBasics.map((basic) => {
                const IconComponent = basic.icon
                return (
                  <Card key={basic.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <Badge variant="outline">{basic.category}</Badge>
                      </div>
                      <CardTitle className="text-xl">{basic.title}</CardTitle>
                      <CardDescription className="text-base">{basic.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2 text-sm text-muted-foreground">Beispiele:</h4>
                        <div className="flex flex-wrap gap-2">
                          {basic.examples.map((example, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {example}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
                        <a href={basic.link} target="_blank" rel="noopener noreferrer">
                          Mehr erfahren <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </>
        )}

        {activeTab === "publikationen" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scientificPublications.map((publication) => (
              <Card key={publication.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <Badge variant="outline">{publication.type}</Badge>
                  </div>
                  <CardTitle className="text-xl">{publication.title}</CardTitle>
                  <CardDescription className="text-base">{publication.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold">Quelle:</span> {publication.journal}
                    </p>
                  </div>
                  <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
                    <a href={publication.link} target="_blank" rel="noopener noreferrer">
                      Publikation lesen <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
