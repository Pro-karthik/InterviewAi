// src/utils/riskUtils.js

/**
 * Safely converts any value to number.
 */
export const toNumber = (value, fallback = 0) => {
  const num = Number(value)
  return isNaN(num) ? fallback : num
}

/**
 * Returns risk level based on numeric score.
 */
export const getRiskLevel = (score) => {
  const value = toNumber(score)

  if (value <= 30) return "LOW"
  if (value <= 70) return "MEDIUM"
  return "HIGH"
}

/**
 * Returns Tailwind text color class based on risk score.
 */
export const getRiskTextColor = (score) => {
  const value = toNumber(score)

  if (value <= 30) return "text-green-600"
  if (value <= 70) return "text-yellow-500"
  return "text-red-600"
}

/**
 * Returns Tailwind badge style based on risk level.
 */
export const getRiskBadge = (levelOrScore) => {
  const level =
    typeof levelOrScore === "string"
      ? levelOrScore
      : getRiskLevel(levelOrScore)

  switch (level) {
    case "LOW":
      return "bg-green-100 text-green-700"
    case "MEDIUM":
      return "bg-yellow-100 text-yellow-700"
    case "HIGH":
      return "bg-red-100 text-red-700"
    default:
      return "bg-gray-100 text-gray-600"
  }
}

/**
 * Heatmap cell background color.
 */
export const getHeatColor = (value) => {
  const num = toNumber(value)

  if (num === 0) return "bg-white"
  if (num < 5) return "bg-yellow-200"
  if (num < 15) return "bg-orange-400"
  return "bg-red-500 text-white"
}

/**
 * Checks whether behavioral summary is clean.
 */
export const isCleanSession = (summary) => {
  if (!summary) return true

  return (
    toNumber(summary.noFaceMs) === 0 &&
    toNumber(summary.multiFaceMs) === 0 &&
    toNumber(summary.tabSwitches) === 0 &&
    toNumber(summary.totalScore) === 0
  )
}