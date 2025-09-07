"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wrench, MessageSquare, FileText, Code, ExternalLink, Video, RefreshCw } from "lucide-react"

interface AITool {
  id: number
  title: string
  description: string
  icon: any
  category: string
  difficulty: string
  link: string
  features: string[]
  isNew: boolean
  date: string
}

const staticAiTools: AITool[] = [
  {
    id: 1,
    title: "ChatGPT-5",
    description:
      "OpenAIs neuestes 'generally intelligent' Modell mit enormen Verbesserungen in Coding, Schreiben und Gesundheitswesen.",
    icon: MessageSquare,
    category: "Text",
    difficulty: "Einfach",
    link: "https://chat.openai.com",
    features: ["Vibe-Coding", "Erweiterte Reasoning", "Multimodale Fähigkeiten"],
    isNew: true,
    date: "2025-01-15",
  },
  {
    id: 2,
    title: "Claude 4 Opus",
    description: "Anthropics fortschrittlichstes Modell mit 200K Token Context und erweitertem Thinking Mode.",
    icon: MessageSquare,
    category: "Text",
    difficulty: "Einfach",
    link: "https://claude.ai",
    features: ["200K Context", "Chain-of-Thought", "Constitutional AI"],
    isNew: true,
    date: "2025-01-15",
  },
  {
    id: 3,
    title: "Google Gemini 2.5",
    description: "Erstes öffentlich verfügbares Multi-Agent-Modell mit 1M Token Context Window.",
    icon: MessageSquare,
    category: "Text",
    difficulty: "Einfach",
    link: "https://gemini.google.com",
    features: ["Multi-Agent", "1M Token Context", "Mixture-of-Experts"],
    isNew: true,
    date: "2025-01-15",
  },
  {
    id: 4,
    title: "Midjourney Model V1",
    description: "Midjourneys erstes AI-Video-Generierungsmodell für hochwertige Videoinhalte.",
    icon: Video,
    category: "Video",
    difficulty: "Einfach",
    link: "https://midjourney.com",
    features: ["Video-Generierung", "Hochauflösend", "Kreative Kontrolle"],
    isNew: true,
    date: "2025-01-15",
  },
  {
    id: 5,
    title: "Microsoft Copilot Vision",
    description:
      "AI-Assistent der visuell den Windows Desktop scannt zur Aufgabenerkennung und Workflow-Automatisierung.",
    icon: Code,
    category: "Produktivität",
    difficulty: "Einfach",
    link: "https://copilot.microsoft.com",
    features: ["Desktop-Scanning", "Workflow-Automatisierung", "Visuelle Erkennung"],
    isNew: true,
    date: "2025-01-15",
  },
  {
    id: 6,
    title: "Google Veo 3",
    description: "Googles neuestes AI-Video-Generierungsmodell mit verbesserter Qualität und Kontrolle.",
    icon: Video,
    category: "Video",
    difficulty: "Einfach",
    link: "https://deepmind.google",
    features: ["Video-Erstellung", "Realistische Bewegungen", "Lange Sequenzen"],
    isNew: true,
    date: "2025-01-15",
  },
  {
    id: 7,
    title: "GitHub Copilot",
    description: "KI-Programmierassistent, der Code-Vorschläge und Automatisierung bietet.",
    icon: Code,
    category: "Programmierung",
    difficulty: "Fortgeschritten",
    link: "https://github.com/features/copilot",
    features: ["Code-Generierung", "Debugging", "Dokumentation"],
    isNew: false,
    date: "2024-06-15",
  },
  {
    id: 8,
    title: "Grammarly",
    description: "KI-gestützte Rechtschreibprüfung und Schreibassistent für bessere Texte.",
    icon: FileText,
    category: "Text",
    difficulty: "Einfach",
    link: "https://www.grammarly.com",
    features: ["Rechtschreibprüfung", "Stilverbesserung", "Tonalität"],
    isNew: false,
    date: "2024-03-10",
  },
]

