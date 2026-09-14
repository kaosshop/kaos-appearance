"use client"

import { useAppearanceTheme } from "@/lib/theme"
import { Label, Range, Switch } from "@/components/kit"

function SliderRow({
  label,
  value,
  display,
  min,
  max,
  onChange,
}: {
  label: string
  value: number
  display: string
  min: number
  max: number
  onChange: (next: number) => void
}) {
  return (
    <div className="py-2">
      <div className="flex items-baseline justify-between">
        <Label>{label}</Label>
        <span className="ks-mono text-[11px] tabular-nums" style={{ color: "var(--ks-accent)" }}>
          {display}
        </span>
      </div>
      <Range value={value} min={min} max={max} onChange={onChange} ariaLabel={label} />
    </div>
  )
}

export function InterfaceTab() {
  const { draft, setDraft } = useAppearanceTheme()

  return (
    <div className="space-y-5">
      <section>
        <Label className="mb-1 block">Shape</Label>
        <div className="divide-y" style={{ borderColor: "var(--ks-border)" }}>
          <SliderRow
            label="Corner radius"
            value={draft.radius}
            display={`${draft.radius}px`}
            min={0}
            max={16}
            onChange={(radius) => setDraft({ radius })}
          />
          <SliderRow
            label="Panel opacity"
            value={draft.panelOpacity}
            display={`${draft.panelOpacity}%`}
            min={40}
            max={100}
            onChange={(panelOpacity) => setDraft({ panelOpacity })}
          />
          <SliderRow
            label="Glow intensity"
            value={draft.glow}
            display={`${draft.glow}%`}
            min={0}
            max={100}
            onChange={(glow) => setDraft({ glow })}
          />
          <SliderRow
            label="Edge wash"
            value={draft.edgeWash}
            display={`${draft.edgeWash}%`}
            min={0}
            max={100}
            onChange={(edgeWash) => setDraft({ edgeWash })}
          />
        </div>
        <p className="ks-label mt-2 leading-relaxed">
          Edge wash tints both screen edges with your accent, fading toward the centre.
        </p>
      </section>

      <section>
        <Label className="mb-2 block">Motion</Label>
        <div className="ks-card flex items-center gap-3 px-3 py-2.5">
          <div className="flex-1">
            <p className="text-[12px] font-medium">Animations</p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-[var(--ks-text-dim)]">
              Entrance choreography, hover lifts and sliding indicators. Turn off for an instant, static interface.
            </p>
          </div>
          <Switch
            checked={draft.animations}
            onChange={(animations) => setDraft({ animations })}
            ariaLabel="Animations"
          />
        </div>
      </section>
    </div>
  )
}
