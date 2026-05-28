'use client'
import { useTheme } from '@/components/ThemeProvider'
import { THEMES, THEME_IDS } from '@/lib/themes'

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      className="bg-game-card border border-game-border text-sm text-white rounded-lg px-2 py-1 outline-none cursor-pointer"
    >
      {THEME_IDS.map((id) => (
        <option key={id} value={id}>
          {THEMES[id].name}
        </option>
      ))}
    </select>
  )
}
