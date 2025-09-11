console.log("[v0] Simple router loading...")

// Einfacher Router ohne komplexe Klassen
function initSimpleRouter() {
  console.log("[v0] Initializing simple router")

  // Funktion zum Anzeigen einer Kategorie-Seite
  function showCategoryPage(categorySlug) {
    console.log("[v0] Showing category page for:", categorySlug)

    // Verstecke die Hauptseite
    const mainContent = document.querySelector("main")
    if (mainContent) {
      mainContent.style.display = "none"
    }

    // Erstelle oder zeige die Kategorie-Seite
    let categoryPage = document.getElementById("category-page")
    if (!categoryPage) {
      categoryPage = document.createElement("div")
      categoryPage.id = "category-page"
      categoryPage.className = "category-page"
      document.body.appendChild(categoryPage)
    }

    // Kategorie-Daten
    const categories = {
      entwicklungen: {
        title: "KI-Entwicklungen",
        description: "Neueste Fortschritte und Trends in der KI-Forschung",
      },
      anwendungen: {
        title: "KI-Anwendungen",
        description: "Praktische Einsatzgebiete in Industrie und Alltag",
      },
      grundlagen: {
        title: "KI-Grundlagen",
        description: "Wichtige Begriffe und Konzepte einfach erklärt",
      },
      tools: {
        title: "KI-Tools",
        description: "Benutzerfreundliche Tools zum Ausprobieren",
      },
      "chancen-risiken": {
        title: "Chancen & Risiken",
        description: "Ausgewogene Betrachtung von Vor- und Nachteilen",
      },
      faq: {
        title: "FAQ",
        description: "Antworten auf häufig gestellte Fragen",
      },
      impressum: {
        title: "Impressum",
        description: "Rechtliche Informationen",
      },
    }

    const category = categories[categorySlug] || { title: "Unbekannte Kategorie", description: "" }

    // Seiten-Inhalt erstellen
    categoryPage.innerHTML = `
            <div class="category-container">
                <div class="category-header">
                    <button onclick="window.goHome()" class="back-button">← Zurück zur Startseite</button>
                    <h1 class="category-title">${category.title}</h1>
                    <p class="category-description">${category.description}</p>
                </div>
                <div class="category-content">
                    <div class="loading-message">
                        <p>Lade aktuelle Inhalte für ${category.title}...</p>
                        <div class="loading-spinner"></div>
                    </div>
                </div>
            </div>
        `

    categoryPage.style.display = "block"

    // Lade Inhalte für diese Kategorie
    loadCategoryContent(categorySlug)
  }

  // Funktion zum Zurückkehren zur Startseite
  window.goHome = () => {
    console.log("[v0] Going back to home")
    const mainContent = document.querySelector("main")
    const categoryPage = document.getElementById("category-page")

    if (mainContent) mainContent.style.display = "block"
    if (categoryPage) categoryPage.style.display = "none"

    window.location.hash = ""
  }

  // Funktion zum Laden von Kategorie-Inhalten
  function loadCategoryContent(categorySlug) {
    console.log("[v0] Loading content for category:", categorySlug)

    const categoryPage = document.getElementById("category-page")
    const contentDiv = categoryPage.querySelector(".category-content")

    // Simuliere das Laden von Inhalten
    setTimeout(() => {
      contentDiv.innerHTML = `
                <div class="articles-grid">
                    <div class="article-card">
                        <h3>Beispiel-Artikel für ${categorySlug}</h3>
                        <p>Dies ist ein Beispiel-Artikel für die Kategorie ${categorySlug}. Hier würden normalerweise aktuelle Inhalte aus den APIs geladen werden.</p>
                        <div class="article-meta">
                            <span class="article-date">Heute</span>
                            <span class="article-source">Beispiel-Quelle</span>
                        </div>
                    </div>
                    <div class="article-card">
                        <h3>Weiterer Artikel</h3>
                        <p>Ein weiterer Beispiel-Artikel mit relevanten Informationen zu ${categorySlug}.</p>
                        <div class="article-meta">
                            <span class="article-date">Gestern</span>
                            <span class="article-source">Weitere Quelle</span>
                        </div>
                    </div>
                </div>
            `
    }, 1000)
  }

  // Hash-Änderungen überwachen
  function handleHashChange() {
    const hash = window.location.hash.slice(1) // Entferne #
    console.log("[v0] Hash changed to:", hash)

    if (hash.startsWith("/")) {
      const path = hash.slice(1) // Entferne /
      console.log("[v0] Navigating to path:", path)
      showCategoryPage(path)
    } else if (hash === "" || hash === "/") {
      window.goHome()
    }
  }

  // Event-Listener hinzufügen
  window.addEventListener("hashchange", handleHashChange)
  window.addEventListener("load", handleHashChange)

  console.log("[v0] Simple router initialized")
}

// Router initialisieren, wenn DOM bereit ist
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSimpleRouter)
} else {
  initSimpleRouter()
}
