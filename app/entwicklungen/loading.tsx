export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      <div className="pt-1 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="h-8 bg-muted rounded w-64 mb-2 animate-pulse"></div>
            <div className="h-4 bg-muted rounded w-96 animate-pulse"></div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-card rounded-lg border p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="h-5 bg-muted rounded w-12 animate-pulse"></div>
                  <div className="h-4 bg-muted rounded w-20 animate-pulse"></div>
                </div>
                <div className="h-6 bg-muted rounded w-full mb-2 animate-pulse"></div>
                <div className="h-6 bg-muted rounded w-3/4 mb-4 animate-pulse"></div>
                <div className="h-4 bg-muted rounded w-full mb-2 animate-pulse"></div>
                <div className="h-4 bg-muted rounded w-2/3 mb-4 animate-pulse"></div>
                <div className="flex items-center justify-between">
                  <div className="h-3 bg-muted rounded w-16 animate-pulse"></div>
                  <div className="h-4 bg-muted rounded w-20 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
