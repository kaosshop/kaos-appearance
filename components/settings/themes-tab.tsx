"use client"

import { useState } from "react"
import { Check, Code, Plus, Trash2 } from "lucide-react"
import { PRESETS, useAppearanceTheme } from "@/lib/theme"
import { Button, Label } from "@/components/kit"
import { cn } from "@/lib/utils"

export function ThemesTab() {
  const { draft, applyPreset, savedThemes, saveCurrent, loadSaved, deleteSaved, exportCode, importCode } =
    useAppearanceTheme()
  const [name, setName] = useState("")
  const [code, setCode] = useState("")
  const [status, setStatus] = useState<null | "ok" | "bad">(null)

  return (
    <div className="space-y-5">
      <section>
        <Label className="mb-2 block">Presets</Label>
        <div className="grid grid-cols-5 gap-2">
          {PRESETS.map((preset) => {
            const active = draft.preset === preset.name
            return (
              <button
                key={preset.name}
                type="button"
                onClick={() => applyPreset(preset)}
                aria-pressed={active}
                className={cn("ks-card p-1.5 text-left transition-transform", active && "ks-active-surface")}
              >
                <span
                  className="block space-y-1 rounded-[3px] p-1.5"
                  style={{ background: preset.background, border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <span className="block h-1 w-6 rounded-full" style={{ background: preset.accent }} />
                  <span className="block h-1 w-full rounded-full" style={{ background: `${preset.text}22` }} />
                  <span className="block h-1 w-8 rounded-full" style={{ background: `${preset.text}22` }} />
                </span>
                <span className="mt-1.5 flex items-center justify-between">
                  <span className="text-[10px]">{preset.name}</span>
                  {active ? <Check className="size-3" style={{ color: "var(--ks-accent)" }} /> : null}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      <section>
        <Label className="mb-2 block">My themes</Label>
        <div className="flex gap-2">
          <input
            className="ks-input"
            placeholder="Name this theme..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label="Theme name"
          />
          <Button
            variant="ghost"
            onClick={() => {
              saveCurrent(name)
              setName("")
            }}
            className="h-[30px] shrink-0"
          >
            <Plus className="size-3.5" />
            Save current
          </Button>
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-[var(--ks-text-dim)]">
          Tune the colours and interface to your taste, then save the result here to switch between your own themes in
          one click.
        </p>
        {savedThemes.length > 0 ? (
          <ul className="mt-2 space-y-1">
            {savedThemes.map((saved) => (
              <li key={saved.name} className="ks-card flex items-center gap-2 px-2.5 py-1.5">
                <span
                  className="size-3 rounded-full"
                  style={{ background: saved.theme.accent, border: "1px solid var(--ks-border)" }}
                  aria-hidden="true"
                />
                <span className="flex-1 truncate text-[11.5px]">{saved.name}</span>
                <Button variant="quiet" className="h-6 px-2 text-[11px]" onClick={() => loadSaved(saved.name)}>
                  Load
                </Button>
                <button
                  type="button"
                  aria-label={`Delete ${saved.name}`}
                  className="rounded p-1 text-[var(--ks-text-faint)] hover:text-[#fca5a5]"
                  onClick={() => deleteSaved(saved.name)}
                >
                  <Trash2 className="size-3.5" />
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      <section>
        <Label className="mb-2 block">Share</Label>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={() => {
              setCode(exportCode())
              setStatus(null)
            }}
          >
            <Code className="size-3.5" />
            Export code
          </Button>
          <Button
            variant="quiet"
            onClick={() => setStatus(importCode(code) ? "ok" : "bad")}
            disabled={code.trim().length === 0}
          >
            <Check className="size-3.5" />
            Apply code
          </Button>
        </div>
        <textarea
          className="ks-input mt-2 h-20 resize-none py-2 leading-relaxed"
          placeholder="Paste a theme code here, or press Export to get yours."
          value={code}
          onChange={(e) => {
            setCode(e.target.value)
            setStatus(null)
          }}
          aria-label="Theme code"
        />
        {status ? (
          <p
            className="mt-1.5 text-[11px]"
            style={{ color: status === "ok" ? "var(--ks-accent)" : "#fca5a5" }}
            role="status"
          >
            {status === "ok" ? "Theme code applied to the preview." : "That code could not be read."}
          </p>
        ) : null}
      </section>
    </div>
  )
}
