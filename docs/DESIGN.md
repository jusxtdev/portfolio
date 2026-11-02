# Portfolio Page: Design Document

Single-page personal portfolio for a 3rd-year CS student focused on backend and systems engineering. This document describes the current design completely so another agent can maintain, extend or rebuild it without guessing.

- **Deliverable:** one self-contained file, `index.html` (inline CSS and JS, no build step, no dependencies besides Google Fonts).
- **Status:** content is placeholder-level (name, email, links, projects 02 and 03 must be replaced by the owner).
- **Date of this spec:** 2026-11-02.

---

## 1. Concept and mood

A quiet, terminal-flavoured editorial page. Think "premium laptop abstract wallpaper" translated into ASCII: a faint, slowly moving field of text characters behind clean typography.

Keywords: **minimal, monochrome, ASCII, hairline, editorial serif + mono, restrained motion, one muted accent.**

### Owner's explicit preferences (from feedback during design)

These are constraints, not suggestions. Do not reverse them without asking the owner.

| Preference | Detail |
|---|---|
| Abstract wallpaper vibe | Originally asked for abstract wallpapers like those on premium laptops |
| Minimal, **not gradient-y** | Gradients/blobs were removed. No gradient fills anywhere in the UI |
| **No generic glass + rounded UI** | No backdrop blur, no frosted cards, no rounded corners, no pill buttons |
| Distinctive fonts | Serif display + monospace body (not a default sans) |
| Readable text | Background must never compete with text; lines/characters kept faint and masked behind content |
| Colour | Went blue, then teal, finally **monochrome + desaturated maroon**. Current palette is final unless asked |
| ASCII design | Wants ASCII motifs for UI elements and an **ASCII motion background** |
| Stack section | Must be row-based (label + inline items), not columns |
| Contact links | Small, same size as body text (not large serif) |
| Disliked | The hero ASCII diagram `client -> API -> database` was removed. Do not re-add it |

---

## 2. File and tech

- Single file: `index.html`. Sections of the file in order: `<style>`, markup, `<script>` (one IIFE).
- No framework, no bundler, no images, no icon fonts. All decoration is text or CSS.
- External resource: Google Fonts (`Instrument Serif` regular + italic, `JetBrains Mono` 400/500). Fallbacks defined, so the page works offline with system fonts.
- Browser targets: current evergreen browsers. Uses CSS custom properties, `clamp()`, `mask-image` (with `-webkit-` prefix), `IntersectionObserver` (with fallback), `requestAnimationFrame`.

---

## 3. Design tokens

All colours live in CSS custom properties on `:root`.

### 3.1 Colour

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#ecebea` | `#0f0f0f` | Page + header + wallpaper background |
| `--fg` | `#121212` | `#eeeeee` | Primary text, ASCII wallpaper glyph colour |
| `--muted` | `#575757` | `#a4a4a4` | Secondary text, labels, descriptions, nav default |
| `--line` | `rgba(18,18,18,.35)` | `rgba(238,238,238,.35)` | ASCII rules and dash rows |
| `--accent` | `#7a2f3b` (muted maroon) | `#c07784` (lighter rose-maroon) | See accent usage list below |
| `--ink` | `.17` | `.15` | Opacity of the ASCII wallpaper layer |

Fonts tokens: `--serif: "Instrument Serif","Times New Roman",serif` and `--mono: "JetBrains Mono",ui-monospace,Menlo,monospace`.

Theme resolution order:
1. `<html data-theme="light|dark">` (set by the toggle button) wins.
2. Otherwise `prefers-color-scheme` decides (`:root:not([data-theme="light"])` inside the dark media query).
3. Default is light.

The dark-theme variables are intentionally declared twice (media query and `[data-theme="dark"]`). Keep them in sync when editing.

