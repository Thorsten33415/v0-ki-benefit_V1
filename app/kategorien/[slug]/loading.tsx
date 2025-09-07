export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="h-8 bg-muted rounded-lg animate-pulse mb-2"></div>
          <div className="h-4 bg-muted/60 rounded w-1/2 animate-pulse"></div>
        </div>

        <div className="space-y-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-card border rounded-lg p-6">
              <div className="h-6 bg-muted rounded animate-pulse mb-3"></div>
              <div className="h-4 bg-muted/60 rounded w-1/3 animate-pulse mb-3"></div>
              <div className="space-y-2">
                <div className="h-4 bg-muted/40 rounded animate-pulse"></div>
                <div className="h-4 bg-muted/40 rounded w-3/4 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
