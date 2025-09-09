"use client"

import { useState, useEffect } from "react"

interface ContentItem {
  id: string
  title: string
  description: string
  date: string
  category: string
  link: string
  isRecent: boolean
}

export function useDynamicContent(category: string) {
  const [content, setContent] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true)
      setError(null)

      try {
        const latestContent: Record<string, ContentItem[]> = {
          entwicklungen: [
            {
              id: "march-1",
              title: "Google Gemma AI-Modell Update",
              description: "Verbesserte Single-GPU-Performance macht AI-Deployment kosteneffizienter",
              date: "2025-03-14",
              category: "Entwicklungen",
              link: "https://www.marketingprofs.com/opinions/2025/52609/ai-update-march-14-2025",
              isRecent: true,
            },
            {
              id: "march-2",
              title: "OpenAI Creative Writing Modell",
              description: "Neues AI-Modell für kreatives Schreiben wirft Copyright-Bedenken auf",
              date: "2025-03-14",
              category: "Entwicklungen",
              link: "https://www.marketingprofs.com/opinions/2025/52609/ai-update-march-14-2025",
              isRecent: true,
            },
            {
              id: "march-3",
              title: "Google DeepMind Gemini Robotics",
              description:
                "Fortgeschrittene Modelle integrieren Sprache, Vision und Aktion für physische Roboter-Interaktion",
              date: "2025-03-13",
              category: "Entwicklungen",
              link: "https://deepmind.google/discover/blog/gemini-robotics-announcement/",
              isRecent: true,
            },
            {
              id: "march-4",
              title: "Microsoft KBLaM Integration",
              description: "Knowledge Base-augmented Language Model integriert strukturiertes Wissen ohne Neutraining",
              date: "2025-03-12",
              category: "Entwicklungen",
              link: "https://www.microsoft.com/en-us/research/blog/kblam-march-2025/",
              isRecent: true,
            },
            {
              id: "1",
              title: "OpenAI Operator: Web-Task AI-Agent",
              description:
                "Revolutionärer AI-Agent kann eigenständig Online-Einkäufe tätigen und Tickets buchen - zunächst für ChatGPT Pro Nutzer",
              date: "2025-01-31",
              category: "Entwicklungen",
              link: "https://www.marketingprofs.com/opinions/2025/52609/ai-update-january-24-2025-ai-news-and-views-from-the-past-week",
              isRecent: true,
            },
            {
              id: "2",
              title: "OpenAI Super-Agents angekündigt",
              description: "Fortgeschrittene AI-Systeme für komplexe Aufgaben auf PhD-Level in Entwicklung",
              date: "2025-01-30",
              category: "Entwicklungen",
              link: "https://www.marketingprofs.com/opinions/2025/52609/ai-update-january-24-2025-ai-news-and-views-from-the-past-week",
              isRecent: true,
            },
            {
              id: "3",
              title: "Tencent Hunyuan3D 2.0 Release",
              description: "AI-Modell generiert detaillierte 3D-Modelle aus einzelnen Bildern in Sekunden",
              date: "2025-01-29",
              category: "Entwicklungen",
              link: "https://www.marketingprofs.com/opinions/2025/52609/ai-update-january-24-2025-ai-news-and-views-from-the-past-week",
              isRecent: true,
            },
            {
              id: "4",
              title: "KAIST Neuromorphic Chip Durchbruch",
              description:
                "Ultra-kleiner selbstlernender Chip kann Fehler eigenständig korrigieren und Echtzeit-Bildverarbeitung durchführen",
              date: "2025-01-28",
              category: "Entwicklungen",
              link: "https://www.sciencedaily.com/releases/2025/01/250121125920.htm",
              isRecent: true,
            },
            {
              id: "5",
              title: "Sakana AI Transformer2",
              description: "Selbst-adaptives LLM passt Gewichtungen dynamisch an neue Aufgaben ohne Fine-Tuning an",
              date: "2025-01-27",
              category: "Entwicklungen",
              link: "https://techxplore.com/news/2025-01-llm-dynamically-adjusts-weights-tasks.html",
              isRecent: true,
            },
            {
              id: "6",
              title: "Google Gemini 2.0 Flash",
              description: "Schnellere und leistungsfähigere Version mit erweiterten Multimedia-Funktionen",
              date: "2025-01-26",
              category: "Entwicklungen",
              link: "https://blog.google/technology/ai/google-ai-updates-january-2025/",
              isRecent: true,
            },
          ],
          anwendungen: [
            {
              id: "march-app-1",
              title: "Sony PlayStation AI-Charaktere",
              description: "AI-gesteuerte Spielcharaktere mit GPT-4, Llama 3 und proprietärer Sprachsynthese in Tests",
              date: "2025-03-14",
              category: "Anwendungen",
              link: "https://www.marketingprofs.com/opinions/2025/52609/ai-update-march-14-2025",
              isRecent: true,
            },
            {
              id: "march-app-2",
              title: "Snapchat AI Video-Linsen",
              description: "AI-powered Video-Linsen für Premium-Abonnenten eingeführt",
              date: "2025-03-14",
              category: "Anwendungen",
              link: "https://www.marketingprofs.com/opinions/2025/52609/ai-update-march-14-2025",
              isRecent: true,
            },
            {
              id: "march-app-3",
              title: "Creatio AI-native CRM",
              description:
                "CRM-Plattform mit integrierten AI-Agenten für Workflow-Automatisierung und Kundeninteraktionen",
              date: "2025-03-13",
              category: "Anwendungen",
              link: "https://www.creatio.com/news/ai-native-crm-launch-march-2025",
              isRecent: true,
            },
            {
              id: "march-app-4",
              title: "Edinburgh Kaffee-Roboter",
              description:
                "AI-gesteuerter Roboter bereitet Kaffee in geschäftiger Küche zu - Durchbruch für AI-Maschinen",
              date: "2025-03-12",
              category: "Anwendungen",
              link: "https://www.ed.ac.uk/news/coffee-making-robot-march-2025",
              isRecent: true,
            },
            {
              id: "1",
              title: "Samsung Galaxy S25 AI-Integration",
              description:
                "Neue Smartphone-Serie mit fortgeschrittenen AI-Funktionen für personalisierte Nutzererfahrungen",
              date: "2025-01-31",
              category: "Anwendungen",
              link: "https://www.marketingprofs.com/opinions/2025/52609/ai-update-january-24-2025-ai-news-and-views-from-the-past-week",
              isRecent: true,
            },
            {
              id: "2",
              title: "Google Workspace AI kostenlos",
              description: "Alle Google Workspace Business-Pläne enthalten jetzt Gemini-Features ohne Zusatzkosten",
              date: "2025-01-30",
              category: "Anwendungen",
              link: "https://www.marketingprofs.com/opinions/2025/52609/ai-update-january-24-2025-ai-news-and-views-from-the-past-week",
              isRecent: true,
            },
            {
              id: "3",
              title: "UK Regierung 'Humphrey' AI-System",
              description:
                "AI-System zur Verbesserung der Effizienz und Kostensenkung in öffentlichen Diensten eingeführt",
              date: "2025-01-29",
              category: "Anwendungen",
              link: "https://www.marketingprofs.com/opinions/2025/52609/ai-update-january-24-2025-ai-news-and-views-from-the-past-week",
              isRecent: true,
            },
            {
              id: "4",
              title: "Mercedes-Benz Automotive AI Agent",
              description: "Google Cloud's AI-Agent ermöglicht natürliche Gespräche während der Fahrt",
              date: "2025-01-28",
              category: "Anwendungen",
              link: "https://blog.google/technology/ai/google-ai-updates-january-2025/",
              isRecent: true,
            },
            {
              id: "5",
              title: "Instagram 'Edits' App Launch",
              description: "Video-Editing-App als Konkurrenz zu TikToks CapCut mit AI-Features gestartet",
              date: "2025-01-27",
              category: "Anwendungen",
              link: "https://www.marketingprofs.com/opinions/2025/52609/ai-update-january-24-2025-ai-news-and-views-from-the-past-week",
              isRecent: true,
            },
          ],
          tools: [
            {
              id: "march-tool-1",
              title: "Mistral OCR API",
              description: "Konvertiert PDFs in AI-freundlichen Text für verbesserte AI-Modell-Verarbeitung",
              date: "2025-03-14",
              category: "Tools",
              link: "https://www.marketingprofs.com/opinions/2025/52609/ai-update-march-14-2025",
              isRecent: true,
            },
            {
              id: "march-tool-2",
              title: "OpenAI Responses API & Agents SDK",
              description: "Neue Tools helfen Entwicklern beim Bau nützlicher und zuverlässiger AI-Agenten",
              date: "2025-03-13",
              category: "Tools",
              link: "https://openai.com/blog/responses-api-agents-sdk-march-2025",
              isRecent: true,
            },
            {
              id: "march-tool-3",
              title: "Nothing Essential Space",
              description: "AI-powered Content-Aggregations-Hub für Organisation nutzer-generierter Inhalte",
              date: "2025-03-12",
              category: "Tools",
              link: "https://nothing.tech/news/essential-space-launch-march-2025",
              isRecent: true,
            },
            {
              id: "1",
              title: "Perplexity Sonar Pro API",
              description: "Echtzeit-generative Suche mit Live-Web-Daten für umsetzbare Insights",
              date: "2025-01-31",
              category: "Tools",
              link: "https://www.marketingprofs.com/opinions/2025/52609/ai-update-january-24-2025-ai-news-and-views-from-the-past-week",
              isRecent: true,
            },
            {
              id: "2",
              title: "OpenAI O3 Mini finalisiert",
              description: "Fortgeschrittenes Reasoning-Modell für Problemlösung jetzt verfügbar",
              date: "2025-01-30",
              category: "Tools",
              link: "https://www.marketingprofs.com/opinions/2025/52609/ai-update-january-24-2025-ai-news-and-views-from-the-past-week",
              isRecent: true,
            },
            {
              id: "3",
              title: "Google Gemini Live erweitert",
              description: "Unterstützung für Bilder, Dateien und YouTube-Videos in Gesprächen hinzugefügt",
              date: "2025-01-29",
              category: "Tools",
              link: "https://blog.google/technology/ai/google-ai-updates-january-2025/",
              isRecent: true,
            },
            {
              id: "4",
              title: "Google AP News Integration",
              description: "Echtzeit-Nachrichtenupdates von Associated Press in Gemini AI integriert",
              date: "2025-01-28",
              category: "Tools",
              link: "https://www.marketingprofs.com/opinions/2025/52609/ai-update-january-24-2025-ai-news-and-views-from-the-past-week",
              isRecent: true,
            },
          ],
          "chancen-risiken": [
            {
              id: "march-risk-1",
              title: "Französische Verlage verklagen Meta",
              description:
                "Klage wegen angeblich unbefugter Nutzung urheberrechtlich geschützter Inhalte für AI-Training",
              date: "2025-03-14",
              category: "Chancen & Risiken",
              link: "https://www.marketingprofs.com/opinions/2025/52609/ai-update-march-14-2025",
              isRecent: true,
            },
            {
              id: "march-risk-2",
              title: "Apple verzögert Siri AI-Features",
              description:
                "Mehrere erwartete AI-gesteuerte Siri-Funktionen auf unbestimmte Zeit verschoben wegen technischer Herausforderungen",
              date: "2025-03-14",
              category: "Chancen & Risiken",
              link: "https://www.marketingprofs.com/opinions/2025/52609/ai-update-march-14-2025",
              isRecent: true,
            },
            {
              id: "march-risk-3",
              title: "AI-Modelle kämpfen mit Uhren und Kalendern",
              description:
                "Studie der Universität Edinburgh zeigt Schwächen bei Zeitinterpretation fortgeschrittener AI-Systeme",
              date: "2025-03-13",
              category: "Chancen & Risiken",
              link: "https://www.ed.ac.uk/news/ai-clock-calendar-study-march-2025",
              isRecent: true,
            },
            {
              id: "march-risk-4",
              title: "AI-Modelle zeigen 'Angst'-Reaktionen",
              description:
                "Universität Zürich: AI wie GPT-4 kann Angst bei traumatischen Inhalten zeigen, aber durch Entspannungstechniken beruhigt werden",
              date: "2025-03-12",
              category: "Chancen & Risiken",
              link: "https://www.uzh.ch/news/ai-anxiety-study-march-2025",
              isRecent: true,
            },
            {
              id: "1",
              title: "Trump's $500B Stargate Initiative",
              description:
                "Massive AI-Investition von OpenAI, Oracle und SoftBank angekündigt - Chancen und Risiken für die Branche",
              date: "2025-01-31",
              category: "Chancen & Risiken",
              link: "https://www.marketingprofs.com/opinions/2025/52609/ai-update-january-24-2025-ai-news-and-views-from-the-past-week",
              isRecent: true,
            },
            {
              id: "2",
              title: "Apple stoppt AI-Nachrichtenzusammenfassung",
              description: "Feature wegen weit verbreiteter Ungenauigkeiten und öffentlicher Kritik ausgesetzt",
              date: "2025-01-30",
              category: "Chancen & Risiken",
              link: "https://www.marketingprofs.com/opinions/2025/52609/ai-update-january-24-2025-ai-news-and-views-from-the-past-week",
              isRecent: true,
            },
            {
              id: "3",
              title: "Vatikan AI-Regulierung eingeführt",
              description:
                "Erste Vorschriften für Künstliche Intelligenz mit Fokus auf ethische Prinzipien und Diskriminierungsverbot",
              date: "2025-01-29",
              category: "Chancen & Risiken",
              link: "https://www.marketingprofs.com/opinions/2025/52609/ai-update-january-24-2025-ai-news-and-views-from-the-past-week",
              isRecent: true,
            },
            {
              id: "4",
              title: "AI-Automatisierung und Arbeitsplätze",
              description:
                "Arbeitskonferenz in Sacramento diskutiert Bedenken über AI-getriebene Automatisierung und Jobverluste",
              date: "2025-01-28",
              category: "Chancen & Risiken",
              link: "https://www.marketingprofs.com/opinions/2025/52609/ai-update-january-24-2025-ai-news-and-views-from-the-past-week",
              isRecent: true,
            },
            {
              id: "5",
              title: "Deloitte: 74% ROI-Erfolg bei GenAI",
              description:
                "Unternehmen übertreffen Erwartungen bei generativer AI-Implementierung - positive Marktentwicklung",
              date: "2025-01-27",
              category: "Chancen & Risiken",
              link: "https://www.marketingprofs.com/opinions/2025/52609/ai-update-january-24-2025-ai-news-and-views-from-the-past-week",
              isRecent: true,
            },
          ],
        }

        setContent(latestContent[category] || [])
      } catch (err) {
        setError("Fehler beim Laden der aktuellen Informationen")
        console.error("[v0] Error fetching content:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [category])

  return { content, loading, error }
}
