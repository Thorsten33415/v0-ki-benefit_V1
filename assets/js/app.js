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

const NO_CACHE = { headers: { Accept: "application/json", "Cache-Control": "no-cache" }, cache: "no-store" }

function sortByPublishedDesc(list) {
  return list.sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0))
}

function isFresh(iso, days = 7) {
  const d = new Date(iso || 0).getTime()
  if (!d) return false
  return Date.now() - d <= days * 24 * 60 * 60 * 1000
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
  const res = await fetch(url, NO_CACHE)
  if (!res.ok) throw new Error("spaceflight " + res.status)
  const data = await res.json()
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
}

async function fetchFromHackerNews(q) {
  const url = `https://hn.algolia.com/api/v1/search_by_date?hitsPerPage=30&tags=story${q ? `&query=${encodeURIComponent(q)}` : ""}`
  const res = await fetch(url, NO_CACHE)
  if (!res.ok) throw new Error("hn " + res.status)
  const data = await res.json()
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
}

async function fetchFromReddit(q) {
  const sub = q && /^[a-z0-9_]+$/i.test(q) ? q : "news"
  const url = `https://www.reddit.com/r/${sub}/new.json?limit=30`
  const res = await fetch(url, { ...NO_CACHE, headers: { Accept: "application/json", "User-Agent": "app/1.0" } })
  if (!res.ok) throw new Error("reddit " + res.status)
  const data = await res.json()
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

async function fetchLiveAggregated(categorySlug) {
  if (isFetching) return
  isFetching = true
  setLoading(true)

  console.log("Now:", new Date().toISOString())

  try {
    let results = []
    for (const src of LIVE_SOURCES) {
      try {
        let r = []
        if (src === "spaceflight") r = await fetchFromSpaceflight(categorySlug)
        else if (src === "hackernews") r = await fetchFromHackerNews(categorySlug)
        else if (src === "reddit") r = await fetchFromReddit(categorySlug)

        r = r.filter((it) => isFresh(it.publishedAt, 7))
        if (r.length) {
          results = r
          break
        }
      } catch (e) {
        console.warn("source failed:", src, e?.message)
      }
    }

    if (results.length) {
      allApplications = sortByPublishedDesc(results)
      dataReady = true
      lastUpdated = new Date()
      updatedAtEl.textContent = `Aktualisiert: ${formatDate(lastUpdated)}`
    } else {
      console.warn("Keine frischen Live-Ergebnisse, nutze Fallback-Daten")
      if (!Array.isArray(allApplications) || !allApplications.length) {
        if (typeof loadData === "function") loadData()
      }
    }
  } finally {
    isFetching = false
    setLoading(false)
    render()
  }
}

function onRouteRoot() {
  activeCategory = ""
  fetchLiveAggregated("")
}

function onRouteCategory({ slug }) {
  activeCategory = (slug || "").trim()
  fetchLiveAggregated(activeCategory)
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
