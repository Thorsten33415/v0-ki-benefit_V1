import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export function BackNavigation() {
  return (
    <div className="relative top-2 left-0 z-50 mb-4 px-6">
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg shadow-sm hover:bg-white hover:shadow-md transition-all duration-200 text-gray-700 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="text-sm font-medium">Zurück zur Startseite</span>
      </Link>
    </div>
  )
}
