"use client"

import { useMemo, useState } from "react"
import { Check, ChevronDown, LayoutGrid } from "lucide-react"
import type { OverlayRow, PedRow, PickerRow, Row, SliderRow, HairRow, TattooZone } from "@/lib/appearance-data"
import { HAIR_COLORS } from "@/lib/appearance-data"
import { Button, Chip, Label, Range, Select, Stepper } from "@/components/kit"
import { useAppearanceTheme } from "@/lib/theme"
import { cn } from "@/lib/utils"

function TileGrid({
  count,
  value,
  onChange,
  ariaLabel,
  renderLabel,
}: {
  count: number
  value: number
  onChange: (next: number) => void
  ariaLabel: string
  renderLabel?: (index: number) => string
}) {
  const items = useMemo(() => {
    const page = Math.floor(value / 9)
    const start = Math.min(page * 9, Math.max(0, count - 9))
    return Array.from({ length: Math.min(9, count) }, (_, i) => start + i)
  }, [value, count])

  return (
    <div className="grid grid-cols-3 gap-1.5" role="listbox" aria-label={ariaLabel}>
      {items.map((index) => {
        const selected = index === value
        return (
          <button
            key={index}
            type="button"
            role="option"
            aria-selected={selected}
            onClick={() => onChange(index)}
            className={cn("ks-tile group", selected && "ks-tile-selected")}
          >
            <span
              aria-hidden="true"
              className="absolute inset-[18%] rounded-[3px] opacity-40"
              style={{
                background: `linear-gradient(${(index * 37) % 360}deg, var(--ks-text) 0%, transparent 70%)`,
              }}
            />
            <span className="ks-mono absolute bottom-1 left-1.5 text-[9px] text-[var(--ks-text-faint)]">
              {renderLabel ? renderLabel(index) : index}
            </span>
            {selected ? (
              <span
                className="absolute right-1 top-1 grid size-3.5 place-items-center rounded-full"
                style={{ background: "var(--ks-accent)", color: "var(--ks-on-accent)" }}
              >
                <Check className="size-2.5" />
              </span>
            ) : null}
          </button>
        )
      })}
    </div>
  )
}

function FieldHeader({ label, value, max }: { label: string; value: number; max: number }) {
  return (
    <div className="mb-1.5 flex items-center justify-between">
      <Label>{label}</Label>
      <span className="flex items-center gap-1.5">
        <span className="ks-mono text-[9.5px] tabular-nums text-[var(--ks-text-dim)]">
          {value} / {max}
        </span>
        <LayoutGrid className="size-3 text-[var(--ks-text-faint)]" aria-hidden="true" />
      </span>
    </div>
  )
}

function PickerBody({ row }: { row: PickerRow }) {
  const [drawable, setDrawable] = useState(0)
  const [texture, setTexture] = useState(0)

  return (
    <div className="space-y-3.5">
      <div>
        <FieldHeader label="Drawable" value={drawable} max={row.drawables} />
        <Stepper value={drawable} max={row.drawables} onChange={setDrawable} ariaLabel={`${row.label} drawable`} />
        <div className="mt-1.5">
          <TileGrid count={row.drawables} value={drawable} onChange={setDrawable} ariaLabel={`${row.label} variants`} />
        </div>
      </div>
      <div>
        <FieldHeader label="Texture" value={texture} max={row.textures} />
        <Stepper value={texture} max={row.textures} onChange={setTexture} ariaLabel={`${row.label} texture`} />
      </div>
    </div>
  )
}

