"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, ExternalLink, TrendingUp, RefreshCw } from "lucide-react"
import { useDynamicContent } from "@/hooks/use-dynamic-content"

export function AiUpdatesSection() {
  const [filter, setFilter] = useState<string>("4weeks")
  const [sortBy, setSortBy] = useState<string>("newest")

  const { content: dynamicUpdates, loading, error } = useDynamicContent("entwicklungen")

  const staticUpdates = [
    {
      id: 1,
      title: "OpenAI veröffentlicht ChatGPT-5 mit allgemeiner Intelligenz",
      description:
        "CEO Sam Altman beschreibt ChatGPT-5 als 'generally intelligent' mit enormen Verbesserungen in Coding, Schreiben und Gesundheitswesen.",
      date: "2025-08-15",
      category: "Large Language Models",
      link: "https://openai.com",
      daysAgo: 2,
      isRecent: true,
    },
    {
      id: 2,
      title: "Anthropic Claude 4 Familie mit 200K Token Context",
      description:
        "Claude 4 Opus und Sonnet mit erweitertem Thinking Mode für Chain-of-Thought Reasoning veröffentlicht.",
      date: "2025-05-20",
      category: "Large Language Models",
      link: "https://www.anthropic.com",
      daysAgo: 89,
    },
    {
      id: 3,
      title: "Google Gemini 2.5 als erstes Multi-Agent-Modell",
      description: "Gemini 2.5 Pro und Flash mit vollständigem 1M Token Context und Multi-Agent-Fähigkeiten.",
      date: "2025-07-10",
      category: "Multi-Agent AI",
      link: "https://deepmind.google",
      daysAgo: 38,
    },
    {
      id: 4,
      title: "Midjourney Model V1 für AI-Videogenerierung",
      description:
        "Midjourney stellt sein erstes AI-Video-Generierungsmodell vor und konkurriert mit Sora und anderen.",
      date: "2025-06-25",
      category: "Video AI",
      link: "https://midjourney.com",
      daysAgo: 53,
    },
    {
      id: 5,
      title: "Microsoft Copilot Vision für Windows Desktop",
      description:
        "AI-Assistent scannt visuell den Windows Desktop zur Aufgabenerkennung und Workflow-Automatisierung.",
      date: "2025-07-30",
      category: "Produktivität",
      link: "https://copilot.microsoft.com",
      daysAgo: 18,
    },
    {
      id: 6,
      title: "Thinking Machines sammelt 2 Milliarden Dollar",
      description:
        "Mira Muratis neues Unternehmen erreicht 10 Milliarden Dollar Bewertung für autonome agentische AI-Systeme.",
      date: "2025-08-05",
      category: "Investitionen",
      link: "https://thinkingmachines.ai",
      daysAgo: 12,
    },
    {
      id: 7,
      title: "AI Index Report 2025: Dramatische Fortschritte",
      description: "Stanford HAI berichtet über signifikante Verbesserungen bei MMMU, GPQA und SWE-bench Benchmarks.",
      date: "2025-01-15",
      category: "Forschung",
      link: "https://hai.stanford.edu",
      daysAgo: 216,
    },
    {
      id: 8,
      title: "Google Big Sleep: AI für Cybersecurity",
      description: "AI-System erkennt und deaktiviert schlafende Web-Domains, die für Cyberangriffe anfällig sind.",
      date: "2025-08-10",
      category: "Sicherheit",
      link: "https://security.googleblog.com",
      daysAgo: 7,
    },
  ]

  const convertedDynamicUpdates = dynamicUpdates.map((item, index) => ({
    id: index + 100, // Avoid ID conflicts
    title: item.title,
    description: item.description,
    date: item.date,
    category: item.category,
    link: item.link,
    daysAgo: Math.floor((new Date().getTime() - new Date(item.date).getTime()) / (1000 * 60 * 60 * 24)),
    isRecent: item.isRecent,
  }))

  const allUpdates = loading ? staticUpdates : [...convertedDynamicUpdates, ...staticUpdates]

  const filteredUpdates = allUpdates
    .filter((update) => {
      if (filter === "all") return true
      if (filter === "week") return update.daysAgo <= 7
      if (filter === "month") return update.daysAgo <= 30
      if (filter === "4weeks") return update.daysAgo <= 28
      return true
    })
    .sort((a, b) => {
      if (sortBy === "newest") return a.daysAgo - b.daysAgo
      if (sortBy === "oldest") return b.daysAgo - a.daysAgo
      return 0
    })

  return (
    <section id="entwicklungen" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h2 className="font-work-sans text-3xl font-bold text-foreground sm:text-4xl">Aktuelle KI-Entwicklungen</h2>
            {loading && <RefreshCw className="h-5 w-5 animate-spin text-accent" />}
          </div>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Bleiben Sie auf dem neuesten Stand der KI-Forschung und -Entwicklung mit unseren kuratierten Updates aus der
            Branche.
          </p>
          {!loading && !error && dynamicUpdates.length > 0 && (
            <Badge variant="outline" className="mt-2 text-green-600 border-green-600">
              ✓ Automatisch aktualisiert
            </Badge>
          )}
          {error && (
            <Badge variant="outline" className="mt-2 text-amber-600 border-amber-600">
              ⚠ Fallback-Daten verwendet
            </Badge>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-between items-start sm:items-center">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" aria-hidden="true" />
            <span className="font-medium text-foreground">Filter nach Zeitraum:</span>
          </div>
          <div className="flex gap-4">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Zeitraum wählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4weeks">Letzte 4 Wochen</SelectItem>
                <SelectItem value="week">Letzte Woche</SelectItem>
                <SelectItem value="month">Letzter Monat</SelectItem>
                <SelectItem value="all">Alle Einträge</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sortierung" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Neueste zuerst</SelectItem>
                <SelectItem value="oldest">Älteste zuerst</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Updates Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredUpdates.map((update) => (
            <Card
              key={update.id}
              className="group hover:shadow-lg transition-all duration-200 border-border hover:border-accent/50"
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {update.category}
                    </Badge>
                    {update.id >= 100 && update.daysAgo <= 7 && (
                      <Badge variant="default" className="text-xs bg-green-600">
                        NEU
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" aria-hidden="true" />
                    vor {update.daysAgo} Tagen
                  </div>
                </div>
                <CardTitle className="font-work-sans text-lg group-hover:text-accent transition-colors">
                  {update.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed mb-4">{update.description}</CardDescription>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 h-auto font-medium text-accent hover:text-accent/80"
                  asChild
                >
                  <a href={update.link} target="_blank" rel="noopener noreferrer">
                    Mehr erfahren
                    <ExternalLink className="ml-1 h-3 w-3" aria-hidden="true" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredUpdates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Keine Einträge für den gewählten Zeitraum gefunden.</p>
          </div>
        )}
      </div>
    </section>
  )
}
