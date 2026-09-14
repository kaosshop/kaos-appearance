"use client"

import { Save, Settings2, X } from "lucide-react"
import type { Category } from "@/lib/appearance-data"
import { Button } from "@/components/kit"
import { EditorRow, TattooZoneCard } from "@/components/editor/rows"

export function OptionsPanel({
  category,
  index,
  total,
  onOpenSettings,
  onClose,
  onSave,
  saved,
}: {
  category: Category
  index: number
  total: number
  onOpenSettings: () => void
  onClose: () => void
  onSave: () => void
  saved: boolean
}) {
  const Icon = category.icon
  const counter = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`

  return (
    <section className="ks-panel ks-rise flex h-full w-[300px] flex-col" aria-label={`${category.label} options`}>
      <header className="flex items-center gap-2.5 border-b px-3 py-3" style={{ borderColor: "var(--ks-border)" }}>
        <span
          className="grid size-7 shrink-0 place-items-center rounded-[var(--ks-radius)] border"
          style={{
            borderColor: "var(--ks-accent-line)",
            background: "var(--ks-accent-dim)",
            color: "var(--ks-accent)",
          }}
        >
          <Icon className="size-4" aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="ks-label block">Appearance Editor</span>
          <h2 className="truncate text-[15px] font-semibold leading-tight">{category.label}</h2>
        </span>
        <span className="ks-mono text-[9.5px] tabular-nums text-[var(--ks-text-faint)]">{counter}</span>
        <button
          type="button"
          onClick={onOpenSettings}
          aria-label="Open appearance settings"
          className="rounded p-1 text-[var(--ks-text-faint)] transition-colors hover:text-[var(--ks-accent)]"
        >
          <Settings2 className="size-3.5" />
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close editor"
          className="rounded p-1 text-[var(--ks-text-faint)] transition-colors hover:text-[var(--ks-accent)]"
        >
          <X className="size-3.5" />
        </button>
      </header>

      <div className="ks-scroll flex-1 space-y-1.5 overflow-y-auto p-2.5">
        {category.tattoos
          ? category.tattoos.map((zone) => <TattooZoneCard key={zone.id} zone={zone} />)
          : category.rows?.map((row, rowIndex) => (
              <EditorRow key={`${category.id}-${row.id}`} row={row} defaultOpen={rowIndex === 0} />
            ))}
        {category.tattoos ? (
          <Button variant="danger" className="w-full">
            Remove all Tattoos
          </Button>
        ) : null}
      </div>

      <footer className="border-t p-2.5" style={{ borderColor: "var(--ks-border)" }}>
        <div className="mb-2 flex items-center justify-between">
          <span className="ks-label">Kaos Shop · Appearance</span>
          <span className="ks-label">
            {category.label} {counter}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="accent" onClick={onSave}>
            <Save className="size-3.5" />
            {saved ? "Saved" : "Save"}
          </Button>
        </div>
      </footer>
    </section>
  )
}
