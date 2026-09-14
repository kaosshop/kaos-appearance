"use client"

import { useState } from "react"
import { CATEGORIES } from "@/lib/appearance-data"
import { themeVars, useAppearanceTheme } from "@/lib/theme"
import { CategoryRail } from "@/components/editor/category-rail"
import { OptionsPanel } from "@/components/editor/options-panel"
import { BuildTag, EscHint, PreviewFrame, SceneBackdrop, SceneToolbar, TitleOverlay } from "@/components/editor/scene"
import { SettingsDialog } from "@/components/settings/settings-dialog"
import { cn } from "@/lib/utils"

export function AppearanceEditor() {
  const { theme } = useAppearanceTheme()
  const [activeId, setActiveId] = useState(CATEGORIES[6].id)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [closed, setClosed] = useState(false)
  const [saved, setSaved] = useState(false)

  const index = CATEGORIES.findIndex((category) => category.id === activeId)
  const category = CATEGORIES[index]
  const rightSide = theme.panelSide === "right"

  return (
    <main
      className="ks-root relative h-dvh w-full overflow-hidden bg-black"
      style={themeVars(theme)}
      data-animations={theme.animations ? "on" : "off"}
    >
      <SceneBackdrop />

      {theme.titleOverlay ? <TitleOverlay category={category.label} /> : null}
      {theme.previewFrame ? <PreviewFrame /> : null}
      <BuildTag />
      <SceneToolbar />
      <EscHint onClick={() => setClosed(true)} />

      {!closed ? (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 flex items-center gap-3 p-4",
            rightSide ? "flex-row" : "flex-row-reverse",
          )}
        >
          <div className="pointer-events-auto">
            <CategoryRail categories={CATEGORIES} activeId={activeId} onSelect={setActiveId} />
          </div>
          <span className="flex-1" />
          <div className="pointer-events-auto h-full max-h-[calc(100dvh-2rem)] py-0">
            <OptionsPanel
              category={category}
              index={index}
              total={CATEGORIES.length}
              onOpenSettings={() => setSettingsOpen(true)}
              onClose={() => setClosed(true)}
              onSave={() => {
                setSaved(true)
                window.setTimeout(() => setSaved(false), 1600)
              }}
              saved={saved}
            />
          </div>
        </div>
      ) : (
        <div className="absolute inset-x-0 bottom-24 flex justify-center">
          <button type="button" className="ks-button ks-button-accent" onClick={() => setClosed(false)}>
            Reopen appearance editor
          </button>
        </div>
      )}

      <SettingsDialog open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </main>
  )
}
