/**
 * Minimaler Hash-Router für IONOS-Kompatibilität
 * Behandelt Routen wie #/entwicklungen, #/anwendungen etc.
 */

class SimpleHashRouter {
  constructor() {
    this.routes = new Map()
    this.currentRoute = null
    this.init()
  }

  init() {
    // Hash-Änderungen überwachen
    window.addEventListener("hashchange", () => this.handleRoute())
    window.addEventListener("load", () => this.handleRoute())
  }

  add(pattern, handler) {
    this.routes.set(pattern, handler)
  }

  handleRoute() {
    const hash = window.location.hash.slice(1) || "/" // Entferne #
    console.log("[v0] Router: Navigating to", hash)
    console.log("[v0] Router: Available routes:", Array.from(this.routes.keys()))

    // Versuche exakte Übereinstimmung
    if (this.routes.has(hash)) {
      this.currentRoute = hash
      console.log("[v0] Router: Found exact match for", hash)
      this.routes.get(hash)()
      return
    }

    // Versuche Muster-Übereinstimmung für /category/:slug
    for (const [pattern, handler] of this.routes) {
      const match = this.matchRoute(pattern, hash)
      if (match) {
        this.currentRoute = hash
        console.log("[v0] Router: Found pattern match", pattern, "for", hash, "with params", match.params)
        handler(match.params)
        return
      }
    }

    // Fallback zur Startseite
    console.log("[v0] Router: No route found for", hash, "redirecting to home")
    if (hash !== "/") {
      console.log("[v0] Router: Unknown route, staying on current page")
    }
  }

  matchRoute(pattern, path) {
    // Einfache Muster-Übereinstimmung für :param
    const patternParts = pattern.split("/")
    const pathParts = path.split("/")

    if (patternParts.length !== pathParts.length) return null

    const params = {}
    for (let i = 0; i < patternParts.length; i++) {
      const patternPart = patternParts[i]
      const pathPart = pathParts[i]

      if (patternPart.startsWith(":")) {
        // Parameter extrahieren
        const paramName = patternPart.slice(1)
        params[paramName] = pathPart
      } else if (patternPart !== pathPart) {
        return null
      }
    }

    return { params }
  }

  navigate(path) {
    window.location.hash = path
  }

  start() {
    this.handleRoute()
  }
}

// Globaler Router
window.AppRouter = new SimpleHashRouter()
