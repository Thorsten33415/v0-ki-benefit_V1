import Link from "next/link"

export default function NotFound() {
  return (
    <div className="container mx-auto px-6 py-12 text-center">
      <h1 className="text-4xl font-bold mb-4">Seite nicht gefunden</h1>
      <p className="text-lg text-muted-foreground mb-6">Die angeforderte Seite existiert nicht.</p>
      <p>
        <Link href="/" className="text-primary hover:underline">
          Zur Startseite
        </Link>
      </p>
    </div>
  )
}