**Accent usage (and nothing else):** italic word in H1, blinking `[*]` status marker, `>` prefix before the name in the header, active/hover `[ ]` brackets on nav links, `{ }` hover on theme button, section number labels, `# ` prefix on `dt`, project title colour on hover, `->` arrow on project hover, "[in progress]" tag, dash-row colour on hover, `->` before the email, link hover colours, footer link hover, text selection background, focus outline, scroll progress bar.

Keep accent usage sparse. Do not use it for large fills.

### 3.2 Typography

| Role | Font | Size | Notes |
|---|---|---|---|
| Body | JetBrains Mono | `15px`, line-height `1.75` | `-webkit-font-smoothing: antialiased` |
| H1 | Instrument Serif 400 | `clamp(46px, 9vw, 112px)`, line-height `.98`, letter-spacing `-.025em`, `max-width: 13ch` | `<em>` is italic + accent |
| Project title (H3) | Instrument Serif 400 | `clamp(26px, 4vw, 38px)`, line-height `1.1`, letter-spacing `-.01em` | |
| Lead paragraph | Mono | 15px | colour `--muted`, `max-width: 46ch`; bold name uses `--fg`, weight 500 |
| Header, labels, status, dt, footer, hero-foot | Mono | `12px` | uppercase (not footer), letter-spacing `.04em` to `.06em` |
| Project meta (`.t`) | Mono | `13px` | muted, right-aligned |
| Tag (`[in progress]`) | Mono | `11px`, uppercase, `.06em` | accent |
| ASCII rules / dashes | Mono | `13px` | colour `--line` |

Rules: serif only for H1 and project titles. Everything else is mono. No bold weights beyond 500.

### 3.3 Shape, spacing, layout constants

- **No border-radius anywhere.** Sharp edges only. No box-shadows, no backdrop-filter.
- Content container `.wrap`: `max-width: 960px`, `margin: 0 auto`, horizontal padding `28px`.
- Section layout (desktop): CSS grid `150px 1fr`, gap `20px`, padding `38px 0 50px`.
- Header height `64px`. `scroll-padding-top: 80px` on `html`.
- Separators are **text characters**, not CSS borders (see 5.3).

---

## 4. Page structure (top to bottom)

```
[progress bar, fixed, 2px]
[wallpaper <pre>, fixed, behind everything]
header.top (sticky)
.wrap#home
  .rule
  .hero
  .rule
  section#work      [01]
  .rule
  section#stack     [02]
  .rule
  section#now       [03]
  .rule
  section#contact   [04]
  .rule
  footer
```

### 4.1 Header (`header.top`)
- Sticky, `top:0`, `z-index:20`, solid `--bg` background (no blur, no border).
- Left: site name link to `#home`, with an accent `> ` prefix (via `::before`). Placeholder text: "Your Name".
- Right nav: `Work`, `Stack`, `Now`, `Contact`, then the theme button.
- Nav link behaviour: default muted. On hover or when it is the active section (`.on`): colour becomes `--fg` and accent `[` `]` brackets fade in (opacity 0 to 1, 0.2s) around the label. Brackets are `::before` / `::after`.
- Theme button: text "Theme", uppercase, muted. Wrapped with `{ ` and ` }` via pseudo-elements. Hover turns accent. Clicking toggles light/dark.
- Active link tracking uses `IntersectionObserver` on `section[id]` with `rootMargin: -40% 0px -55% 0px`.

### 4.2 Hero (`.hero`)
- `min-height: calc(100vh - 64px - 21px)`; flex column, `justify-content: flex-end`; padding `60px 0 36px`. Content sits at the bottom of the first screen.
- Elements, in order, each with the `.rv` reveal class and staggered `--d` delays:
  1. **Status** (`.status`, delay 0): `[*]` in accent that blinks (`steps(1)`, 1.2s) + text "Open to internships". 12px uppercase muted.
  2. **H1** (delay .08s): "Backend, built *quietly.*" (italic accent on "quietly.").
  3. **Lead** (delay .16s): "I'm **Your Name**, a third-year CS student learning backend engineering: APIs, databases, and the systems underneath them."
  4. **Hero foot** (delay .3s): flex row, space-between. Left: `Student / Backend / Systems`. Right: link `Scroll v` to `#work` (accent on hover). `margin-top: 56px`.
