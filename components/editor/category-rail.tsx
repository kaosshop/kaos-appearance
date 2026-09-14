"use client"

import type { Category } from "@/lib/appearance-data"
import { cn } from "@/lib/utils"

export function CategoryRail({
  categories,
  activeId,
  onSelect,
}: {
  categories: Category[]
  activeId: string
  onSelect: (id: string) => void
}) {
  const edit = categories.filter((c) => c.group === "edit")
  const wear = categories.filter((c) => c.group === "wear")

  return (
    <nav className="ks-panel ks-rise flex w-[68px] flex-col gap-0.5 p-1.5" aria-label="Appearance categories">
      {edit.map((category) => (
        <RailButton
          key={category.id}
          category={category}
          active={category.id === activeId}
          onSelect={() => onSelect(category.id)}
        />
      ))}
      <span className="ks-label mt-2 mb-1 self-center">Wear</span>
      {wear.map((category) => (
        <RailButton
          key={category.id}
          category={category}
          active={category.id === activeId}
          onSelect={() => onSelect(category.id)}
        />
      ))}
    </nav>
  )
}

function RailButton({
  category,
  active,
  onSelect,
}: {
  category: Category
  active: boolean
  onSelect: () => void
}) {
  const Icon = category.icon
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex flex-col items-center gap-1 rounded-[var(--ks-radius)] border border-transparent px-1 py-2 transition-colors",
        active && "ks-active-surface",
      )}
      style={{
        color: active ? "var(--ks-accent)" : "var(--ks-text-dim)",
        transitionDuration: "var(--ks-duration)",
      }}
    >
      <Icon className="size-4" aria-hidden="true" />
      <span className="text-[9px] leading-none tracking-wide">{category.label}</span>
    </button>
  )
}
