"use client"
import { Sparkles, Brain, Zap, Network } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[80vh] flex items-center">
      <div className="absolute inset-0 -z-10">
        {/* AI Background Image */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%236366f1' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='50' cy='10' r='1'/%3E%3Ccircle cx='10' cy='50' r='1'/%3E%3Ccircle cx='50' cy='50' r='1'/%3E%3Cpath d='M30 28v4M28 30h4M10 8v4M8 10h4M50 8v4M48 10h4M10 48v4M8 50h4M50 48v4M48 50h4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Animated floating elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Brain className="w-8 h-8 text-primary" />
          </div>
        </div>
        <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: "1s" }}>
          <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Network className="w-6 h-6 text-secondary" />
          </div>
        </div>
        <div className="absolute bottom-32 left-20 animate-float" style={{ animationDelay: "2s" }}>
          <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Zap className="w-7 h-7 text-accent" />
          </div>
        </div>

        {/* Large gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-foreground mb-8 shadow-lg">
            <Sparkles className="mr-2 h-5 w-5 text-primary animate-pulse" aria-hidden="true" />
            Aktuelle KI-Insights, Trends und Entwicklungen
          </div>

          <h1 className="font-sans text-4xl font-black tracking-tight text-foreground sm:text-7xl lg:text-8xl mb-8 leading-tight">
            Die Zukunft der{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Künstlichen Intelligenz
            </span>{" "}
            verstehen
          </h1>

          <p className="mx-auto max-w-3xl text-lg leading-8 text-muted-foreground mb-12 font-medium">
            Entdecken Sie die neuesten KI-Entwicklungen und praktische Anwendungen im privaten und industriellen
            Bereich. Bleiben Sie informiert über Innovationen, die unsere Welt verändern.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-primary rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-primary/90">
              <span className="relative z-10">KI entdecken</span>
            </button>
            <button className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-foreground bg-card/50 backdrop-blur-sm border border-border rounded-xl hover:bg-card/80 transition-all duration-300 hover:scale-105">
              Mehr erfahren
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
