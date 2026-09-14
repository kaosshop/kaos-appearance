"use client"

import { Save } from "lucide-react"
import { themeVars, useAppearanceTheme } from "@/lib/theme"
import { Chip, Label } from "@/components/kit"
import { cn } from "@/lib/utils"

const ROWS = [
  { label: "Jackets", value: "12", active: false },
  { label: "Shirt", value: "04", active: true },
  { label: "Shoes", value: "27", active: false },
]

export function LivePreview() {
  const { draft } = useAppearanceTheme()

  return (
    <div className="w-[168px] shrink-0 space-y-2.5" style={themeVars(draft)}>
      <div className="flex items-center gap-1.5">
        <span className="size-1.5 rounded-full" style={{ background: "var(--ks-accent)" }} aria-hidden="true" />
        <Label>Live preview</Label>
      </div>

      <div className="ks-card space-y-1.5 p-1.5">
        <div className="ks-card flex items-center gap-2 px-2 py-1.5">
          {draft.rowIcons ? (
            <span
              className="size-4 shrink-0 rounded-[3px] border"
              style={{ background: "var(--ks-accent-dim)", borderColor: "var(--ks-accent-line)" }}
            />
          ) : null}
          <span className="flex-1 text-[11px] font-medium">Clothing</span>
          {draft.equippedValues ? <span className="ks-label">08/09</span> : null}
        </div>

        {ROWS.map((row) => (
          <div
            key={row.label}
            className={cn("ks-card flex items-center gap-2 px-2 py-1.5", row.active && "ks-active-surface")}
          >
            {draft.rowIcons ? (
              <span
                className="size-4 shrink-0 rounded-[3px] border"
                style={{
                  background: row.active ? "var(--ks-accent-dim)" : "color-mix(in srgb, var(--ks-text) 8%, transparent)",
                  borderColor: row.active ? "var(--ks-accent-line)" : "var(--ks-border)",
                }}
              />
            ) : null}
            <span className="flex-1 text-[11px]">{row.label}</span>
            {draft.equippedValues ? <Chip active={row.active}>{row.value}</Chip> : null}
          </div>
        ))}

        <div className="grid grid-cols-3 gap-1.5">
          {[0, 1, 2].map((tile) => (
            <span key={tile} className={cn("ks-tile", tile === 1 && "ks-tile-selected")} />
          ))}
        </div>

        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          className="ks-button ks-button-accent h-7 w-full text-[11px]"
        >
          <Save className="size-3" />
          Save
        </button>
      </div>

      <div className="ks-card space-y-1 p-2.5">
        <p className="text-[11px] font-semibold">Appearance Editor</p>
        <p className="text-[10px] text-[var(--ks-text-dim)]">Body copy reads at this weight.</p>
        <p className="ks-label pt-1">Data · 08 / 09</p>
      </div>
    </div>
  )
}
