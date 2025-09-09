import Link from "next/link"
import { toSlug } from "@/lib/slug"

const categories = ["KI Entwicklungen", "KI Anwendungen", "KI Tools", "KI Grundlagen", "Chancen & Risiken", "FAQ"]

export function CategoryNavigation() {
  return (
    <nav className="flex flex-wrap gap-4 justify-center">
      {categories.map((category) => {
        const slug = toSlug(category)
        return (
          <Link
            key={slug}
            href={`/kategorien/${slug}`}
            className="px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors text-sm font-medium"
          >
            {category}
          </Link>
        )
      })}
    </nav>
  )
}
