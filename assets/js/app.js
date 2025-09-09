// UI Elemente
const appsListEl = document.getElementById("appsList")
const emptyStateEl = document.getElementById("emptyState")
const loadingBadgeEl = document.getElementById("loadingBadge")
const updatedAtEl = document.getElementById("updatedAt")
const reloadBtn = document.getElementById("reloadBtn")
const filterCategoryEl = document.getElementById("filterCategory")
const filterSectorEl = document.getElementById("filterSector")

let activeCategory = ""

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

async function loadDynamicContent() {
  setLoading(true)
  try {
    // Simulierter Delay
    await new Promise((r) => setTimeout(r, 600))

    const combined = combine(latestApplications, aiApplications)
    allApplications = combined
    lastUpdated = new Date()
    updatedAtEl.textContent = `Aktualisiert: ${formatDate(lastUpdated)}`
  } catch (err) {
    console.error("Failed to load dynamic content:", err)
    // Fallback nur aus statischen Daten
    allApplications = normalizeStatic(aiApplications)
    lastUpdated = new Date()
    updatedAtEl.textContent = `Aktualisiert (Fallback): ${formatDate(lastUpdated)}`
  } finally {
    setLoading(false)
    render()
  }
}

function applyFilters(list) {
  let filtered = list

  // Kategorie aus Route anwenden
  if (activeCategory) {
    const cat = activeCategory.toLowerCase()
    filtered = filtered.filter((item) => String(item.category || "").toLowerCase() === cat)
  }

  // Optionale bestehende UI-Filter
  const cat = (filterCategoryEl.value || "").trim().toLowerCase()
  const sec = (filterSectorEl.value || "").trim()

  return filtered.filter((item) => {
    const okCat = cat ? item.category.toLowerCase().includes(cat) : true
    const okSec = sec ? item.sector === sec : true
    return okCat && okSec
  })
}

function render() {
  appsListEl.innerHTML = ""

  if (!allApplications || allApplications.length === 0) {
    emptyStateEl.classList.remove("hidden")
    return
  }
  emptyStateEl.classList.add("hidden")

  const filtered = applyFilters(allApplications)

  if (filtered.length === 0) {
    emptyStateEl.textContent = "Keine Einträge gefunden."
    emptyStateEl.classList.remove("hidden")
    return
  } else {
    emptyStateEl.textContent = "Keine Einträge gefunden."
    emptyStateEl.classList.add("hidden")
  }

  for (const app of filtered) {
    appsListEl.appendChild(renderCard(app))
  }
}

/**
 * @param {DynamicApplication} app
 */
function renderCard(app) {
  const li = document.createElement("li")
  li.className = "card"

  li.innerHTML = `
    <div class="top">
      <div class="iconwrap">
        <img src="${getIconSrc(app.iconName)}" alt="${app.sector}" />
      </div>
      <div>
        <h3 class="title">${app.title}</h3>
        <div class="meta">
          <span class="chip">${app.category}</span>
          <span class="chip">${app.sector}</span>
          ${app.isNew ? '<span class="chip new">NEU</span>' : ""}
        </div>
      </div>
    </div>
    <p>${app.description}</p>
    <div class="small">
      ${app.date} • vor ${app.daysAgo} Tagen
    </div>
    <a href="${app.link}" class="link" target="_blank" rel="noopener">Mehr erfahren</a>
  `

  return li
}

// Declare getIconSrc function before using it
function getIconSrc(iconName) {
  // Placeholder for icon source logic
  return `icons/${iconName}.png`
}

// Event Listeners
reloadBtn.addEventListener("click", loadDynamicContent)
filterCategoryEl.addEventListener("input", render)
filterSectorEl.addEventListener("change", render)

// Initial Load
document.addEventListener("DOMContentLoaded", () => {
  loadDynamicContent()

  // Routing -> aktive Kategorie setzen und rendern
  if (window.AppRouter && typeof window.AppRouter.add === "function") {
    window.AppRouter.add("/", () => {
      activeCategory = ""
      render()
    })
    window.AppRouter.add("/category/:slug", ({ slug }) => {
      activeCategory = slug || ""
      render()
    })
    if (typeof window.AppRouter.start === "function") {
      window.AppRouter.start()
    }
  }
})
