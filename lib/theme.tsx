"use client"

import type React from "react"
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { mix, readableOn, rgba } from "@/lib/color"

export type PanelSide = "left" | "right"

export type AppearanceTheme = {
  preset: string
  accent: string
  background: string
  text: string
  radius: number
  panelOpacity: number
  glow: number
  edgeWash: number
  animations: boolean
  panelSide: PanelSide
  titleOverlay: boolean
  previewFrame: boolean
  rowIcons: boolean
  equippedValues: boolean
  adminMode: boolean
}

export const DEFAULT_THEME: AppearanceTheme = {
  preset: "Kaos",
  accent: "#F4F4F5",
  background: "#07070A",
  text: "#F4F4F5",
  radius: 6,
  panelOpacity: 100,
  glow: 100,
  edgeWash: 45,
  animations: true,
  panelSide: "right",
  titleOverlay: true,
  previewFrame: true,
  rowIcons: true,
  equippedValues: true,
  adminMode: false,
}

export type Preset = { name: string; accent: string; background: string; text: string }

/** The 15 shipped presets. Kaos — pure white on near black — is the house theme. */
export const PRESETS: Preset[] = [
  { name: "Kaos", accent: "#F4F4F5", background: "#07070A", text: "#F4F4F5" },
  { name: "Bone", accent: "#E7E2D8", background: "#0B0A09", text: "#F2EFE9" },
  { name: "Ash", accent: "#9BA1A6", background: "#08090B", text: "#EDEEF0" },
  { name: "Ice", accent: "#7DD3FC", background: "#05080C", text: "#EAF4FB" },
  { name: "Azure", accent: "#3B82F6", background: "#06080F", text: "#EDF1FA" },
  { name: "Teal", accent: "#2DD4BF", background: "#050B0B", text: "#E8F6F4" },
  { name: "Mint", accent: "#4ADE80", background: "#050A07", text: "#E9F7EE" },
  { name: "Emerald", accent: "#10B981", background: "#040A08", text: "#E7F5EF" },
  { name: "Volt", accent: "#D9F99D", background: "#070A05", text: "#F1F6E6" },
  { name: "Amber", accent: "#F59E0B", background: "#0A0705", text: "#F8F0E4" },
  { name: "Sunset", accent: "#FB7185", background: "#0A0507", text: "#F9EAEC" },
  { name: "Crimson", accent: "#E5564B", background: "#0A0505", text: "#F7EAE9" },
  { name: "Magenta", accent: "#E879F9", background: "#09050A", text: "#F6EAF8" },
  { name: "Violet", accent: "#A78BFA", background: "#07060C", text: "#F0ECFA" },
  { name: "Indigo", accent: "#6366F1", background: "#06060D", text: "#ECEDFA" },
]

export type SavedTheme = { name: string; theme: AppearanceTheme }

