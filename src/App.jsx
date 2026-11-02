import { useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import AsciiWall from './components/AsciiWall.jsx'
import ProgressBar from './components/ProgressBar.jsx'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import Projects from './pages/Projects.jsx'

/* On navigation: scroll to a requested section/hash, otherwise jump to top. */
function ScrollManager() {
  const { pathname, hash, state } = useLocation()

  useEffect(() => {
    const id = state?.scrollTo || (hash ? hash.slice(1) : null)
    if (id) {
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      })
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [pathname, hash, state])

  return null
}

export default function App() {
  return (
    <>
      <ProgressBar />
      <AsciiWall />
      <Header />
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
