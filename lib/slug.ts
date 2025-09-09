/**
 * Converts a string to a URL-safe slug
 * Handles German umlauts and special characters
 */
export function toSlug(name: string): string {
  return name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/Ä/g, "Ae")
    .replace(/Ö/g, "Oe")
    .replace(/Ü/g, "Ue")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Keep only alphanumeric, spaces, and hyphens
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, "") // Remove leading/trailing hyphens
}

/**
 * Converts a slug back to a readable search query
 */
export function slugToQuery(slug: string): string {
  return slug.replace(/-/g, " ")
}
