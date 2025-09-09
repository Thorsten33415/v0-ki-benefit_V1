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

async function loadData() {
  setLoading(true)
  try {
    // Simulierter Delay
    await new Promise((r) => setTimeout(r, 100))

    const combined = combine(window.latestApplications || [], window.aiApplications || [])
    allApplications = combined
    lastUpdated = new Date()
    updatedAtEl.textContent = `Aktualisiert: ${formatDate(lastUpdated)}`
  } catch (err) {
    console.error("Failed to load dynamic content:", err)
    // Fallback nur aus statischen Daten
    allApplications = combine([], window.aiApplications || [])
    lastUpdated = new Date()
    updatedAtEl.textContent = `Aktualisiert (Fallback): ${formatDate(lastUpdated)}`
  } finally {
    dataReady = true
    setLoading(false)
    render()
  }
}

function render() {
  const ul = document.getElementById("appsList")
  const empty = document.getElementById("emptyState")
  if (!ul) return

  // Vorzeitiger Exit, aber UI leeren, damit Unterseiten korrekt wirken
  ul.innerHTML = ""
  if (!dataReady) {
    if (empty) empty.classList.add("hidden")
    return
  }

  let list = Array.isArray(allApplications) ? allApplications.slice() : []

  // Route-Kategorie
  if (activeCategory) {
    const cat = activeCategory.toLowerCase()
    list = list.filter((it) => String(it.category || "").toLowerCase() === cat)
  }

  // Bestehende UI-Filter respektieren
  const q = (filterCategoryEl?.value || "").trim().toLowerCase()
  if (q)
    list = list.filter((it) =>
      String(it.category || "")
        .toLowerCase()
        .includes(q),
    )

  const sec = (filterSectorEl?.value || "").trim()
  if (sec) list = list.filter((it) => String(it.sector || "") === sec)

  if (!list.length) {
    if (empty) empty.classList.remove("hidden")
    return
  }
  if (empty) empty.classList.add("hidden")

  // Cards aufbauen
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

function handleRouteRoot() {
  activeCategory = ""
  render()
}

function handleRouteCategory({ slug }) {
  activeCategory = slug || ""
  render()
}

// Event Listeners
reloadBtn.addEventListener("click", loadData)
if (filterCategoryEl) filterCategoryEl.addEventListener("input", render)
if (filterSectorEl) filterSectorEl.addEventListener("change", render)

// Router registrieren und starten
if (window.AppRouter?.add) {
  window.AppRouter.add("/", handleRouteRoot)
  window.AppRouter.add("/category/:slug", handleRouteCategory)
  window.AppRouter.start()
}

// Initial Daten laden
loadData()