type ThemeContextValue = {
  theme: AppearanceTheme
  draft: AppearanceTheme
  dirty: boolean
  setDraft: (patch: Partial<AppearanceTheme>) => void
  applyPreset: (preset: Preset) => void
  commit: () => void
  cancel: () => void
  reset: () => void
  savedThemes: SavedTheme[]
  saveCurrent: (name: string) => void
  loadSaved: (name: string) => void
  deleteSaved: (name: string) => void
  exportCode: () => string
  importCode: (code: string) => boolean
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const STORAGE_KEY = "kaos-appearance-theme"
const SAVED_KEY = "kaos-appearance-saved-themes"

export function AppearanceThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<AppearanceTheme>(DEFAULT_THEME)
  const [draft, setDraftState] = useState<AppearanceTheme>(DEFAULT_THEME)
  const [savedThemes, setSavedThemes] = useState<SavedTheme[]>([])

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = { ...DEFAULT_THEME, ...JSON.parse(raw) } as AppearanceTheme
        setTheme(parsed)
        setDraftState(parsed)
      }
      const saved = window.localStorage.getItem(SAVED_KEY)
      if (saved) setSavedThemes(JSON.parse(saved))
    } catch {
      // ignore malformed storage, fall back to defaults
    }
  }, [])

  const persist = useCallback((next: AppearanceTheme) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // storage may be unavailable, the theme still applies for this session
    }
  }, [])

  const setDraft = useCallback((patch: Partial<AppearanceTheme>) => {
    setDraftState((prev) => ({ ...prev, ...patch }))
  }, [])

  const applyPreset = useCallback((preset: Preset) => {
    setDraftState((prev) => ({
      ...prev,
      preset: preset.name,
      accent: preset.accent,
      background: preset.background,
      text: preset.text,
    }))
  }, [])

  const commit = useCallback(() => {
    setTheme(draft)
    persist(draft)
  }, [draft, persist])

  const cancel = useCallback(() => setDraftState(theme), [theme])

  const reset = useCallback(() => {
    setDraftState(DEFAULT_THEME)
    setTheme(DEFAULT_THEME)
    persist(DEFAULT_THEME)
  }, [persist])

  const persistSaved = useCallback((next: SavedTheme[]) => {
    setSavedThemes(next)
    try {
      window.localStorage.setItem(SAVED_KEY, JSON.stringify(next))
    } catch {
      // non fatal
    }
  }, [])

  const saveCurrent = useCallback(
    (name: string) => {
      const trimmed = name.trim()
      if (!trimmed) return
      const next = [...savedThemes.filter((t) => t.name !== trimmed), { name: trimmed, theme: { ...draft } }]
      persistSaved(next)
    },
    [draft, savedThemes, persistSaved],
  )

  const loadSaved = useCallback(
    (name: string) => {
      const found = savedThemes.find((t) => t.name === name)
      if (found) setDraftState({ ...DEFAULT_THEME, ...found.theme })
    },
    [savedThemes],
  )

  const deleteSaved = useCallback(
    (name: string) => persistSaved(savedThemes.filter((t) => t.name !== name)),
    [savedThemes, persistSaved],
  )

  const exportCode = useCallback(() => {
    const payload = JSON.stringify(draft)
    const base = typeof window === "undefined" ? "" : window.btoa(unescape(encodeURIComponent(payload)))
    return `KAOS-${base}`
  }, [draft])

  const importCode = useCallback((code: string) => {
    try {
      const raw = code.trim().replace(/^KAOS-/, "")
      const json = decodeURIComponent(escape(window.atob(raw)))
      const parsed = JSON.parse(json)
      if (!parsed || typeof parsed !== "object") return false
      setDraftState({ ...DEFAULT_THEME, ...parsed })
      return true
    } catch {
      return false
    }
  }, [])

  const dirty = useMemo(() => JSON.stringify(theme) !== JSON.stringify(draft), [theme, draft])

  const value = useMemo(
    () => ({
      theme,
      draft,
      dirty,
      setDraft,
      applyPreset,
      commit,
      cancel,
      reset,
      savedThemes,
      saveCurrent,
      loadSaved,
      deleteSaved,
      exportCode,
      importCode,
    }),
    [
      theme,
      draft,
      dirty,
      setDraft,
      applyPreset,
      commit,
      cancel,
      reset,
      savedThemes,
      saveCurrent,
      loadSaved,
      deleteSaved,
      exportCode,
      importCode,
    ],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useAppearanceTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useAppearanceTheme must be used inside AppearanceThemeProvider")
  return ctx
}

/** Every surface, ramp step and border in the interface derives from three colours. */
export function themeVars(t: AppearanceTheme): React.CSSProperties {
  const bg = t.background
  const accent = t.accent
  const text = t.text

  return {
    "--ks-accent": accent,
    "--ks-accent-hover": mix(accent, "#FFFFFF", 0.22),
    "--ks-accent-bright": mix(accent, "#FFFFFF", 0.45),
    "--ks-accent-soft": mix(accent, "#FFFFFF", 0.7),
    "--ks-accent-dim": rgba(accent, 0.16),
    "--ks-accent-line": rgba(accent, 0.4),
    "--ks-on-accent": readableOn(accent),
    "--ks-canvas": bg,
    "--ks-sidebar": mix(bg, text, 0.05),
    "--ks-card": mix(bg, text, 0.07),
    "--ks-raised": mix(bg, text, 0.11),
    "--ks-selected": mix(bg, accent, 0.18),
    "--ks-text": text,
    "--ks-text-dim": mix(text, bg, 0.38),
    "--ks-text-faint": mix(text, bg, 0.6),
    "--ks-border": rgba(text, 0.1),
    "--ks-border-strong": rgba(text, 0.18),
    "--ks-radius": `${t.radius}px`,
    "--ks-panel-alpha": String(t.panelOpacity / 100),
    "--ks-glow": String(t.glow / 100),
    "--ks-edge": String(t.edgeWash / 100),
    "--ks-duration": t.animations ? "200ms" : "0ms",
  } as React.CSSProperties
}
