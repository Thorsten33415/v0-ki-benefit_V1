document.addEventListener("DOMContentLoaded", () => {
  console.log("[v0] DOM loaded, initializing app...")

  // UI Elemente
  const appsListEl = document.getElementById("appsList")
  const emptyStateEl = document.getElementById("emptyState")
  const loadingBadgeEl = document.getElementById("loadingBadge")
  const updatedAtEl = document.getElementById("updatedAt")
  const reloadBtn = document.getElementById("reloadBtn")
  const filterCategoryEl = document.getElementById("filterCategory")
  const filterSectorEl = document.getElementById("filterSector")

  if (!appsListEl) {
    console.warn("[v0] appsList element not found, creating fallback")
    const main = document.querySelector("main")
    if (main) {
      const container = document.createElement("div")
      container.className = "container"
      container.innerHTML = `
        <div id="loadingBadge" class="loading-badge hidden">Lade Nachrichten...</div>
        <div id="updatedAt" class="updated-at">Bereit zum Laden</div>
        <button id="reloadBtn" class="reload-btn">Neu laden</button>
        <ul id="appsList" class="apps-list"></ul>
        <div id="emptyState" class="empty-state hidden">Keine Artikel gefunden</div>
      `
      main.appendChild(container)
    }
  }

  function createCategoryPageContent() {
    const main = document.querySelector("main")
    if (!main) return

    // Remove existing category content
    const existingCategory = document.getElementById("categoryContent")
    if (existingCategory) existingCategory.remove()

    // Create category content container
    const categoryContent = document.createElement("div")
    categoryContent.id = "categoryContent"
    categoryContent.className = "category-content hidden"
    categoryContent.innerHTML = `
      <div class="container">
        <div class="category-header">
          <h1 id="categoryTitle" class="category-title">Kategorie</h1>
          <p id="categoryDescription" class="category-description">Beschreibung der Kategorie</p>
        </div>
        <div class="category-controls">
          <div id="loadingBadge" class="loading-badge hidden">Lade Nachrichten...</div>
          <div id="updatedAt" class="updated-at">Bereit zum Laden</div>
          <button id="reloadBtn" class="reload-btn">Neu laden</button>
        </div>
        <div class="category-results">
          <ul id="appsList" class="apps-list"></ul>
          <div id="emptyState" class="empty-state hidden">Keine Artikel gefunden</div>
        </div>
      </div>
    `

    // Insert after hero section or at beginning of main
    const hero = main.querySelector(".hero")
    if (hero) {
      hero.after(categoryContent)
    } else {
      main.prepend(categoryContent)
    }

    return categoryContent
  }

  function showCategoryPage(categoryName, description) {
    const hero = document.querySelector(".hero")
    const sections = document.querySelector(".sections")
    const categoryContent = document.getElementById("categoryContent") || createCategoryPageContent()

    // Hide homepage content
    if (hero) hero.style.display = "none"
    if (sections) sections.style.display = "none"

    // Show category content
    categoryContent.classList.remove("hidden")

    // Update category info
    const titleEl = document.getElementById("categoryTitle")
    const descEl = document.getElementById("categoryDescription")
    if (titleEl) titleEl.textContent = categoryName
    if (descEl) descEl.textContent = description

    console.log("[v0] Showing category page:", categoryName)
  }

  function showHomePage() {
    const hero = document.querySelector(".hero")
    const sections = document.querySelector(".sections")
    const categoryContent = document.getElementById("categoryContent")

    // Show homepage content
    if (hero) hero.style.display = "block"
    if (sections) sections.style.display = "block"

    // Hide category content
    if (categoryContent) categoryContent.classList.add("hidden")

    console.log("[v0] Showing homepage")
  }

  let activeCategory = ""
  let dataReady = false
  let isFetching = false

  const NO_CACHE = { headers: { Accept: "application/json", "Cache-Control": "no-cache" }, cache: "no-store" }

  function sortByPublishedDesc(list) {
    return list.sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0))
  }

  function isFresh(iso, days = 30) {
    // Erweitert von 7 auf 30 Tage
    const d = new Date(iso || 0).getTime()
    if (!d) return false
    const daysDiff = (Date.now() - d) / (24 * 60 * 60 * 1000)
    console.log(`[v0] Date check: ${iso} -> ${daysDiff.toFixed(1)} days old (limit: ${days})`)
    return daysDiff <= days
  }

  // Declare variables before using them
  const latestApplications = [] // Placeholder for latest applications data
  const aiApplications = [] // Placeholder for AI applications data

  /**
   * Normalisiert statische Daten zu DynamicApplication:
   * - Erzwingt string-IDs
   * - Fügt isNew=false hinzu
   * @param {Array<Omit<DynamicApplication, "isNew">>} list
   * @returns {DynamicApplication[]}
   */
  function normalizeStatic(list) {
    return list.map((app) => ({
      ...app,
      id: String(app.id),
      isNew: false,
    }))
  }

  /**
   * Kombiniert neueste dynamische Einträge mit statischen.
   * @param {DynamicApplication[]} latest
   * @param {Array<Omit<DynamicApplication, "isNew">>} staticList
   * @returns {DynamicApplication[]}
   */
  function combine(latest, staticList) {
    const normalizedStatic = normalizeStatic(staticList)
    return [...(latest ?? []), ...normalizedStatic]
  }

  function setLoading(isLoading) {
    loadingBadgeEl.classList.toggle("hidden", !isLoading)
    reloadBtn.disabled = !!isLoading
  }

  function formatDate(d) {
    const dd = String(d.getDate()).padStart(2, "0")
    const mm = String(d.getMonth() + 1).padStart(2, "0")
    const yyyy = d.getFullYear()
    const hh = String(d.getHours()).padStart(2, "0")
    const min = String(d.getMinutes()).padStart(2, "0")
    return `${dd}.${mm}.${yyyy} ${hh}:${min} Uhr`
  }

  /** @type {DynamicApplication[]|null} */
  let allApplications = null
  /** @type {Date|null} */
  let lastUpdated = null

  const LIVE_SOURCES = ["spaceflight", "hackernews", "reddit"]

  const CORS_PROXY = "https://api.allorigins.win/raw?url="
  const BACKUP_PROXY = "https://corsproxy.io/?"

  // Enhanced fetch with CORS proxy fallback
  async function fetchWithFallback(url, options = {}) {
    const attempts = [
      { url, label: "Direct" },
      { url: CORS_PROXY + encodeURIComponent(url), label: "AllOrigins Proxy" },
      { url: BACKUP_PROXY + encodeURIComponent(url), label: "CorsProxy.io" },
    ]

    for (const attempt of attempts) {
      try {
        console.log(`[v0] Trying ${attempt.label}:`, attempt.url)
        const response = await fetch(attempt.url, options)

        if (response.ok) {
          console.log(`[v0] Success with ${attempt.label}`)
          return response
        }

        console.warn(`[v0] ${attempt.label} failed with status:`, response.status)
      } catch (error) {
        console.warn(`[v0] ${attempt.label} error:`, error.message)

        // Show user-friendly error for CORS issues
        if (error.message.includes("CORS") || error.message.includes("fetch")) {
          if (updatedAtEl) {
            updatedAtEl.textContent = `Netzwerk-Problem: Versuche Proxy-Server...`
            updatedAtEl.style.color = "#f59e0b"
          }
        }
      }
    }

    throw new Error("Alle Verbindungsversuche fehlgeschlagen")
  }

  async function loadData() {
    setLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 150))
      allApplications = combine(window.latestApplications || [], window.aiApplications || [])
      lastUpdated = new Date()
      updatedAtEl.textContent = `Aktualisiert: ${formatDate(lastUpdated)}`
    } catch (e) {
      console.error(e)
      allApplications = combine([], window.aiApplications || [])
      lastUpdated = new Date()
      updatedAtEl.textContent = `Aktualisiert (Fallback): ${formatDate(lastUpdated)}`
    } finally {
      dataReady = true
      setLoading(false)
      render()
    }
  }

  async function fetchFromSpaceflight(q) {
    const search = q ? `&search=${encodeURIComponent(q)}` : ""
    const url = `https://api.spaceflightnewsapi.net/v4/articles/?limit=30&ordering=-published_at${search}`

    console.log("[v0] Fetching from Spaceflight:", url)

    try {
      const res = await fetchWithFallback(url, NO_CACHE)
      console.log("[v0] Spaceflight response status:", res.status)

      if (!res.ok) throw new Error(`spaceflight ${res.status}: ${res.statusText}`)

      const data = await res.json()
      console.log("[v0] Spaceflight data received:", data?.results?.length || 0, "articles")

      const items = Array.isArray(data?.results) ? data.results : []
      const mapped = items.map((it) => ({
        title: it.title || "",
        category: q || "live",
        sector: it.news_site || "",
        description: it.summary || "",
        link: it.url || "#",
        iconName: "news",
        isNew: true,
        publishedAt: it.published_at,
      }))
      return sortByPublishedDesc(mapped)
    } catch (error) {
      console.error("[v0] Spaceflight API Error:", error.message)
      if (updatedAtEl) {
        updatedAtEl.textContent = `Spaceflight API-Fehler: ${error.message}`
        updatedAtEl.style.color = "#ef4444"
      }
      throw error
    }
  }

  async function fetchFromHackerNews(q) {
    const url = `https://hn.algolia.com/api/v1/search_by_date?hitsPerPage=30&tags=story${q ? `&query=${encodeURIComponent(q)}` : ""}`

    console.log("[v0] Fetching from Hacker News:", url)

    try {
      const res = await fetchWithFallback(url, NO_CACHE)
      console.log("[v0] Hacker News response status:", res.status)

      if (!res.ok) throw new Error(`hackernews ${res.status}: ${res.statusText}`)

      const data = await res.json()
      console.log("[v0] Hacker News data received:", data?.hits?.length || 0, "articles")

      const items = Array.isArray(data?.hits) ? data.hits : []
      const mapped = items.map((it) => ({
        title: it.title || it.story_title || "",
        category: q || "hackernews",
        sector: it.author || "HN",
        description: it.story_text || "",
        link: it.url || it.story_url || "#",
        iconName: "news",
        isNew: true,
        publishedAt: it.created_at,
      }))
      return sortByPublishedDesc(mapped)
    } catch (error) {
      console.error("[v0] Hacker News API Error:", error.message)
      if (updatedAtEl) {
        updatedAtEl.textContent = `Hacker News API-Fehler: ${error.message}`
        updatedAtEl.style.color = "#ef4444"
      }
      throw error
    }
  }

  async function fetchFromReddit(q) {
    const sub = q && /^[a-z0-9_]+$/i.test(q) ? q : "news"
    const url = `https://www.reddit.com/r/${sub}/new.json?limit=30`

    console.log("[v0] Fetching from Reddit:", url)

    try {
      const headers = {
        Accept: "application/json",
        "Cache-Control": "no-cache",
        "User-Agent": "KI-Benefits/1.0 (https://ki-benefits.de)",
      }

      const res = await fetchWithFallback(url, { ...NO_CACHE, headers })
      console.log("[v0] Reddit response status:", res.status)

      if (!res.ok) throw new Error(`reddit ${res.status}: ${res.statusText}`)

      const data = await res.json()
      console.log("[v0] Reddit data received:", data?.data?.children?.length || 0, "articles")

      const items = Array.isArray(data?.data?.children) ? data.data.children : []
      const mapped = items.map(({ data: d }) => ({
        title: d.title || "",
        category: sub,
        sector: d.subreddit || "Reddit",
        description: d.selftext || "",
        link: d.url || "#",
        iconName: "news",
        isNew: true,
        publishedAt: d.created_utc ? new Date(d.created_utc * 1000).toISOString() : null,
      }))
      return sortByPublishedDesc(mapped)
    } catch (error) {
      console.error("[v0] Reddit API Error:", error.message)
      if (updatedAtEl) {
        updatedAtEl.textContent = `Reddit API-Fehler: ${error.message}`
        updatedAtEl.style.color = "#ef4444"
      }
      throw error
    }
  }

  async function fetchLiveAggregated(categorySlug) {
    if (isFetching) return
    isFetching = true
    setLoading(true)

    console.log("[v0] Starting live data fetch for category:", categorySlug)
    console.log("[v0] Current time:", new Date().toISOString())
    console.log("[v0] Expected fresh date cutoff:", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())

    try {
      let results = []
      let successfulSource = null
      const allResults = [] // Sammle alle Ergebnisse für Debugging

      for (const src of LIVE_SOURCES) {
        console.log(`[v0] Trying source: ${src}`)
        try {
          let r = []
          if (src === "spaceflight") r = await fetchFromSpaceflight(categorySlug)
          else if (src === "hackernews") r = await fetchFromHackerNews(categorySlug)
          else if (src === "reddit") r = await fetchFromReddit(categorySlug)

          console.log(`[v0] ${src} returned ${r.length} articles`)

          r.slice(0, 3).forEach((article, i) => {
            console.log(`[v0] ${src} article ${i + 1}: "${article.title}" - ${article.publishedAt}`)
          })

          allResults.push(...r) // Sammle alle für Fallback

          const freshArticles = r.filter((it) => isFresh(it.publishedAt, 30))
          console.log(`[v0] ${src} after freshness filter: ${freshArticles.length} articles`)

          if (freshArticles.length) {
            results = freshArticles
            successfulSource = src
            console.log(`[v0] Using results from: ${src}`)
            break
          }
        } catch (e) {
          console.error(`[v0] Source ${src} failed:`, e.message)
          continue
        }
      }

      if (results.length) {
        allApplications = sortByPublishedDesc(results)
        dataReady = true
        lastUpdated = new Date()
        updatedAtEl.textContent = `Aktualisiert: ${formatDate(lastUpdated)} (${successfulSource})`
        console.log(`[v0] Successfully loaded ${results.length} articles from ${successfulSource}`)
      } else {
        console.warn("[v0] Keine frischen Artikel gefunden, verwende alle verfügbaren")
        if (allResults.length > 0) {
          allApplications = sortByPublishedDesc(allResults)
          dataReady = true
          lastUpdated = new Date()
          updatedAtEl.textContent = `Aktualisiert: ${formatDate(lastUpdated)} (alle verfügbaren)`
          updatedAtEl.style.color = "#f59e0b"
          console.log(`[v0] Using ${allResults.length} articles without date filter`)
        } else {
          console.warn("[v0] Keine Live-Ergebnisse, nutze lokale Fallback-Daten")
          if (updatedAtEl) {
            updatedAtEl.textContent = "Keine Nachrichten verfügbar - verwende lokale Daten"
            updatedAtEl.style.color = "#ef4444"
          }
          if (!Array.isArray(allApplications) || !allApplications.length) {
            if (typeof loadData === "function") loadData()
          }
        }
      }
    } finally {
      isFetching = false
      setLoading(false)
      render()
    }
  }

  function render() {
    const ul = document.getElementById("appsList")
    const empty = document.getElementById("emptyState")
    if (!ul) return

    ul.innerHTML = ""

    let list = dataReady && Array.isArray(allApplications) ? allApplications.slice() : []

    if (activeCategory) {
      const cat = activeCategory.toLowerCase()
      list = list.filter((it) =>
        String(it.category || "")
          .toLowerCase()
          .includes(cat),
      )
    }

    // UI-Filter NACH der Route anwenden
    const catText = (filterCategoryEl?.value || "").trim().toLowerCase()
    if (catText) {
      list = list.filter((it) =>
        String(it.category || "")
          .toLowerCase()
          .includes(catText),
      )
    }

    const sectorVal = (filterSectorEl?.value || "").trim()
    if (sectorVal) {
      list = list.filter((it) => String(it.sector || "") === sectorVal)
    }

    if (!list.length) {
      if (empty) empty.classList.remove("hidden")
      return
    }
    if (empty) empty.classList.add("hidden")

    const frag = document.createDocumentFragment()
    for (const app of list) {
      const li = document.createElement("li")
      li.className = "card"
      li.innerHTML = `
        <div class="top">
          <div class="iconwrap"><img src="${getIconSrc(app.iconName)}" alt=""></div>
          <div>
            <p class="title">${app.title}</p>
            <div class="meta">
              <span class="chip">${app.category}</span>
              <span class="chip small">${app.sector}</span>
              ${app.isNew ? '<span class="new">Neu</span>' : ""}
            </div>
          </div>
        </div>
        <p class="small">${app.description || ""}</p>
        <a class="link" href="${app.link}" target="_blank" rel="noopener">Zur Quelle</a>
      `
      frag.appendChild(li)
    }
    ul.appendChild(frag)
  }

  // Declare getIconSrc function before using it
  function getIconSrc(iconName) {
    // Placeholder for icon source logic
    return `icons/${iconName}.png`
  }

  function onRouteRoot() {
    activeCategory = ""
    showHomePage()
    fetchLiveAggregated("")
  }

  function onRouteCategory({ slug }) {
    activeCategory = (slug || "").trim()
    const categoryInfo = getCategoryInfo(activeCategory)
    showCategoryPage(categoryInfo.name, categoryInfo.description)
    fetchLiveAggregated(activeCategory)
  }

  function onHashRoute(routeName) {
    console.log(`[v0] Hash route: ${routeName}`)
    activeCategory = routeName
    const categoryInfo = getCategoryInfo(routeName)
    showCategoryPage(categoryInfo.name, categoryInfo.description)
    fetchLiveAggregated(routeName)
  }

  function getCategoryInfo(slug) {
    const categories = {
      entwicklungen: {
        name: "KI-Entwicklungen",
        description: "Neueste Fortschritte und Trends in der KI-Forschung",
      },
      anwendungen: {
        name: "KI-Anwendungen",
        description: "Praktische Einsatzgebiete in Industrie und Alltag",
      },
      grundlagen: {
        name: "KI-Grundlagen",
        description: "Wichtige Begriffe und Konzepte einfach erklärt",
      },
      tools: {
        name: "KI-Tools",
        description: "Benutzerfreundliche Tools zum Ausprobieren",
      },
      "chancen-risiken": {
        name: "Chancen & Risiken",
        description: "Ausgewogene Betrachtung von Vor- und Nachteilen",
      },
      faq: {
        name: "FAQ",
        description: "Antworten auf häufig gestellte Fragen",
      },
      impressum: {
        name: "Impressum",
        description: "Rechtliche Informationen",
      },
    }

    return categories[slug] || { name: slug, description: "Kategorie-Informationen" }
  }

  if (window.AppRouter?.add) {
    console.log("[v0] Setting up router routes...")

    // Legacy routes for backward compatibility
    window.AppRouter.add("/", onRouteRoot)
    window.AppRouter.add("/category/:slug", onRouteCategory)

    // New hash-based routes for IONOS
    window.AppRouter.add("/entwicklungen", () => onHashRoute("entwicklungen"))
    window.AppRouter.add("/anwendungen", () => onHashRoute("anwendungen"))
    window.AppRouter.add("/grundlagen", () => onHashRoute("grundlagen"))
    window.AppRouter.add("/tools", () => onHashRoute("tools"))
    window.AppRouter.add("/chancen-risiken", () => onHashRoute("chancen-risiken"))
    window.AppRouter.add("/faq", () => onHashRoute("faq"))
    window.AppRouter.add("/impressum", () => onHashRoute("impressum"))

    console.log("[v0] Starting router...")
    window.AppRouter.start()
  } else {
    console.error("[v0] AppRouter not available!")
  }

  if (reloadBtn) {
    reloadBtn.addEventListener("click", loadData)
  }
  if (filterCategoryEl) {
    filterCategoryEl.addEventListener("input", render)
  }
  if (filterSectorEl) {
    filterSectorEl.addEventListener("change", render)
  }

  // Initial load
  if (typeof loadData === "function") {
    console.log("[v0] Starting initial data load...")
    loadData()
  }
})
