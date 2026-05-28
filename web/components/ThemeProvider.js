'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { THEMES, DEFAULT_THEME } from '@/lib/themes'

const ThemeContext = createContext({ theme: DEFAULT_THEME, setTheme: () => {} })

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(DEFAULT_THEME)

  useEffect(() => {
    const saved = localStorage.getItem('pq-theme') || DEFAULT_THEME
    applyTheme(saved)
    setThemeState(saved)
  }, [])

  function setTheme(id) {
    localStorage.setItem('pq-theme', id)
    applyTheme(id)
    setThemeState(id)
  }

  function applyTheme(id) {
    const vars = THEMES[id]?.vars ?? THEMES[DEFAULT_THEME].vars
    const root = document.documentElement
    Object.entries(vars).forEach(([key, val]) => root.style.setProperty(key, val))
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
