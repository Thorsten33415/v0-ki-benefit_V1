"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, ExternalLink, Zap, Building, Home, RefreshCw } from "lucide-react"

// Mock data for AI applications
const aiApplications = [
  {
    id: 1,
    title: "AI 'Copilot' reduziert Verschreibungsfehler",
    description:
      "Stanford Health Care nutzt AI-Assistenten zur Verringerung von Medikationsfehlern und Verbesserung der Patientensicherheit.",
    date: "2025-08-10",
    category: "Gesundheitswesen",
    sector: "industrial",
    link: "https://news.stanford.edu",
    daysAgo: 7,
    icon: Building,
  },
  {
    id: 2,
    title: "ChatEHR: AI für Patientenakten",
    description:
      "Kliniker können mit ChatEHR direkt mit Patientenakten interagieren, Diagramme zusammenfassen und medizinische Aufgaben automatisieren.",
    date: "2025-06-15",
    category: "Medizinische Dokumentation",
    sector: "industrial",
    link: "https://news.stanford.edu",
    daysAgo: 63,
    icon: Building,
  },
  {
    id: 3,
    title: "AI-Agenten im Gesundheitswesen 2025",
    description:
      "Entwicklung von AI-Agenten für klinische Workflows, Umsatzzyklusbewertung und Zero-Click-Dokumentation.",
    date: "2025-07-20",
    category: "Healthcare AI",
    sector: "industrial",
    link: "https://www.beckershospitalreview.com",
    daysAgo: 28,
    icon: Building,
  },
  {
    id: 4,
    title: "AI-gestützte Hörgeräte mit Spracherkennung",
    description:
      "Neue Generation von Hörgeräten mit verbesserter Spracherkennung und Hintergrundgeräuschfilterung durch AI.",
    date: "2025-08-05",
    category: "Medizintechnik",
    sector: "private",
    link: "https://www.crescendo.ai",
    daysAgo: 12,
    icon: Home,
  },
  {
    id: 5,
    title: "AWS Agentic AI für Geschäftsprozesse",
    description:
      "Amazon Web Services führt 'agentic AI' Fähigkeiten zur Automatisierung komplexer Geschäftsprozesse ein.",
    date: "2025-07-25",
    category: "Geschäftsautomatisierung",
    sector: "industrial",
    link: "https://aws.amazon.com",
    daysAgo: 23,
    icon: Building,
  },
  {
    id: 6,
    title: "Meta HSTN: AI-Smart Glasses",
    description:
      "Meta und Oakley stellen AI-gesteuerte Smart Glasses vor, die Augmented Reality mit künstlicher Intelligenz verbinden.",
    date: "2025-08-01",
    category: "Wearable Tech",
    sector: "private",
    link: "https://about.meta.com",
    daysAgo: 16,
    icon: Home,
  },
  {
    id: 7,
    title: "AI für Diabetiker-Früherkennung",
    description:
      "AI-Systeme zeigen hohe Genauigkeit bei der Früherkennung diabetischer Augenerkrankungen und revolutionieren die Vorsorge.",
    date: "2025-07-30",
    category: "Präventivmedizin",
    sector: "industrial",
    link: "https://www.crescendo.ai",
    daysAgo: 18,
    icon: Building,
  },
  {
    id: 8,
    title: "Mind-Reading AI mit 70% Genauigkeit",
    description: "Australische Forscher entwickeln AI, die Gehirnssignale mit über 70% Genauigkeit in Worte umwandelt.",
    date: "2025-08-08",
    category: "Neurotechnologie",
    sector: "industrial",
    link: "https://www.crescendo.ai",
    daysAgo: 9,
    icon: Building,
  },
  {
    id: 9,
    title: "Historic Mentor: AI-Gespräche mit Geschichte",
    description:
      "EdTech-Startup ermöglicht Nutzern Gespräche mit historischen Persönlichkeiten durch fortschrittliche AI-Technologie.",
    date: "2025-07-15",
    category: "Bildung",
    sector: "private",
    link: "https://www.crescendo.ai",
    daysAgo: 33,
    icon: Home,
  },
  {
    id: 10,
    title: "AI-Waffendetektionssystem in Krankenhäusern",
    description:
      "Krankenhaus in Nova Scotia setzt AI-gestütztes Waffendetektionssystem am Eingang zur Sicherheitsverbesserung ein.",
    date: "2025-07-28",
    category: "Sicherheitstechnik",
    sector: "industrial",
    link: "https://www.crescendo.ai",
    daysAgo: 20,
    icon: Building,
  },
]

interface DynamicApplication {
  id: string
  title: string
  description: string
  date: string
  category: string
  sector: "private" | "industrial"
  link: string
  daysAgo: number
  icon: any
  isNew?: boolean
}

