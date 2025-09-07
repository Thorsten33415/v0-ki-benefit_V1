import type { Metadata } from "next"
import { BackNavigation } from "@/components/back-navigation"

export const dynamic = "force-dynamic"
export const revalidate = 0
export const runtime = "nodejs"

export const metadata: Metadata = {
  title: "ki-Entwicklungen | ki-benefits",
  description: "Neueste Fortschritte und Trends in der KI-Forschung - Aktuelle Entwicklungen und Insights",
}

type Article = {
  title: string
  link: string
  source?: string
  date?: string
  snippet?: string
}

function decodeHtml(html: string) {
  return html
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/<[^>]*>/g, "") // Strip tags in description
    .trim()
}

async function fetchGoogleNewsRss(query: string): Promise<Article[]> {
  const q = encodeURIComponent(query)
  const url = `https://news.google.com/rss/search?q=${q}&hl=de&gl=DE&ceid=DE:de`

  const ac = new AbortController()
  const to = setTimeout(() => ac.abort(), 10000)

  try {
    const res = await fetch(url, { cache: "no-store", signal: ac.signal })
    clearTimeout(to)

    if (!res.ok) {
      throw new Error(`RSS-Feed nicht erreichbar (${res.status})`)
    }

    const xml = await res.text()

    // Simple RSS parsing without external dependencies
    const items = Array.from(xml.matchAll(/<item>([\s\S]*?)<\/item>/g)).map((m) => m[1])

    const articles: Article[] = items.slice(0, 12).map((itemXml) => {
      const get = (tag: string) => {
        const m = itemXml.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i"))
        return m ? decodeHtml(m[1]) : ""
      }

      const title = get("title")
      const link = get("link")
      const pubDate = get("pubDate")
      // Source is often in <source> tag or at the end of title
      const sourceMatch = itemXml.match(/<source[^>]*>([\s\S]*?)<\/source>/i)
      const source = sourceMatch ? decodeHtml(sourceMatch[1]) : ""

      // Description contains teaser text with HTML
      const snippet = get("description")

      return {
        title,
        link,
        source,
        date: pubDate ? new Date(pubDate).toISOString() : undefined,
        snippet,
      }
    })

    return articles
  } catch (error) {
    clearTimeout(to)
    console.error("Error fetching Google News RSS:", error)
    return []
  }
}

export default async function EntwicklungenPage() {
  const articles: Article[] = await fetchGoogleNewsRss("KI Künstliche Intelligenz Entwicklung Deutschland")

  return (
    <main className="min-h-screen bg-background">
      <BackNavigation />
      <div className="pt-1 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Aktuelle KI-Entwicklungen</h1>
            <p className="text-muted-foreground">
              Live-Updates zu den neuesten Fortschritten in der Künstlichen Intelligenz
            </p>
          </div>

          {articles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Keine aktuellen Artikel verfügbar. Bitte versuchen Sie es später erneut.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, index) => (
                <article key={article.link} className="bg-card rounded-lg border p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      LIVE
                    </span>
                    {article.date && (
                      <time className="text-xs text-muted-foreground">
                        {new Date(article.date).toLocaleDateString("de-DE", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </time>
                    )}
                  </div>

                  <h2 className="font-semibold text-lg mb-3 line-clamp-2">
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      {article.title}
                    </a>
                  </h2>

                  {article.snippet && (
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{article.snippet}</p>
                  )}

                  <div className="flex items-center justify-between">
                    {article.source && <span className="text-xs text-muted-foreground">{article.source}</span>}
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      Weiterlesen →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
