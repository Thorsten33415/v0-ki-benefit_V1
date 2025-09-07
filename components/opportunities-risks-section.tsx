"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, AlertTriangle, CheckCircle, XCircle } from "lucide-react"

const opportunities = [
  {
    title: "Agentic AI Revolution",
    description: "Autonome AI-Agenten automatisieren komplexe Geschäftsprozesse und Workflows vollständig",
    examples: ["AWS Agentic AI", "Thinking Machines Systeme", "Autonome Entscheidungsfindung"],
  },
  {
    title: "Medizinische Durchbrüche",
    description: "AI revolutioniert Diagnostik, Behandlung und Arzneimittelentwicklung mit über 90% Genauigkeit",
    examples: ["AI-Copilot für Verschreibungen", "Früherkennung Diabetes", "Isomorphic Labs Medikamente"],
  },
  {
    title: "Multimodale Intelligenz",
    description: "Neue AI-Modelle verstehen und generieren Text, Bilder, Video und Audio gleichzeitig",
    examples: ["ChatGPT-5 Multimodal", "Midjourney Video", "Google Veo 3"],
  },
  {
    title: "Demokratisierung von AI",
    description: "AI-Tools werden zugänglicher und benutzerfreundlicher für alle Bevölkerungsschichten",
    examples: ["200K Token Context", "Zero-Click Dokumentation", "AI-Hörgeräte"],
  },
  {
    title: "Wissenschaftliche Beschleunigung",
    description: "AI4S (AI for Science) beschleunigt Forschung und Entdeckungen in allen Wissenschaftsbereichen",
    examples: ["Materialwissenschaft Singapore", "Umweltfreundliche Farben", "Gehirn-Computer Interfaces"],
  },
]

const risks = [
  {
    title: "AI-Incident Anstieg",
    description: "2024 verzeichnete einen starken Anstieg AI-bezogener Vorfälle und Sicherheitsprobleme",
    concerns: ["Halluzinationen", "Bias-Verstärkung", "Systemausfälle"],
  },
  {
    title: "Superintelligenz-Bedenken",
    description: "GPT-5 wird als 'smarter than the smartest person' beschrieben - Kontrollverlust-Risiken",
    concerns: ["Menschliche Überlegenheit", "Unvorhersagbare Fähigkeiten", "Alignment-Probleme"],
  },
  {
    title: "Ressourcenverbrauch",
    description: "AI-Entwicklung verbraucht dramatisch mehr digitale Ressourcen und Energie",
    concerns: ["Umweltbelastung", "Infrastruktur-Überlastung", "Nachhaltigkeitsprobleme"],
  },
  {
    title: "Datenschutz vs. Personalisierung",
    description: "Anhaltende Spannungen zwischen Privatsphäre und personalisierten AI-Diensten",
    concerns: ["Datensammlung", "Überwachungskapitalismus", "Transparenzmangel"],
  },
  {
    title: "Emotionale AI-Abhängigkeit",
    description: "AI-Kollegen und empathische AI können zu emotionaler Abhängigkeit und sozialer Isolation führen",
    concerns: ["Menschliche Beziehungen", "Empathie-Simulation", "Soziale Kompetenzen"],
  },
]

export function OpportunitiesRisksSection() {
  return (
    <section id="chancen-risiken" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <TrendingUp className="w-4 h-4 mr-2" />
            Ausgewogene Betrachtung
          </Badge>
          <h2 className="text-3xl font-bold text-foreground mb-4">Chancen und Risiken der KI</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Eine ehrliche Einschätzung der Möglichkeiten und Herausforderungen künstlicher Intelligenz basierend auf
            aktuellen Entwicklungen 2024/2025
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chancen */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h3 className="text-2xl font-bold text-foreground">Chancen</h3>
            </div>
            <div className="space-y-4">
              {opportunities.map((opportunity, index) => (
                <Card key={index} className="border-l-4 border-l-green-500">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-green-700">{opportunity.title}</CardTitle>
                    <CardDescription>{opportunity.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {opportunity.examples.map((example, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs bg-green-50 text-green-700">
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Risiken */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <XCircle className="w-6 h-6 text-red-600" />
              <h3 className="text-2xl font-bold text-foreground">Risiken</h3>
            </div>
            <div className="space-y-4">
              {risks.map((risk, index) => (
                <Card key={index} className="border-l-4 border-l-red-500">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-red-700">{risk.title}</CardTitle>
                    <CardDescription>{risk.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {risk.concerns.map((concern, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs bg-red-50 text-red-700">
                          {concern}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 p-6 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-600 mt-1" />
            <div>
              <h4 className="font-semibold text-amber-800 mb-2">Wichtiger Hinweis für 2025</h4>
              <p className="text-amber-700">
                Mit der Einführung von ChatGPT-5 und anderen superintelligenten Systemen wird verantwortungsvolle
                AI-Entwicklung kritischer denn je. Globale Kooperation bei AI-Governance, wie im Stanford AI Index 2025
                berichtet, ist essentiell für die sichere Nutzung dieser mächtigen Technologien.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
