import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useTheme from '../hooks/useTheme.js'
import { profile } from '../data/content.js'

/* Nav entries: `section` scrolls to a Home section, `to` opens a route. */
const NAV = [
  { label: 'Work', section: 'work' },
  { label: 'Stack', section: 'stack' },
  { label: 'Now', section: 'now' },
  { label: 'Contact', section: 'contact' },
]

export default function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const toggleTheme = useTheme()
  const [active, setActive] = useState('')
  const onHome = pathname === '/'

  /* highlight the Home section currently in view */
  useEffect(() => {
    if (!onHome || !('IntersectionObserver' in window)) {
      setActive('')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    document.querySelectorAll('section[id]').forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [onHome])

  const goSection = (e, id) => {
    e.preventDefault()
    if (onHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/', { state: { scrollTo: id } })
    }
  }

  return (
    <header className="top">
      <div className="wrap in">
        <Link to="/">{profile.name}</Link>
        <nav>
          {NAV.map((item) => (
            <a
              key={item.label}
              href={`/#${item.section}`}
              className={onHome && active === item.section ? 'on' : ''}
              onClick={(e) => goSection(e, item.section)}
            >
              {item.label}
            </a>
          ))}
          <button className="theme" onClick={toggleTheme} aria-label="Toggle theme">
            Theme
          </button>
        </nav>
      </div>
    </header>
  )
}
