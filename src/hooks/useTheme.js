import { useCallback, useEffect, useState } from 'react'

/* Returns a toggle function. Theme choice deliberately resets on reload, so
   system preference remains the initial source of truth. */
export default function useTheme() {
  const [theme, setTheme] = useState(null)

  useEffect(() => {
    const root = document.documentElement
    if (theme) root.setAttribute('data-theme', theme)
    else root.removeAttribute('data-theme')
  }, [theme])

  return useCallback(() => {
    const current =
      theme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    const next = current === 'dark' ? 'light' : 'dark'
    setTheme(next)
  }, [theme])
}
