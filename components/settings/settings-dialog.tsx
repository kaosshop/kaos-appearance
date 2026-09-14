"use client"

import { useEffect, useState } from "react"
import { Layout, Paintbrush, Palette, Save, Server, SlidersHorizontal, X } from "lucide-react"
import { useAppearanceTheme } from "@/lib/theme"
import { KsLogo } from "@/components/ks-logo"
import { Button, Chip, Label } from "@/components/kit"
import { cn } from "@/lib/utils"
import { LivePreview } from "./live-preview"
import { ThemesTab } from "./themes-tab"
import { ColorsTab } from "./colors-tab"
import { InterfaceTab } from "./interface-tab"
import { LayoutTab } from "./layout-tab"
import { ServerTab } from "./server-tab"

const TABS = [
  { id: "themes", label: "Themes", icon: Paintbrush, Panel: ThemesTab },
  { id: "colors", label: "Colors", icon: Palette, Panel: ColorsTab },
  { id: "interface", label: "Interface", icon: SlidersHorizontal, Panel: InterfaceTab },
  { id: "layout", label: "Layout", icon: Layout, Panel: LayoutTab },
  { id: "server", label: "Server", icon: Server, Panel: ServerTab },
] as const

export function SettingsDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { draft, dirty, commit, cancel, reset } = useAppearanceTheme()
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("themes")

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        cancel()
        onClose()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, cancel, onClose])

  if (!open) return null

  const Panel = TABS.find((entry) => entry.id === tab)!.Panel

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <button
        type="button"
        aria-label="Close settings"
        className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"
        onClick={() => {
          cancel()
          onClose()
        }}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Appearance settings"
        className={cn("ks-dialog relative flex w-full max-w-[840px] flex-col", draft.animations && "ks-animate-in")}
      >
        <header className="flex items-center gap-3 border-b px-4 py-3" style={{ borderColor: "var(--ks-border)" }}>
          <span className="ks-icon-tile">
            <KsLogo className="size-4" />
          </span>
          <div className="flex-1">
            <Label>Appearance · UI</Label>
            <h2 className="text-[15px] font-semibold tracking-tight">Appearance Settings</h2>
          </div>
          {dirty ? (
            <Chip active className="gap-1.5">
              <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
              Unsaved
            </Chip>
          ) : null}
          <button
            type="button"
            onClick={() => {
              cancel()
              onClose()
            }}
            aria-label="Close"
            className="rounded p-1 text-[var(--ks-text-faint)] transition-colors hover:text-[var(--ks-text)]"
          >
            <X className="size-4" />
          </button>
        </header>

        <div className="flex min-h-[380px]">
          <nav
            aria-label="Settings sections"
            className="flex w-[132px] shrink-0 flex-col border-r p-2.5"
            style={{ borderColor: "var(--ks-border)" }}
          >
            <ul className="space-y-1">
              {TABS.map((entry) => {
                const Icon = entry.icon
                const active = entry.id === tab
                return (
                  <li key={entry.id}>
                    <button
                      type="button"
                      onClick={() => setTab(entry.id)}
                      aria-current={active ? "page" : undefined}
                      className={cn("ks-nav-item", active && "ks-nav-item-active")}
                    >
                      <Icon className="size-3.5 shrink-0" />
                      {entry.label}
                    </button>
                  </li>
                )
              })}
            </ul>
            <div className="mt-auto border-t pt-2.5" style={{ borderColor: "var(--ks-border)" }}>
              <p className="ks-label leading-relaxed">
                Kaos Shop · Appearance
                <br />
                Theme <span style={{ color: "var(--ks-accent)" }}>{draft.preset}</span>
              </p>
            </div>
          </nav>

          <div className="ks-scroll max-h-[440px] flex-1 overflow-y-auto p-4">
            <Panel />
          </div>

          <aside className="border-l p-4" style={{ borderColor: "var(--ks-border)" }}>
            <LivePreview />
          </aside>
        </div>

        <footer
          className="flex items-center gap-2 border-t px-4 py-3"
          style={{ borderColor: "var(--ks-border)" }}
        >
          <Button variant="quiet" onClick={reset} className="px-0 text-[var(--ks-accent)]">
            Reset to default
          </Button>
          <span className="flex-1" />
          <Button
            variant="ghost"
            onClick={() => {
              cancel()
              onClose()
            }}
          >
            Cancel
          </Button>
          <Button
            variant="accent"
            onClick={() => {
              commit()
              onClose()
            }}
          >
            <Save className="size-3.5" />
            Save
          </Button>
        </footer>
      </div>
    </div>
  )
}
