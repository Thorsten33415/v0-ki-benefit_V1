"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-destructive mb-4">Fehler beim Laden der Nachrichten</h1>
          <p className="text-destructive/80 mb-6">{error.message || "Ein unerwarteter Fehler ist aufgetreten."}</p>
          <button
            onClick={reset}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Erneut versuchen
          </button>
        </div>
      </div>
    </main>
  )
}