- Spacing: status `margin-bottom 28px`; lead `margin-top 34px`.

### 4.3 Section `#work` ([01] Work)
Left column label: `[01]` (accent, block) above `Work` (muted uppercase 12px). Right column: list of project rows.

**Project row** (`a.row.rv`, whole row is a link):
- Grid `56px 1fr auto`, gap `14px`, `align-items: baseline`, padding `22px 0` (first row has no top padding).
- First child is `.dash`: spans all columns, a line of repeating `- ` characters, 16px high, `--line` colour, `margin-bottom:-6px`.
- Then: index `[01]` (muted 12px) | content block | tech meta (`Go . chi . SQL`) right-aligned, no wrap.
- Content block: H3 title + optional `.arr` (`->`, accent, hidden by default) + optional `.tag`; below it a description `p` (muted, `max-width 52ch`, `margin-top 6px`).
- **Hover:** row padding-left animates to `6px`; dash row turns accent; title turns accent; `->` slides in (translateX -8px to 0) and fades in.
- Row stagger delays: 0, .06s, .12s.

**Current content:**
1. Learner PM `[in progress]` — "A Linear-style project manager made for learners. Users, projects and tasks behind a clean REST API." — `Go . chi . SQL`
2. Placeholder "Project title" — "One line on what it does and what you learned." — `Tech . Tech`
3. Placeholder "Project title" — same — `Tech . Tech`

Links are `href="#"` placeholders.

### 4.4 Section `#stack` ([02] Stack)
`dl.stack`: grid `120px 1fr`, gap `8px 20px`. Each `dt` (muted uppercase 12px, prefixed with accent `# `) paired with a `dd` containing `<span>` items. Items are inline-block with a `|` separator between them (via `span:not(:last-child)::after`, muted, 60% opacity, 10px left margin). Item hover turns accent.

Content:
- Languages: Go | C | Python | SQL
- Backend: REST APIs | Auth | Middleware
- Data: PostgreSQL | Schema design | Indexing
- Core: Data structures | Operating systems | Networks

### 4.5 Section `#now` ([03] Now)
Same `dl` styling (without `.stack` modifier): `dt` + `dd` plain text.
- Building: Learner PM backend
- Learning: Go, databases, system design
- Preparing: GATE CS
- Aiming for: Systems-level engineering

### 4.6 Section `#contact` ([04] Contact)
- Email link (`.mail`): `href="mailto:you@example.com"`, 15px mono, same size as body. Accent `-> ` prefix. On hover: colour accent and letter-spacing grows to `.03em` (0.25s).
- Below (`margin-top 14px`): `.links` flex row, gap `26px`, muted: `GitHub` and `LinkedIn`, each wrapped as `[ GitHub ]` with `[ ` / ` ]` pseudo-elements. Hover turns `--fg`.
- Placeholders: `you@example.com`, `https://github.com/`, `https://linkedin.com/`.

### 4.7 Footer
Flex row, space-between, muted 12px, padding `6px 0 48px`. Left `(c) 2026 Your Name`. Right link `Back to top ^` to `#home` (accent on hover). Preceded by a final ASCII rule.

---

## 5. Signature systems

### 5.1 ASCII motion wallpaper
A fixed full-viewport `<pre id="ascii">` inside `.wall` (`aria-hidden`, `z-index:-1`, `overflow:hidden`, `user-select:none`) re-rendered as text each frame.

