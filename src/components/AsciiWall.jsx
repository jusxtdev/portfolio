import { useEffect, useRef } from 'react'

/*
  ASCII motion wallpaper: a fixed <pre> re-rendered as text each frame.
  - three overlapping travelling waves form the base field
  - cursor halo with rings, click ripples, and ambient ripples every 5-9s
  - parallax on scroll; static single frame for prefers-reduced-motion
*/

const FS = 12 // font size (px)
const LH = 14 // line height (px)
const RAMP = ' .,:;-~=+*#' // light -> heavy glyphs
const FRAME_MS = 50 // ~20 fps

export default function AsciiWall() {
  const preRef = useRef(null)

  useEffect(() => {
    const pre = preRef.current
    if (!pre) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const L = RAMP.length

    let cw = 7.2 // measured character width
    let asp = LH / cw
    let cols = 0
    let rows = 0
    let mx = -999
    let my = -999
    let nextAuto = 1.5
    let pulses = []
    let raf = 0
    let last = 0

    function measure() {
      const probe = document.createElement('span')
      probe.style.cssText =
        'position:absolute;visibility:hidden;white-space:pre;font:' +
        FS + 'px ' + getComputedStyle(pre).fontFamily
      probe.textContent = 'MMMMMMMMMM'
      document.body.appendChild(probe)
      const w = probe.getBoundingClientRect().width / 10
      document.body.removeChild(probe)
      if (w > 3) cw = w
      asp = LH / cw
    }

    function size() {
      cols = Math.ceil(window.innerWidth / cw) + 2
      rows = Math.ceil((window.innerHeight * 1.14) / LH) + 1
    }

    function toCell(e) {
      const oy = -0.06 * window.innerHeight - window.scrollY * 0.05
      return { x: e.clientX / cw, y: (e.clientY - oy) / LH }
    }

    function frame(ts) {
      const t = ts / 1000
      const s = t * 0.55
      let out = ''

      if (!reduce && t > nextAuto) {
        pulses.push({ x: Math.random() * cols, y: Math.random() * rows, t0: t })
        nextAuto = t + 5 + Math.random() * 4
      }
      pulses = pulses.filter((p) => t - p.t0 <= 1.8)

      for (let y = 0; y < rows; y++) {
        let line = ''
        const wy = Math.sin(y * 0.075 - s * 0.8)
        const wy2 = y * 0.12 - s * 0.9
        for (let x = 0; x < cols; x++) {
          const f =
            Math.sin(x * 0.05 + s * 1.1 + 1.6 * wy) +
            0.7 * Math.sin(wy2 + x * 0.02) +
            0.5 * Math.sin((x * 0.6 + y) * 0.04 + s * 0.5)
          let v = (f + 2.2) / 4.4

          if (mx > -900) {
            const dx = x - mx
            const dy = (y - my) * asp
            const r2 = dx * dx + dy * dy
            if (r2 < 2500) {
              const r = Math.sqrt(r2)
              const g = Math.exp(-r2 / 450)
              v += g * 0.3 + g * 0.18 * Math.sin(r * 0.5 - t * 8)
            }
          }

          for (let i = 0; i < pulses.length; i++) {
            const p = pulses[i]
            const age = t - p.t0
            const px = x - p.x
            const py = (y - p.y) * asp
            const d = Math.sqrt(px * px + py * py) - age * 42
            v += 0.55 * Math.exp((-d * d) / 16) * (1 - age / 1.8)
          }

          let k = Math.floor(v * L)
          if (k < 0) k = 0
          if (k >= L) k = L - 1
          line += RAMP.charAt(k)
        }
        out += line + '\n'
      }
      pre.textContent = out
    }

    function loop(ts) {
      if (ts - last > FRAME_MS) {
        frame(ts)
        last = ts
      }
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e) => {
      const c = toCell(e)
      mx = c.x
      my = c.y
    }
    const onLeave = () => {
      mx = my = -999
    }
    const onDown = (e) => {
      const c = toCell(e)
      pulses.push({ x: c.x, y: c.y, t0: performance.now() / 1000 })
    }
    const onScroll = () => {
      pre.style.transform = `translateY(${(-window.scrollY * 0.05).toFixed(1)}px)`
    }
    const onResize = () => {
      size()
      frame(performance.now())
    }

    measure()
    size()
    frame(performance.now())
    onScroll()

    // re-measure once web fonts are ready so the grid matches the real glyph width
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        measure()
        size()
        frame(performance.now())
      })
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    document.documentElement.addEventListener('mouseleave', onLeave)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    if (!reduce) raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div className="wall" aria-hidden="true">
      <pre ref={preRef} />
    </div>
  )
}
