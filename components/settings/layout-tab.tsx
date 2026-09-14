"use client"

import type { AppearanceTheme } from "@/lib/theme"
import { useAppearanceTheme } from "@/lib/theme"
import { Label, Switch } from "@/components/kit"
import { cn } from "@/lib/utils"

const ELEMENTS: { key: keyof AppearanceTheme; title: string; description: string }[] = [
  {
    key: "titleOverlay",
    title: "Title overlay",
    description: "The large heading and store name in the top-left corner of the screen.",
  },
  {
    key: "previewFrame",
    title: "Preview frame",
    description: "The four corner brackets that frame your character in the middle of the screen.",
  },
  { key: "rowIcons", title: "Row icons", description: "The small icon tile on every clothing and feature row." },
  {
    key: "equippedValues",
    title: "Equipped values",
    description: "The number chip showing what is currently equipped without opening the row.",
  },
]

export function LayoutTab() {
  const { draft, setDraft } = useAppearanceTheme()

  return (
    <div className="space-y-5">
      <section>
        <Label className="mb-2 block">Panel side</Label>
        <div className="grid grid-cols-2 gap-2">
          {(["left", "right"] as const).map((side) => {
            const active = draft.panelSide === side
            return (
              <button
                key={side}
                type="button"
                aria-pressed={active}
                onClick={() => setDraft({ panelSide: side })}
                className={cn("ks-card px-3 py-2.5 text-center", active && "ks-active-surface")}
              >
                <span className={cn("flex h-5 items-stretch gap-1", side === "right" && "flex-row-reverse")}>
                  <span
                    className="w-1/3 rounded-[3px]"
                    style={{ background: active ? "var(--ks-accent)" : "color-mix(in srgb, var(--ks-text) 18%, transparent)" }}
                  />
                  <span className="flex-1 rounded-[3px]" style={{ background: "color-mix(in srgb, var(--ks-text) 6%, transparent)" }} />
                </span>
                <span className="mt-1.5 block text-[11.5px] capitalize">{side}</span>
              </button>
            )
          })}
        </div>
        <p className="ks-label mt-2">The category rail moves to the opposite side.</p>
      </section>

      <section>
        <Label className="mb-2 block">Elements</Label>
        <div className="space-y-2">
          {ELEMENTS.map((element) => (
            <div key={element.key} className="ks-card flex items-center gap-3 px-3 py-2.5">
              <div className="flex-1">
                <p className="text-[12px] font-medium">{element.title}</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-[var(--ks-text-dim)]">{element.description}</p>
              </div>
              <Switch
                checked={draft[element.key] as boolean}
                onChange={(next) => setDraft({ [element.key]: next } as Partial<AppearanceTheme>)}
                ariaLabel={element.title}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