const latestApplications: DynamicApplication[] = [
  {
    id: "ai-patient-actor-2025",
    title: "AI Patient Actor App für Medizinausbildung",
    description:
      "Neue AI-Anwendung ermöglicht Medizinstudenten das Üben klinischer Kommunikation mit sofortigem, personalisiertem Feedback.",
    date: "2025-01-15",
    category: "Medizinische Ausbildung",
    sector: "industrial",
    link: "https://www.ncbi.nlm.nih.gov",
    daysAgo: 3,
    icon: Building,
    isNew: true,
  },
  {
    id: "llmdp-ophthalmology-2025",
    title: "LLMDP-System für Augenheilkunde-Training",
    description:
      "Sprachgesteuerte virtuelle Patienten mit adaptivem Feedback reduzieren Trainingskosten und bauen Vertrauen für echte Patienteninteraktionen auf.",
    date: "2025-01-12",
    category: "Medizinische Simulation",
    sector: "industrial",
    link: "https://www.nature.com",
    daysAgo: 6,
    icon: Building,
    isNew: true,
  },
  {
    id: "gpt4o-ipe-scenarios-2025",
    title: "GPT-4o für interprofessionelle Bildungsszenarien",
    description:
      "Fortgeschrittene AI-Modelle generieren hochwertige klinische Szenarien schneller als traditionelle Methoden und reduzieren Fakultätsaufwand.",
    date: "2025-01-10",
    category: "Bildungstechnologie",
    sector: "industrial",
    link: "https://www.medsim.ai",
    daysAgo: 8,
    icon: Building,
    isNew: true,
  },
  {
    id: "medsimai-platform-2025",
    title: "MedSimAI: AI-gestützte Simulationsplattform",
    description:
      "Realistische interaktive Patientenbegegnungen mit automatisierter Bewertung und strukturiertem Feedback für skalierbare medizinische Ausbildung.",
    date: "2025-01-08",
    category: "Medizinische Simulation",
    sector: "industrial",
    link: "https://www.medsim.ai",
    daysAgo: 10,
    icon: Building,
    isNew: true,
  },
  {
    id: "gpt-history-taking-2025",
    title: "GPT-basierte simulierte Patientensysteme",
    description:
      "Verbesserung der Anamnese-Fähigkeiten von Medizinstudenten durch sofortiges strukturiertes Feedback und vielfältige klinische Fälle.",
    date: "2025-01-05",
    category: "Medizinische Ausbildung",
    sector: "industrial",
    link: "https://www.ncbi.nlm.nih.gov",
    daysAgo: 13,
    icon: Building,
    isNew: true,
  },
]

export function AiApplicationsSection() {
  const [filter, setFilter] = useState<string>("4weeks") // Default to 4 weeks filter
  const [sectorFilter, setSectorFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("newest")
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [allApplications, setAllApplications] = useState<DynamicApplication[]>([])

  useEffect(() => {
    const loadDynamicContent = async () => {
      setIsLoading(true)
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Combine latest applications with existing ones
        const combinedApplications = [
          ...latestApplications,
          ...aiApplications.map((app) => ({
            ...app,
            id: app.id.toString(),
            isNew: false,
          })),
        ]

        setAllApplications(combinedApplications)
        setLastUpdated(new Date())
      } catch (error) {
        console.error("Failed to load dynamic content:", error)
        // Fallback to static content
        setAllApplications(
          aiApplications.map((app) => ({
            ...app,
            id: app.id.toString(),
            isNew: false,
          })),
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadDynamicContent()
  }, [])

  const filteredApplications = allApplications
    .filter((app) => {
      const timeFilter =
        filter === "all" ||
        (filter === "4weeks" && app.daysAgo <= 28) ||
        (filter === "week" && app.daysAgo <= 7) ||
        (filter === "month" && app.daysAgo <= 30)

      const sectorMatch = sectorFilter === "all" || app.sector === sectorFilter

      return timeFilter && sectorMatch
    })
    .sort((a, b) => {
      if (sortBy === "newest") return a.daysAgo - b.daysAgo
      if (sortBy === "oldest") return b.daysAgo - a.daysAgo
      return 0
    })

  return (
    <section id="anwendungen" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-work-sans text-3xl font-bold text-foreground sm:text-4xl mb-4">
            KI-Anwendungen in der Praxis
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Entdecken Sie konkrete Anwendungsfälle von Künstlicher Intelligenz im privaten und industriellen Bereich.
          </p>
          {isLoading && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <RefreshCw className="h-4 w-4 animate-spin text-accent" />
              <span className="text-sm text-muted-foreground">Lade aktuelle Anwendungen...</span>
            </div>
          )}
          {lastUpdated && !isLoading && (
            <p className="text-sm text-muted-foreground mt-2">
              Automatisch aktualisiert: {lastUpdated.toLocaleString("de-DE")}
            </p>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8 justify-between items-start lg:items-center">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-accent" aria-hidden="true" />
            <span className="font-medium text-foreground">Filter Anwendungen:</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={sectorFilter} onValueChange={setSectorFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Bereich wählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Bereiche</SelectItem>
                <SelectItem value="private">Privat</SelectItem>
                <SelectItem value="industrial">Industrie</SelectItem>
              </SelectContent>
            </Select>
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

        {/* Applications Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredApplications.map((app) => {
            const IconComponent = app.icon
            return (
              <Card
                key={app.id}
                className="group hover:shadow-lg transition-all duration-200 border-border hover:border-accent/50 bg-card"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <IconComponent className="h-4 w-4 text-accent" aria-hidden="true" />
                      <Badge variant={app.sector === "private" ? "default" : "secondary"} className="text-xs">
                        {app.sector === "private" ? "Privat" : "Industrie"}
                      </Badge>
                      {app.isNew && (
                        <Badge variant="destructive" className="text-xs">
                          NEU
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="mr-1 h-3 w-3" aria-hidden="true" />
                      vor {app.daysAgo} Tagen
                    </div>
                  </div>
                  <CardTitle className="font-work-sans text-lg group-hover:text-accent transition-colors">
                    {app.title}
                  </CardTitle>
                  <Badge variant="outline" className="w-fit text-xs">
                    {app.category}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed mb-4">{app.description}</CardDescription>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto font-medium text-accent hover:text-accent/80"
                    asChild
                  >
                    <a href={app.link} target="_blank" rel="noopener noreferrer">
                      Details ansehen
                      <ExternalLink className="ml-1 h-3 w-3" aria-hidden="true" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredApplications.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Keine Anwendungen für die gewählten Filter gefunden.</p>
          </div>
        )}
      </div>
    </section>
  )
}