export function AiToolsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Alle")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("Alle")
  const [ageFilter, setAgeFilter] = useState<string>("4weeks")
  const [aiTools, setAiTools] = useState<AITool[]>(staticAiTools)
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  useEffect(() => {
    loadDynamicContent()
  }, [])

  const loadDynamicContent = async () => {
    setIsLoading(true)
    try {
      const dynamicTools: AITool[] = [
        {
          id: 101,
          title: "OpenAI Operator",
          description: "Neuer AI-Agent von OpenAI, der Aufgaben im Web ausführen und ganze Computer steuern kann.",
          icon: Code,
          category: "Produktivität",
          difficulty: "Fortgeschritten",
          link: "https://openai.com/operator",
          features: ["Web-Automatisierung", "Computer-Steuerung", "Task-Ausführung"],
          isNew: true,
          date: "2025-01-23",
        },
        {
          id: 102,
          title: "Google Workspace mit Gemini",
          description: "Alle Google Workspace Business-Pläne enthalten jetzt Gemini-Features ohne Zusatzkosten.",
          icon: MessageSquare,
          category: "Produktivität",
          difficulty: "Einfach",
          link: "https://workspace.google.com",
          features: ["Integrierte AI", "Kostenlos", "Business-Tools"],
          isNew: true,
          date: "2025-01-20",
        },
      ]

      const updatedTools = [...dynamicTools, ...staticAiTools]
      setAiTools(updatedTools)
      setLastUpdated(new Date())
    } catch (error) {
      console.error("Fehler beim Laden der dynamischen Inhalte:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const categories = ["Alle", "Text", "Video", "Programmierung", "Produktivität"]
  const difficulties = ["Alle", "Einfach", "Fortgeschritten"]
  const ageFilters = [
    { value: "4weeks", label: "Letzte 4 Wochen" },
    { value: "3months", label: "Letzte 3 Monate" },
    { value: "all", label: "Alle Einträge" },
  ]

  const filterByAge = (tool: AITool) => {
    if (ageFilter === "all") return true

    const toolDate = new Date(tool.date)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - toolDate.getTime())
    const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7))

    if (ageFilter === "4weeks") return diffWeeks <= 4
    if (ageFilter === "3months") return diffWeeks <= 12
    return true
  }

  const filteredTools = aiTools.filter((tool) => {
    const categoryMatch = selectedCategory === "Alle" || tool.category === selectedCategory
    const difficultyMatch = selectedDifficulty === "Alle" || tool.difficulty === selectedDifficulty
    const ageMatch = filterByAge(tool)
    return categoryMatch && difficultyMatch && ageMatch
  })

  return (
    <section id="tools" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Wrench className="w-4 h-4 mr-2" />
            KI-Tools ausprobieren
          </Badge>
          <h2 className="text-3xl font-bold text-foreground mb-4">KI-Tools für Einsteiger</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Entdecken Sie benutzerfreundliche KI-Tools, die Sie sofort ausprobieren können
          </p>
          {isLoading && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span className="text-sm text-muted-foreground">Lade aktuelle Tools...</span>
            </div>
          )}
          {lastUpdated && (
            <p className="text-sm text-muted-foreground mt-2">
              Automatisch aktualisiert: {lastUpdated.toLocaleString("de-DE")}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {ageFilters.map((filter) => (
              <Button
                key={filter.value}
                variant={ageFilter === filter.value ? "default" : "outline"}
                onClick={() => setAgeFilter(filter.value)}
                size="sm"
              >
                {filter.label}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
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
          <div className="flex flex-wrap justify-center gap-2">
            {difficulties.map((difficulty) => (
              <Button
                key={difficulty}
                variant={selectedDifficulty === difficulty ? "default" : "outline"}
                onClick={() => setSelectedDifficulty(difficulty)}
                size="sm"
              >
                {difficulty}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTools.map((tool) => {
            const IconComponent = tool.icon
            return (
              <Card key={tool.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">{tool.category}</Badge>
                      <Badge variant={tool.difficulty === "Einfach" ? "default" : "secondary"}>{tool.difficulty}</Badge>
                      {tool.isNew && (
                        <Badge variant="destructive" className="text-xs">
                          NEU 2025
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{tool.title}</CardTitle>
                  <CardDescription className="text-base">{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-sm text-muted-foreground">Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {tool.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button asChild className="w-full">
                    <a href={tool.link} target="_blank" rel="noopener noreferrer">
                      Tool ausprobieren <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