**Layout**
- `font-size 12px`, `line-height 14px`, `white-space: pre`, `left:0`, `top:-6%`, colour `--fg`, opacity `--ink`.
- Cell width `cw` is measured at start by rendering 10 `M` characters in the computed font; fallback `7.2px`. `cols = ceil(innerWidth/cw)+2`, `rows = ceil(innerHeight*1.14/LH)+1`. Recomputed on `resize`.
- **Readability mask (desktop):** horizontal `mask-image: linear-gradient(90deg, #000 0, rgba(0,0,0,.28) 26%, rgba(0,0,0,.28) 74%, #000 100%)`. Characters are at full strength at the left/right edges and 28% in the centre column where text lives.
- **At `max-width: 960px`:** mask removed, opacity becomes `calc(var(--ink) * .6)`.

**Glyph ramp:** `' .,:;-~=+*#'` (11 chars, lightest to heaviest). Value `v` in 0..1 picks an index: `floor(v * 11)`, clamped.

**Base field** (per cell, `s = t * 0.55`, `t` in seconds):
```
wy  = sin(y*.075 - s*.8)
wy2 = y*.12 - s*.9
f   = sin(x*.05 + s*1.1 + 1.6*wy)
    + .7 * sin(wy2 + x*.02)
    + .5 * sin((x*.6 + y)*.04 + s*.5)
v   = (f + 2.2) / 4.4
```
Three overlapping travelling waves, producing slowly drifting bands.

**Cursor halo** (pointer present; skip cells with `r² >= 2500`): distance is aspect-corrected (`dy *= LH/cw`). `g = exp(-r²/450)`; `v += g*.3 + g*.18*sin(r*.5 - t*8)`. Result: denser characters around the pointer with small outgoing rings.

**Pulses (expanding rings):**
- Created on `pointerdown` at the click position, and automatically at a random cell every 5 to 9 seconds (first at t > 1.5s). Auto pulses are disabled for reduced motion.
- Each pulse lives 1.8s. Ring radius = `age * 42` cells. Contribution: `v += .55 * exp(-d²/16) * (1 - age/1.8)` where `d = distance - radius`.

**Pointer coordinate mapping:** `x = clientX / cw`, `y = (clientY - oy) / LH` with `oy = -0.06*innerHeight - scrollY*0.05` to account for the layer offset and parallax. Pointer reset on `mouseleave` of `documentElement`.

**Timing:** `requestAnimationFrame` loop, rendering only if more than 50ms since the last render (about 20 fps). `pre.textContent` is replaced each frame. With `prefers-reduced-motion: reduce`: a single static frame, no loop, no auto pulses.

**Parallax:** on scroll, `pre.style.transform = translateY(-scrollY * 0.05 px)`.

**Tuning knobs**
| Knob | Where | Effect |
|---|---|---|
| `--ink` | CSS | Overall visibility of the wallpaper |
| `.28` in mask | CSS | How much the wallpaper fades behind content |
| `s = t*.55` | JS | Overall flow speed |
| `42` | JS | Ring expansion speed (cells/second) |
| `ramp` | JS | Character palette/density |
| `50` (ms) | JS | Frame interval (lower = smoother, heavier) |

### 5.2 Reveal-on-scroll
Elements with `.rv` start at `opacity 0; translateY(12px)` and transition to visible (`.8s`, ease for opacity, `cubic-bezier(.2,.7,.2,1)` for transform) with `transition-delay: var(--d, 0s)`. An `IntersectionObserver` (`threshold .12`) adds `.in` once and then unobserves. Without `IntersectionObserver`, all get `.in` immediately.

### 5.3 ASCII separators
- **Section rule** (`.rule`, JS-filled): `+` + 259 `-` + `+`, one per section boundary, hero top and footer top. `height 21px; overflow hidden; white-space nowrap; font 13px/21px; colour var(--line); user-select none`. The long string is clipped by the container.
- **Row dash** (`.dash`, JS-filled): 259 repetitions of `- `.

These strings are generated in JS (`data-rule`, `data-dash` attributes mark targets). If JS fails, separators are simply absent (acceptable degradation).

