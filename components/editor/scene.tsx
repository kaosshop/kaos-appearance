"use client"

import { Camera, PersonStanding, RotateCcw, Shirt, Sun, ZoomIn } from "lucide-react"
import { KsLogo } from "@/components/ks-logo"

export function SceneBackdrop() {
  return (
    <>
      <img
        src="/scene-character.png"
        alt="Character preview standing in the spawn location"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="ks-edge-wash" aria-hidden="true" />
    </>
  )
}

export function PreviewFrame() {
  const corners = [
    "left-0 top-0 border-l-2 border-t-2",
    "right-0 top-0 border-r-2 border-t-2",
    "left-0 bottom-0 border-l-2 border-b-2",
    "right-0 bottom-0 border-r-2 border-b-2",
  ]
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 h-[62%] w-[34%] -translate-x-1/2 -translate-y-1/2"
      aria-hidden="true"
    >
      {corners.map((corner) => (
        <span
          key={corner}
          className={`absolute size-6 ${corner}`}
          style={{ borderColor: "color-mix(in srgb, var(--ks-text) 55%, transparent)" }}
        />
      ))}
    </div>
  )
}

export function TitleOverlay({ category }: { category: string }) {
  return (
    <div className="ks-rise pointer-events-none absolute left-6 top-5 flex items-start gap-3">
      <span
        className="ks-card grid size-11 place-items-center"
        style={{ background: "var(--ks-accent-dim)", borderColor: "var(--ks-accent-line)", color: "var(--ks-accent)" }}
      >
        <KsLogo className="size-6" />
      </span>
      <span>
        <span className="ks-label" style={{ color: "var(--ks-accent)" }}>
          — Customize your character
        </span>
        <h1 className="mt-1 text-[26px] font-semibold leading-none tracking-tight">Appearance Editor</h1>
        <span className="ks-chip mt-2 inline-flex uppercase">{category}</span>
      </span>
    </div>
  )
}

export function SceneToolbar() {
  const tools = [
    { icon: ZoomIn, label: "Zoom" },
    { icon: Camera, label: "Head camera" },
    { icon: PersonStanding, label: "Body camera" },
    { icon: Shirt, label: "Outfit camera" },
    { icon: Sun, label: "Time of day" },
    { icon: RotateCcw, label: "Rotate character" },
  ]

  return (
    <div className="ks-panel absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-1 px-2 py-1.5">
      {tools.map(({ icon: Icon, label }) => (
        <button
          key={label}
          type="button"
          aria-label={label}
          className="grid size-8 place-items-center rounded-[var(--ks-radius)] text-[var(--ks-text-dim)] transition-colors hover:bg-[var(--ks-accent-dim)] hover:text-[var(--ks-accent)]"
        >
          <Icon className="size-4" />
        </button>
      ))}
    </div>
  )
}

export function EscHint({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="ks-card absolute bottom-5 left-6 flex items-center gap-2 px-2.5 py-1.5 text-[11px] text-[var(--ks-text-dim)]"
    >
      <span className="ks-chip">ESC</span>
      Cancel
    </button>
  )
}

export function BuildTag() {
  return (
    <div className="ks-label absolute right-6 top-5 flex items-center gap-2">
      Kaos Shop <span className="text-[var(--ks-text-dim)]">(b3258)</span>
      <span className="size-1.5 rounded-full" style={{ background: "var(--ks-accent)" }} aria-hidden="true" />
    </div>
  )
}