function OverlayBody({ row }: { row: OverlayRow }) {
  const [style, setStyle] = useState(0)
  const [opacity, setOpacity] = useState(100)
  const [color, setColor] = useState(0)

  return (
    <div className="space-y-3.5">
      <div>
        <FieldHeader label="Style" value={style} max={row.styles} />
        <Stepper value={style} max={row.styles} onChange={setStyle} ariaLabel={`${row.label} style`} />
      </div>
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <Label>Opacity</Label>
          <span className="ks-mono text-[9.5px] tabular-nums text-[var(--ks-text-dim)]">
            {(opacity / 100).toFixed(1)}
          </span>
        </div>
        <Range value={opacity} onChange={setOpacity} ariaLabel={`${row.label} opacity`} />
      </div>
      {row.colors ? (
        <div>
          <Label className="mb-1.5 block">Colour</Label>
          <div className="grid grid-cols-12 gap-1">
            {HAIR_COLORS.slice(0, 24).map((hex, index) => (
              <button
                key={hex + index}
                type="button"
                aria-label={`Colour ${index}`}
                aria-pressed={color === index}
                onClick={() => setColor(index)}
                className={cn(
                  "aspect-square rounded-[3px] border transition-transform",
                  color === index ? "scale-110" : "border-transparent",
                )}
                style={{
                  background: hex,
                  borderColor: color === index ? "var(--ks-accent)" : "var(--ks-border)",
                }}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

function SliderBody({ row }: { row: SliderRow }) {
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(row.items.map((item) => [item.id, 0])),
  )

  return (
    <div className="space-y-3">
      {row.items.map((item) => (
        <div key={item.id}>
          <div className="mb-1.5 flex items-center justify-between">
            <Label>{item.label}</Label>
            <span className="ks-mono text-[9.5px] tabular-nums text-[var(--ks-text-dim)]">
              {(values[item.id] / 100).toFixed(2)}
            </span>
          </div>
          <Range
            value={values[item.id]}
            min={-100}
            max={100}
            onChange={(next) => setValues((prev) => ({ ...prev, [item.id]: next }))}
            ariaLabel={item.label}
          />
        </div>
      ))}
    </div>
  )
}

function HairBody({ row }: { row: HairRow }) {
  const [style, setStyle] = useState(2)
  const [texture, setTexture] = useState(0)
  const [fade, setFade] = useState(0)
  const [color, setColor] = useState(0)
  const [highlight, setHighlight] = useState(0)

  return (
    <div className="space-y-3.5">
      <div>
        <FieldHeader label="Style" value={style} max={row.styles} />
        <Stepper value={style} max={row.styles} onChange={setStyle} ariaLabel="Hair style" />
        <div className="mt-1.5">
          <TileGrid count={row.styles} value={style} onChange={setStyle} ariaLabel="Hair styles" />
        </div>
      </div>
      <div>
        <FieldHeader label="Texture" value={texture} max={row.textures} />
        <Stepper value={texture} max={row.textures} onChange={setTexture} ariaLabel="Hair texture" />
      </div>
      <div>
        <FieldHeader label="Fade" value={fade} max={row.fades} />
        <Stepper value={fade} max={row.fades} onChange={setFade} ariaLabel="Hair fade" />
      </div>
      <ColorGrid label="Colour" value={color} onChange={setColor} />
      <ColorGrid label="Highlight" value={highlight} onChange={setHighlight} />
    </div>
  )
}

function ColorGrid({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (next: number) => void
}) {
  return (
    <div>
      <Label className="mb-1.5 block">{label}</Label>
      <div className="grid grid-cols-12 gap-1">
        {HAIR_COLORS.map((hex, index) => (
          <button
            key={label + hex + index}
            type="button"
            aria-label={`${label} ${index}`}
            aria-pressed={value === index}
            onClick={() => onChange(index)}
            className={cn("aspect-square rounded-[3px] border transition-transform", value === index && "scale-110")}
            style={{
              background: hex,
              borderColor: value === index ? "var(--ks-accent)" : "var(--ks-border)",
            }}
          />
        ))}
      </div>
    </div>
  )
}

function PedBody({ row }: { row: PedRow }) {
  const [selected, setSelected] = useState(0)

  return (
    <div className="grid grid-cols-2 gap-1.5">
      {row.models.map((model, index) => (
        <button
          key={model}
          type="button"
          aria-pressed={selected === index}
          onClick={() => setSelected(index)}
          className={cn(
            "ks-card flex items-center justify-between gap-2 px-2.5 py-2 text-left",
            selected === index && "ks-active-surface",
          )}
        >
          <span className="ks-mono truncate text-[10px] text-[var(--ks-text-dim)]">{model}</span>
          {selected === index ? <Check className="size-3 shrink-0" style={{ color: "var(--ks-accent)" }} /> : null}
        </button>
      ))}
    </div>
  )
}

function equippedValue(row: Row): string {
  switch (row.type) {
    case "picker":
      return "0"
    case "overlay":
      return "0"
    case "hair":
      return "2"
    case "sliders":
      return String(row.items.length)
    default:
      return "1"
  }
}

export function EditorRow({ row, defaultOpen }: { row: Row; defaultOpen?: boolean }) {
  const { theme } = useAppearanceTheme()
  const [open, setOpen] = useState(Boolean(defaultOpen))
  const Icon = row.icon

  return (
    <div className={cn("ks-card overflow-hidden", open && "ks-active-surface")}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-center gap-2.5 px-2.5 py-2.5 text-left"
      >
        {theme.rowIcons ? (
          <span
            className="grid size-6 shrink-0 place-items-center rounded-[4px] border"
            style={{
              borderColor: open ? "var(--ks-accent-line)" : "var(--ks-border)",
              background: open ? "var(--ks-accent-dim)" : "color-mix(in srgb, var(--ks-text) 6%, transparent)",
              color: open ? "var(--ks-accent)" : "var(--ks-text-dim)",
            }}
          >
            <Icon className="size-3.5" aria-hidden="true" />
          </span>
        ) : null}
        <span className="flex-1 truncate text-[12.5px] font-medium">{row.label}</span>
        {theme.equippedValues ? <Chip active={open}>{equippedValue(row)}</Chip> : null}
        <ChevronDown
          className={cn("size-3.5 transition-transform", open && "rotate-180")}
          style={{ color: open ? "var(--ks-accent)" : "var(--ks-text-faint)", transitionDuration: "var(--ks-duration)" }}
          aria-hidden="true"
        />
      </button>
      {open ? (
        <div className="ks-rise border-t px-2.5 pb-3 pt-3" style={{ borderColor: "var(--ks-border)" }}>
          {row.type === "picker" ? <PickerBody row={row} /> : null}
          {row.type === "overlay" ? <OverlayBody row={row} /> : null}
          {row.type === "sliders" ? <SliderBody row={row} /> : null}
          {row.type === "hair" ? <HairBody row={row} /> : null}
          {row.type === "peds" ? <PedBody row={row} /> : null}
        </div>
      ) : null}
    </div>
  )
}

export function TattooZoneCard({ zone }: { zone: TattooZone }) {
  const [value, setValue] = useState(zone.options[1] ?? zone.options[0])
  const [opacity, setOpacity] = useState(10)
  const [applied, setApplied] = useState(false)

  return (
    <div className="space-y-2 pb-4">
      <div className="flex items-center gap-1.5">
        <span className="size-1.5 rounded-full" style={{ background: "var(--ks-accent)" }} aria-hidden="true" />
        <Label>{zone.label}</Label>
      </div>
      <Select
        value={value}
        options={zone.options}
        onChange={(next) => {
          setValue(next)
          setApplied(false)
        }}
        ariaLabel={`${zone.label} tattoo`}
      />
      <div className="flex items-center justify-between">
        <Label>Opacity</Label>
        <span className="ks-mono text-[9.5px] tabular-nums text-[var(--ks-text-dim)]">1.0</span>
      </div>
      <Stepper
        value={opacity}
        max={10}
        onChange={setOpacity}
        format={(v) => (v / 10).toFixed(1)}
        ariaLabel={`${zone.label} opacity`}
      />
      <Button variant={applied ? "ghost" : "accent"} className="w-full" onClick={() => setApplied(true)}>
        {applied ? "Applied" : "Apply"}
      </Button>
    </div>
  )
}
