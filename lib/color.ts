export type RGB = { r: number; g: number; b: number }

export function normalizeHex(input: string): string {
  let hex = input.trim().replace(/^#/, "")
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("")
  }
  if (!/^[0-9a-fA-F]{6}$/.test(hex)) return ""
  return "#" + hex.toUpperCase()
}

export function hexToRgb(hex: string): RGB {
  const safe = normalizeHex(hex) || "#000000"
  const n = Number.parseInt(safe.slice(1), 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

export function rgbToHex({ r, g, b }: RGB): string {
  const c = (v: number) =>
    Math.max(0, Math.min(255, Math.round(v)))
      .toString(16)
      .padStart(2, "0")
  return ("#" + c(r) + c(g) + c(b)).toUpperCase()
}

/** Mix two hex colours. amount = 0 returns a, amount = 1 returns b. */
export function mix(a: string, b: string, amount: number): string {
  const x = hexToRgb(a)
  const y = hexToRgb(b)
  return rgbToHex({
    r: x.r + (y.r - x.r) * amount,
    g: x.g + (y.g - x.g) * amount,
    b: x.b + (y.b - x.b) * amount,
  })
}

export function rgba(hex: string, alpha: number): string {
  const { r, g, b } = hexToRgb(hex)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function channelLuminance(value: number): number {
  const v = value / 255
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
}

export function luminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex)
  return 0.2126 * channelLuminance(r) + 0.7152 * channelLuminance(g) + 0.0722 * channelLuminance(b)
}

/** WCAG 2.1 contrast ratio between two colours, 1 to 21. */
export function contrastRatio(a: string, b: string): number {
  const la = luminance(a)
  const lb = luminance(b)
  const light = Math.max(la, lb)
  const dark = Math.min(la, lb)
  return (light + 0.05) / (dark + 0.05)
}

export type ContrastGrade = "AAA" | "AA" | "LOW"

export function gradeContrast(ratio: number, large = false): ContrastGrade {
  if (large) {
    if (ratio >= 4.5) return "AAA"
    if (ratio >= 3) return "AA"
    return "LOW"
  }
  if (ratio >= 7) return "AAA"
  if (ratio >= 4.5) return "AA"
  return "LOW"
}

/** Pick black or white for text sitting on top of the given colour. */
export function readableOn(hex: string): string {
  return contrastRatio(hex, "#FFFFFF") >= contrastRatio(hex, "#000000") ? "#FFFFFF" : "#0A0A0A"
}
