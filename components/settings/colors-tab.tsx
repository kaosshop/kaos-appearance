"use client"

import { contrastRatio, gradeContrast, mix, normalizeHex } from "@/lib/color"
import { PRESETS, useAppearanceTheme } from "@/lib/theme"
import { Label } from "@/components/kit"

const SWATCHES = [
  "#F4F4F5",
  "#D4D4D8",
  "#9BA1A6",
  "#7DD3FC",
  "#3B82F6",
  "#6366F1",
  "#A78BFA",
  "#E879F9",
  "#FB7185",
  "#E5564B",
  "#F59E0B",
  "#D9F99D",
  "#4ADE80",
  "#10B981",
  "#2DD4BF",
  "#E7E2D8",
]

function HexField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (next: string) => void
}) {
  return (
    <div className="flex items-center gap-3 py-1.5">
      <Label className="w-24 shrink-0">{label}</Label>
      <input
        className="ks-input max-w-[130px]"
        value={value}
        onChange={(e) => {
          const next = normalizeHex(e.target.value)
          onChange(next || e.target.value)
        }}
        aria-label={`${label} hex value`}
      />
      <label className="ks-card size-7 shrink-0 cursor-pointer overflow-hidden p-0" style={{ background: value }}>
        <span className="sr-only">Pick {label} colour</span>
        <input
          type="color"
          value={normalizeHex(value) || "#000000"}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          className="size-full cursor-pointer opacity-0"
        />
      </label>
    </div>
  )
}

function LegibilityCard({ title, ratio }: { title: string; ratio: number }) {
  const grade = gradeContrast(ratio)
  const low = grade === "LOW"
  return (
    <div
      className="ks-card px-3 py-2.5"
      style={low ? { borderColor: "rgba(220,38,38,0.5)", background: "rgba(220,38,38,0.08)" } : undefined}
    >
      <Label>{title}</Label>
      <p className="mt-1.5 flex items-baseline gap-2">
        <span className="ks-mono text-[15px] tabular-nums">{ratio.toFixed(1)}</span>
        <span className="ks-label" style={{ color: low ? "#fca5a5" : "var(--ks-accent)" }}>
          {grade}
        </span>
      </p>
    </div>
  )
}

export function ColorsTab() {
  const { draft, setDraft } = useAppearanceTheme()
  const accent = normalizeHex(draft.accent) || "#000000"
  const background = normalizeHex(draft.background) || "#000000"
  const text = normalizeHex(draft.text) || "#FFFFFF"

  const ramp = [
    { label: "Hover", color: mix(accent, "#FFFFFF", 0.22) },
    { label: "Base", color: accent },
    { label: "Bright", color: mix(accent, "#FFFFFF", 0.45) },
    { label: "Soft", color: mix(accent, "#FFFFFF", 0.7) },
  ]

  const surfaces = [
    { label: "Canvas", color: background },
    { label: "Sidebar", color: mix(background, text, 0.05) },
    { label: "Card", color: mix(background, text, 0.07) },
    { label: "Raised", color: mix(background, text, 0.11) },
    { label: "Selected", color: mix(background, accent, 0.18) },
  ]

  const onAccentLabel = contrastRatio(accent, contrastRatio(accent, "#FFFFFF") >= contrastRatio(accent, "#0A0A0A") ? "#FFFFFF" : "#0A0A0A")

  return (
    <div className="space-y-5">
      <section>
        <Label className="mb-2 block">Accent</Label>
        <div className="flex flex-wrap gap-1.5">
          {SWATCHES.map((hex) => (
            <button
              key={hex}
              type="button"
              aria-label={`Accent ${hex}`}
              aria-pressed={accent === hex}
              onClick={() => setDraft({ accent: hex, preset: PRESETS.find((p) => p.accent === hex)?.name ?? "Custom" })}
              className="size-5 rounded-full border transition-transform hover:scale-110"
              style={{
                background: hex,
                borderColor: accent === hex ? "var(--ks-text)" : "var(--ks-border)",
                outline: accent === hex ? "2px solid var(--ks-accent-line)" : "none",
                outlineOffset: "2px",
              }}
            />
          ))}
        </div>

        <div className="mt-3 divide-y" style={{ borderColor: "var(--ks-border)" }}>
          <HexField label="Accent" value={draft.accent} onChange={(v) => setDraft({ accent: v, preset: "Custom" })} />
          <HexField
            label="Background"
            value={draft.background}
            onChange={(v) => setDraft({ background: v, preset: "Custom" })}
          />
          <HexField label="Text" value={draft.text} onChange={(v) => setDraft({ text: v, preset: "Custom" })} />
        </div>
      </section>

      <section>
        <Label className="mb-2 block">Legibility</Label>
        <div className="grid grid-cols-2 gap-2">
          <LegibilityCard title="Text on background" ratio={contrastRatio(text, background)} />
          <LegibilityCard title="Label on accent" ratio={onAccentLabel} />
        </div>
      </section>

      <section>
        <Label className="mb-2 block">Derived ramp</Label>
        <div className="grid grid-cols-4 gap-2">
          {ramp.map((step) => (
            <span
              key={step.label}
              className="h-7 rounded-[var(--ks-radius)] border"
              style={{ background: step.color, borderColor: "var(--ks-border)" }}
            />
          ))}
        </div>
        <p className="ks-label mt-1.5">
          {ramp.map((step) => step.label).join(" · ")} — generated from your accent
        </p>
      </section>

      <section>
        <Label className="mb-2 block">Surfaces</Label>
        <div className="grid grid-cols-5 gap-2">
          {surfaces.map((surface) => (
            <span
              key={surface.label}
              className="h-7 rounded-[var(--ks-radius)] border"
              style={{ background: surface.color, borderColor: "var(--ks-border)" }}
            />
          ))}
        </div>
        <p className="ks-label mt-1.5">{surfaces.map((surface) => surface.label).join(" · ")}</p>
      </section>
    </div>
  )
}
