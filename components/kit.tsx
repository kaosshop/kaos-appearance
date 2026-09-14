"use client"

import type React from "react"
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("ks-label", className)}>{children}</span>
}

export function Chip({
  children,
  active,
  className,
}: {
  children: React.ReactNode
  active?: boolean
  className?: string
}) {
  return <span className={cn("ks-chip", active && "ks-chip-active", className)}>{children}</span>
}

export function Stepper({
  value,
  max,
  min = 0,
  onChange,
  format,
  ariaLabel,
}: {
  value: number
  max: number
  min?: number
  onChange: (next: number) => void
  format?: (value: number) => string
  ariaLabel: string
}) {
  const clamp = (n: number) => Math.min(max, Math.max(min, n))
  const progress = max === min ? 0 : ((value - min) / (max - min)) * 100

  return (
    <div className="ks-stepper" role="group" aria-label={ariaLabel}>
      <button type="button" className="ks-stepper-arrow" onClick={() => onChange(clamp(value - 1))} aria-label={`${ariaLabel} previous`}>
        <ChevronLeft className="size-3.5" />
      </button>
      <span className="ks-stepper-value tabular-nums">{format ? format(value) : value}</span>
      <button type="button" className="ks-stepper-arrow" onClick={() => onChange(clamp(value + 1))} aria-label={`${ariaLabel} next`}>
        <ChevronRight className="size-3.5" />
      </button>
      <span className="ks-stepper-track" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </span>
    </div>
  )
}

export function Range({
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  ariaLabel,
}: {
  value: number
  min?: number
  max?: number
  step?: number
  onChange: (next: number) => void
  ariaLabel: string
}) {
  return (
    <input
      type="range"
      className="ks-range"
      value={value}
      min={min}
      max={max}
      step={step}
      aria-label={ariaLabel}
      onChange={(e) => onChange(Number(e.target.value))}
    />
  )
}

export function Switch({
  checked,
  onChange,
  ariaLabel,
}: {
  checked: boolean
  onChange: (next: boolean) => void
  ariaLabel: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      className={cn("ks-switch", checked && "ks-switch-on")}
      onClick={() => onChange(!checked)}
    >
      <span className="ks-switch-thumb" />
    </button>
  )
}

export function Select({
  value,
  options,
  onChange,
  ariaLabel,
}: {
  value: string
  options: string[]
  onChange: (next: string) => void
  ariaLabel: string
}) {
  return (
    <div className="ks-select">
      <select value={value} aria-label={ariaLabel} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="size-4 ks-select-icon" aria-hidden="true" />
    </div>
  )
}

export function Button({
  children,
  variant = "ghost",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "accent" | "ghost" | "danger" | "quiet" }) {
  return (
    <button type="button" className={cn("ks-button", `ks-button-${variant}`, className)} {...props}>
      {children}
    </button>
  )
}
