export const dynamic = "force-dynamic"
export const revalidate = 0
export const runtime = "nodejs"

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
    .replace(/<[^>]*>/g, "")
    .trim()
}

async function fetchGoogleNewsRss(query: string): Promise<Article[]> {
  const q = encodeURIComponent(query)
  const url = `https://news.google.com/rss/search?q=${q}&hl=de&gl=DE&ceid=DE:de`

  const ac = new AbortController()
  const to = setTimeout(() => ac.abort(), 10000)
  const res = await fetch(url, { cache: "no-store", signal: ac.signal })
  clearTimeout(to)

  if (!res.ok) throw new Error(`RSS-Feed nicht erreichbar (${res.status})`)

  const xml = await res.text()
  const items = Array.from(xml.matchAll(/<item>([\s\S]*?)<\/item>/g)).map((m) => m[1])

  return items.slice(0, 12).map((itemXml) => {
    const get = (tag: string) => {
      const m = itemXml.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i"))
      return m ? decodeHtml(m[1]) : ""
    }
    const title = get("title")
    const link = get("link")
    const pubDate = get("pubDate")
    const sourceMatch = itemXml.match(/<source[^>]*>([\s\S]*?)<\/source>/i)
    const source = sourceMatch ? decodeHtml(sourceMatch[1]) : ""
    const snippet = get("description")

    return {
      title,
      link,
      source,
      date: pubDate ? new Date(pubDate).toISOString() : undefined,
      snippet,
    }
  })
}

import { slugToQuery } from "@/lib/slug"

export default async function Page({ params }: { params: { slug: string } }) {
  const query = slugToQuery(params.slug)

  let articles: Article[] = []
  let error: string | null = null

  try {
    articles = await fetchGoogleNewsRss(query)
  } catch (e: any) {
    error = e?.message || "Unbekannter Fehler"
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Neueste Nachrichten zu "{query}"</h1>
          <p className="text-muted-foreground">Live-Updates aus deutschen Nachrichtenquellen</p>
        </div>

        {error ? (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-destructive mb-2">Fehler beim Laden</h2>
            <p className="text-destructive/80">{error}</p>
            <p className="text-sm text-muted-foreground mt-2">Bitte versuchen Sie es später erneut.</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="bg-muted/50 border rounded-lg p-6 text-center">
            <p className="text-muted-foreground">Keine aktuellen Artikel zu diesem Thema gefunden.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {articles.map((article, index) => (
              <article
                key={article.link || index}
                className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <h2 className="text-xl font-semibold mb-3">
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    {article.title}
                  </a>
                </h2>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  {article.date && (
                    <time dateTime={article.date}>
                      {new Date(article.date).toLocaleString("de-DE", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </time>
                  )}
                  {article.source && (
                    <>
                      <span>•</span>
                      <span>{article.source}</span>
                    </>
                  )}
                </div>

                {article.snippet && <p className="text-muted-foreground leading-relaxed">{article.snippet}</p>}
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
