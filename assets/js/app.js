// UI Elemente
const appsListEl = document.getElementById("appsList")
const emptyStateEl = document.getElementById("emptyState")
const loadingBadgeEl = document.getElementById("loadingBadge")
const updatedAtEl = document.getElementById("updatedAt")
const reloadBtn = document.getElementById("reloadBtn")
const filterCategoryEl = document.getElementById("filterCategory")
const filterSectorEl = document.getElementById("filterSector")

let activeCategory = ""
let dataReady = false
let isFetching = false

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

const GNEWS_API_KEY = "<DEIN_GNEWS_KEY>"
const NEWSAPI_KEY = "<DEIN_NEWSAPI_KEY>"

const LIVE_SOURCES = ["gnews", "newsapi", "spaceflight", "hackernews", "reddit"]

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

async function fetchFromGNews(q) {
  if (!GNEWS_API_KEY) throw new Error("Missing GNEWS_API_KEY")
  const params = new URLSearchParams({
    q: q || "news",
    lang: "de",
    max: "30",
    sortby: "publishedAt",
    token: GNEWS_API_KEY,
  })
  const url = `https://gnews.io/api/v4/search?${params.toString()}`
  const res = await fetch(url, { headers: { Accept: "application/json" } })
  if (!res.ok) throw new Error("gnews " + res.status)
  const data = await res.json()
  const items = Array.isArray(data?.articles) ? data.articles : []
  return items.map((it) => ({
    title: it.title || "",
    category: q || "gnews",
    sector: it.source?.name || "GNews",
    description: it.description || "",
    link: it.url || "#",
    iconName: "news",
    isNew: true,
    publishedAt: it.publishedAt,
  }))
}

async function fetchFromNewsAPI(q) {
  if (!NEWSAPI_KEY) throw new Error("Missing NEWSAPI_KEY")
  const params = new URLSearchParams({
    q: q || "news",
    language: "de",
    pageSize: "30",
    sortBy: "publishedAt",
    apiKey: NEWSAPI_KEY,
  })
  const url = `https://newsapi.org/v2/everything?${params.toString()}`
  const res = await fetch(url, { headers: { Accept: "application/json" } })
  if (!res.ok) throw new Error("newsapi " + res.status)
  const data = await res.json()
  const items = Array.isArray(data?.articles) ? data.articles : []
  return items.map((it) => ({
    title: it.title || "",
    category: q || "newsapi",
    sector: it.source?.name || "NewsAPI",
    description: it.description || "",
    link: it.url || "#",
    iconName: "news",
    isNew: true,
    publishedAt: it.publishedAt,
  }))
}

async function fetchFromSpaceflight(categorySlug) {
  const search = categorySlug ? `&search=${encodeURIComponent(categorySlug)}` : ""
  const url = `https://api.spaceflightnewsapi.net/v4/articles/?limit=30&ordering=-published_at${search}`
  const res = await fetch(url, { headers: { Accept: "application/json" } })
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`)
  const data = await res.json()
  const items = Array.isArray(data?.results) ? data.results : []
  return items.map((it) => ({
    title: it.title || "",
    category: categorySlug || "spaceflight",
    sector: it.news_site || "",
    description: it.summary || "",
    link: it.url || "#",
    iconName: "news",
    isNew: true,
    publishedAt: it.published_at,
  }))
}

async function fetchFromHackerNews(categorySlug) {
  // Placeholder implementation
  return []
}

async function fetchFromReddit(categorySlug) {
  // Placeholder implementation
  return []
}

function render() {
  const ul = document.getElementById("appsList")
  const empty = document.getElementById("emptyState")
  if (!ul) return

  ul.innerHTML = ""

  if (!dataReady) {
    if (empty) empty.classList.add("hidden")
    return
  }

  let list = Array.isArray(allApplications) ? allApplications.slice() : []

  // 1.) Route-Kategorie strikt anwenden
  if (activeCategory) {
    const cat = activeCategory.toLowerCase()
    list = list.filter((it) => String(it.category || "").toLowerCase() === cat)
  }

  // 2.) UI-Filter NACH der Route anwenden (nicht überschreiben)
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

async function fetchLiveAggregated(categorySlug) {
  if (isFetching) return
  isFetching = true
  setLoading(true)
  try {
    let results = []
    for (const src of LIVE_SOURCES) {
      try {
        if (src === "gnews") results = await fetchFromGNews(categorySlug)
        else if (src === "newsapi") results = await fetchFromNewsAPI(categorySlug)
        else if (src === "spaceflight") results = await fetchFromSpaceflight(categorySlug)
        else if (src === "hackernews") results = await fetchFromHackerNews(categorySlug)
        else if (src === "reddit") results = await fetchFromReddit(categorySlug)
        if (results.length) break
      } catch (e) {
        console.warn("source failed:", src, e?.message)
      }
    }
    if (results.length) {
      results.sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0))
      allApplications = results
      dataReady = true
      lastUpdated = new Date()
      updatedAtEl.textContent = `Aktualisiert: ${formatDate(lastUpdated)}`
    }
  } finally {
    isFetching = false
    setLoading(false)
    render()
  }
}

function onRouteRoot() {
  activeCategory = ""
  fetchLiveAggregated("") // Startseite: aktuelle Artikel
}

function onRouteCategory({ slug }) {
  activeCategory = slug || ""
  fetchLiveAggregated(activeCategory) // Rubriksuche: live nach Stichwort
}

reloadBtn.addEventListener("click", loadData)
filterCategoryEl?.addEventListener("input", render)
filterSectorEl?.addEventListener("change", render)

if (window.AppRouter?.add) {
  window.AppRouter.add("/", onRouteRoot)
  window.AppRouter.add("/category/:slug", onRouteCategory)
  window.AppRouter.start()
}

if (typeof loadData === "function") loadData()
