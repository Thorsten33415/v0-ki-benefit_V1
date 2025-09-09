import Link from "next/link"
import categories from "@/data/categories.json"

export const dynamic = "error"
export const revalidate = false

export default function KategorienPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Kategorien</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((c) => (
          <article
            key={c.slug}
            className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-3">
              <Link href={`/kategorien/${c.slug}/`} className="text-primary hover:underline">
                {c.title}
              </Link>
            </h2>
            <p className="text-muted-foreground mb-4">{c.description}</p>
            <p>
              <Link href={`/kategorien/${c.slug}/`} className="text-primary hover:underline">
                Mehr erfahren →
              </Link>
            </p>
          </article>
        ))}
      </div>
    </div>
  )
}