### 5.4 Scroll progress bar
`.progress`: fixed top, `2px` high, full width, `--accent` background, `transform-origin: 0 50%`, scaled on X from 0 to 1 by scroll fraction. `z-index:30`.

### 5.5 Theme toggle
On click: determines current mode (explicit `data-theme` if set, else system preference) and sets `data-theme` to the opposite. No persistence (not saved to localStorage; resets on reload). Colours transition over `.4s` on `body`, `.wall` and header.

---

## 6. Responsive behaviour

| Breakpoint | Changes |
|---|---|
| `max-width: 960px` | Wallpaper mask removed; opacity lowered to 60% of `--ink` |
| `max-width: 640px` | Sections stack to one column (gap 14px). Project rows use `40px 1fr`; tech meta moves under the content (`grid-column 2`, left-aligned, may wrap). `dl` label column 100px. Nav gap 12px and only the first two nav links (Work, Stack) remain visible plus the theme button (`nav a:nth-child(n+3)` hidden). Hero foot stacks vertically |

Hero H1 scales fluidly with `clamp`. ASCII rules are clipped, so they adapt to any width.

---

## 7. Accessibility

- Text colours were chosen to keep body text legible over the wallpaper; the wallpaper is `aria-hidden`.
- Focus: `:focus-visible` shows a `1px dashed` accent outline with `4px` offset.
- Theme button has `aria-label="Toggle theme"`.
- Honours `prefers-reduced-motion`: reveal animations disabled, blink disabled, smooth scroll disabled, wallpaper static.
- Wallpaper text is `user-select:none`; `::selection` uses accent background and `--bg` text.
- Known gaps (see section 9): nav items hidden on small screens, hover-only affordances, ASCII separators are read by some screen readers (could add `aria-hidden="true"` to `.rule`/`.dash` elements).

---

## 8. Interaction summary

| Trigger | Result |
|---|---|
| Page load | Hero elements fade/slide in with stagger; wallpaper begins drifting; blinking `[*]` |
| Scroll | Progress bar fills; wallpaper parallax; sections reveal; active nav link gets `[ ]` |
| Hover nav link | `[ ]` brackets appear, colour to `--fg` |
| Hover project row | Row shifts right, dash + title turn accent, `->` appears |
| Hover stack item / link / email | Accent colour (email also widens letter-spacing) |
| Mouse move | Dense halo with rings around cursor in the wallpaper |
| Click | Expanding ASCII ring from the click point |
| Click Theme | Toggle light/dark with 0.4s colour transition |

---

## 9. Known issues and cleanup list

1. **Dead CSS:** `.flow` and `.flow b` rules remain from the removed hero diagram. Safe to delete.
2. Theme choice is not persisted.
3. Wallpaper rebuilds a large string each frame (roughly 200x80 cells). Fine on desktops; on low-end devices consider lowering frame rate, using a `<canvas>` with `fillText`, or caching columns.
4. Cursor/click effects are mouse-only in practice; touch devices see drifting field and ambient pulses only (tap also creates a pulse via `pointerdown`).
5. Fonts load from Google Fonts; no self-hosted fallback files.
6. `.rule` / `.dash` text should get `aria-hidden="true"`.
7. Placeholders to fill: name (header, lead, footer), email, GitHub, LinkedIn, project 02/03 content, project links (`href="#"`), `<title>`.
8. No meta description, Open Graph tags or favicon yet.
9. The mobile nav hides Now and Contact links; consider a compact menu.
10. A stray blank line and comment indentation inside the script (before `/* ascii rules */`) is cosmetic.

---

## 10. How to extend (conventions for other agents)

