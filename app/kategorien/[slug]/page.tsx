import categories from "@/data/categories.json"
import Link from "next/link"

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return categories.map((c) => ({ slug: c.slug }))
}

export const dynamic = "error"
export const revalidate = false

export default function KategorieDetail({ params }: { params: Params }) {
  const item = categories.find((c) => c.slug === params.slug)
  if (!item) return <NotFoundContent />

  return (
    <div className="container mx-auto px-6 py-12">
      <p className="mb-6">
        <Link href="/kategorien/" className="text-primary hover:underline">
          ← Zurück zu Kategorien
        </Link>
      </p>
      <h1 className="text-4xl font-bold mb-4">{item.title}</h1>
      <p className="text-lg text-muted-foreground mb-8">{item.description}</p>

      <section className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-2xl font-semibold mb-4">Beispiele</h3>
        <p className="text-muted-foreground">Hier können Inhalte/Artikel für die Kategorie „{item.title}" stehen.</p>
        <p className="mt-4 text-muted-foreground">
          Diese Seite wird statisch generiert und kann direkt auf IONOS Webhosting deployed werden.
        </p>
      </section>
    </div>
  )
}

function NotFoundContent() {
  return (
    <div className="container mx-auto px-6 py-12 text-center">
      <h1 className="text-4xl font-bold mb-4">Nicht gefunden</h1>
      <p className="text-lg text-muted-foreground mb-6">Diese Kategorie existiert nicht.</p>
      <p>
        <Link href="/kategorien/" className="text-primary hover:underline">
          Zur Übersicht
        </Link>
      </p>
    </div>
  )
}
