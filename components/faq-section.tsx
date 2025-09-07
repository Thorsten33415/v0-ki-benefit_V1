"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    id: 1,
    question: "Was ist der Unterschied zwischen KI, Machine Learning und Deep Learning?",
    answer:
      "KI ist der Oberbegriff für alle Technologien, die menschliche Intelligenz nachahmen. Machine Learning ist ein Teilbereich der KI, bei dem Computer aus Daten lernen. Deep Learning ist wiederum ein Teilbereich des Machine Learning, der neuronale Netze mit vielen Schichten verwendet.",
    category: "Grundlagen",
  },
  {
    id: 2,
    question: "Ist KI gefährlich für die Menschheit?",
    answer:
      "KI bringt sowohl Chancen als auch Risiken mit sich. Aktuelle KI-Systeme sind spezialisierte Tools und nicht gefährlich. Wichtig ist eine verantwortungsvolle Entwicklung mit ethischen Richtlinien und angemessener Regulierung.",
    category: "Sicherheit",
  },
  {
    id: 3,
    question: "Wird KI meinen Arbeitsplatz ersetzen?",
    answer:
      "KI wird einige Jobs verändern oder ersetzen, aber auch neue schaffen. Wichtig ist, sich weiterzubilden und KI als Werkzeug zu verstehen, das die eigene Arbeit unterstützen kann. Kreative und soziale Fähigkeiten bleiben besonders wertvoll.",
    category: "Arbeit",
  },
  {
    id: 4,
    question: "Wie kann ich als Laie KI in meinem Alltag nutzen?",
    answer:
      "Es gibt viele einfache KI-Tools: Sprachassistenten für Fragen, ChatGPT für Texte, Übersetzungstools, Foto-Apps mit KI-Features, oder Smart-Home-Geräte. Fangen Sie mit einem Tool an, das Ihnen bei einer konkreten Aufgabe hilft.",
    category: "Anwendung",
  },
  {
    id: 5,
    question: "Wie schütze ich meine Daten bei der Nutzung von KI-Tools?",
    answer:
      "Lesen Sie die Datenschutzrichtlinien, nutzen Sie vertrauenswürdige Anbieter, geben Sie keine sensiblen persönlichen Daten ein, und prüfen Sie die Einstellungen zur Datenverwendung. Viele Tools bieten Optionen zum Schutz der Privatsphäre.",
    category: "Datenschutz",
  },
  {
    id: 6,
    question: "Muss ich programmieren können, um KI zu verstehen?",
    answer:
      "Nein, Programmieren ist nicht notwendig, um KI zu verstehen oder zu nutzen. Viele KI-Tools sind benutzerfreundlich gestaltet. Grundlegendes Verständnis der Konzepte reicht aus, um KI sinnvoll einzusetzen.",
    category: "Grundlagen",
  },
]

export function FaqSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("Alle")

  const categories = ["Alle", "Grundlagen", "Sicherheit", "Arbeit", "Anwendung", "Datenschutz"]

  const filteredFAQs = selectedCategory === "Alle" ? faqs : faqs.filter((faq) => faq.category === selectedCategory)

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  return (
    <section id="faq" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <HelpCircle className="w-4 h-4 mr-2" />
            Häufige Fragen
          </Badge>
          <h2 className="text-3xl font-bold text-foreground mb-4">FAQ - Häufig gestellte Fragen</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Antworten auf die wichtigsten Fragen rund um Künstliche Intelligenz
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFAQs.map((faq) => (
            <Card key={faq.id} className="overflow-hidden">
              <CardHeader
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => toggleFAQ(faq.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {faq.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-left text-lg">{faq.question}</CardTitle>
                  </div>
                  <div className="ml-4">
                    {openFAQ === faq.id ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </CardHeader>
              {openFAQ === faq.id && (
                <CardContent className="pt-0">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
