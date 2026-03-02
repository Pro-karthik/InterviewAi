// src/utils/format.js

/**
 * Format ISO date into readable format.
 * Example: 21 Feb 2026
 */
export const formatDate = (dateString) => {
  if (!dateString) return "-"

  const date = new Date(dateString)
  if (isNaN(date)) return "-"

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  })
}

/**
 * Format ISO date + time.
 */
export const formatDateTime = (dateString) => {
  if (!dateString) return "-"

  const date = new Date(dateString)
  if (isNaN(date)) return "-"

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  })
}

/**
 * Convert milliseconds to seconds (rounded).
 */
export const msToSeconds = (ms) => {
  if (!ms) return 0
  return Math.round(Number(ms) / 1000)
}

/**
 * Truncate long text safely.
 */
export const truncate = (text, limit = 150) => {
  if (!text) return ""
  if (text.length <= limit) return text

  return text.slice(0, limit) + "..."
}

/**
 * Capitalize first letter.
 */
export const capitalize = (text) => {
  if (!text) return ""
  return text.charAt(0).toUpperCase() + text.slice(1)
}

/**
 * Normalize breakdown object keys for display.
 * Converts:
 * problemSolving → Problem Solving
 */
export const formatDimensionName = (key) => {
  if (!key) return ""

  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
}