- **Add a project:** copy an existing `a.row.rv` block in `#work`; increase the `[0N]` index, set a staggered `--d` (+0.06s), keep the `<span class="dash" data-dash>` as the first child, and keep the title structure `<h3>Title <span class="arr">-&gt;</span></h3>`. Optional `<span class="tag">[in progress]</span>` after the arrow.
- **Add a stack line:** add `<dt>` + `<dd><span>..</span><span>..</span></dd>` to `dl.stack`. Separators are automatic.
- **Add a section:** add a `.rule` div, then `<section id="x">` with `.label.rv` (`<span>[0N]</span>Name`) and content wrapper, and add a nav link `href="#x"`. The active-nav observer picks up any `section[id]`.
- **Change palette:** edit only the custom properties in `:root` (light) and both dark blocks. Keep accent desaturated and sparse.
- **Do not:** add gradients, blur/glass, rounded corners, box shadows, emoji, stock imagery, or extra typefaces. Do not add the client/API/database ASCII diagram. Do not enlarge the contact links. Do not raise `--ink` or lift the centre mask in ways that hurt text legibility.

---

## 11. Acceptance checklist

- [ ] Light and dark modes both look correct; toggle works; system preference respected on first load.
- [ ] Wallpaper animates, reacts to the cursor and click, and is clearly secondary to the text (verify at 100% zoom on laptop width).
- [ ] No gradient fills, blur, rounded corners or shadows anywhere.
- [ ] Only accent usages from section 3.1 exist; accent never used as a large fill.
- [ ] ASCII rules span the container at all widths with no horizontal scroll on the page.
- [ ] Layout holds at 1440px, 960px, 640px and 375px widths.
- [ ] Reduced-motion setting produces a static wallpaper and no reveal/blink animation.
- [ ] Keyboard tab order is logical and focus outlines are visible.
- [ ] All placeholder content replaced before publishing.

---

## Appendix A. React version (supersedes the single-file structure)

The page now ships as a Vite + React app (see `README.md` for the file tree). Visual design, tokens, ASCII wallpaper and interactions in this document are unchanged and implemented as follows:

| Spec section | Where it lives |
|---|---|
| 3. Tokens, 3.2 Typography | `src/styles.css` (top of file) |
| 4.1 Header | `src/components/Header.jsx` |
| 4.2 to 4.6 Sections | `src/pages/Home.jsx`, content in `src/data/content.js` |
| 4.7 Footer | `src/components/Footer.jsx` |
| 5.1 ASCII wallpaper | `src/components/AsciiWall.jsx` (mounted once in `App.jsx`, persists across routes) |
| 5.2 Reveal | `src/components/Reveal.jsx` + `src/hooks/useReveal.js` |
| 5.3 ASCII separators | `src/components/Rule.jsx` (`Rule`, `Dash`) |
| 5.4 Progress bar | `src/components/ProgressBar.jsx` |
| 5.5 Theme toggle | `src/hooks/useTheme.js` (now persisted) + early script in `index.html` |

### New: Projects page (`/projects`)

- Reached from: nav link "Projects", the "[ View all projects -> ]" link under the Work list on Home, and each Home project row (which deep-links to `/projects#<slug>`).
- Layout: ASCII rule, intro block (`<- Back` link, serif title "Things I've *built.*" with italic accent word, lead paragraph, `NN projects` count), then one section per project separated by ASCII rules.
- Per project section (same 150px label column + content grid as Home sections): left label shows `[NN]`, status and year; right shows serif title (`clamp(30px, 5vw, 50px)`), muted summary (max 56ch), highlights list with accent `- ` bullets, a Stack row (pipe-separated like Home), and optional `[ Link ]` buttons.
- The targeted project (`:target`) title turns accent.
- Header nav marks "Projects" active (`[ ]` brackets) on this route.
- Footer and wallpaper identical to Home.
- Constraints from section 1 and section 10 apply: no gradients, glass, rounded corners or shadows; keep accent sparse.

### Updated known-issues list
Resolved: theme persistence, `aria-hidden` on ASCII separators, dead `.flow` CSS, nothing else. Still open: meta/OG tags and favicon, mobile nav hides Stack/Now/Contact, performance of the string-per-frame wallpaper on low-end devices, placeholders to fill (see `src/data/content.js`).
