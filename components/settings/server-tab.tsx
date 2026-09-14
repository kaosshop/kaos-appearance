"use client"

import { useAppearanceTheme } from "@/lib/theme"
import { Chip, Label, Switch } from "@/components/kit"

export function ServerTab() {
  const { draft, setDraft } = useAppearanceTheme()

  return (
    <div className="space-y-4">
      <Label className="block">Server theme</Label>

      <div className="ks-card px-3 py-3">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <p className="text-[12px] font-medium">Admin mode</p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-[var(--ks-text-dim)]">
              When saved, this theme is applied to every player on the server. Turn it off and save to restore
              individual themes.
            </p>
          </div>
          <Switch checked={draft.adminMode} onChange={(adminMode) => setDraft({ adminMode })} ariaLabel="Admin mode" />
        </div>
        {draft.adminMode ? (
          <Chip active className="mt-2.5 inline-flex">
            Global theme active
          </Chip>
        ) : null}
      </div>

      <p className="text-[11px] leading-relaxed text-[var(--ks-text-dim)]">
        Permission comes from the ace <span className="ks-mono">kaos.theme.admin</span> or framework admin groups.
        Personal themes are stored per player; the global theme is broadcast to everyone and wins until cleared.
      </p>
    </div>
  )
}
