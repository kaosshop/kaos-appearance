import { AppearanceThemeProvider } from "@/lib/theme"
import { AppearanceEditor } from "@/components/editor/appearance-editor"

export default function Page() {
  return (
    <AppearanceThemeProvider>
      <AppearanceEditor />
    </AppearanceThemeProvider>
  )
}
