import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import { Rule } from '../components/Rule.jsx'
import Footer from '../components/Footer.jsx'
import usePageTitle from '../hooks/usePageTitle.js'
import { profile, projects, sortProjectsById } from '../data/content.js'

export default function Projects() {
  usePageTitle(`Projects | ${profile.name}`)
  const orderedProjects = sortProjectsById(projects)

  return (
    <div className="wrap">
      {/* <Rule /> */}

      <div className="phead">
        <Reveal as={Link} to="/" className="back">
          Back
        </Reveal>
        <Reveal as="h1" className="ptitle" delay={0.06}>
          Things I've <em>built.</em>
        </Reveal>
        <Reveal as="p" className="lead" delay={0.12}>
          Projects I'm building to learn how real backends are put together: what each one does, how it
          works, and what I learned.
        </Reveal>
        <Reveal className="pcount" delay={0.18}>
          {String(orderedProjects.length).padStart(2, '0')} projects
        </Reveal>
      </div>

      {orderedProjects.map((p, i) => (
        <div key={p.id}>
          <Rule />
          <section id={p.slug} className="proj">
            <Reveal className="label">
              <span>[{String(i + 1).padStart(2, '0')}]</span>
              <small>{p.status}</small>
              <small>{p.year}</small>
            </Reveal>

            <Reveal>
              <h2>{p.title}</h2>
              <p className="summary">{p.summary}</p>

              <ul>
                {p.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>

              <dl className="stack">
                <dt>Stack</dt>
                <dd>
                  {p.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </dd>
              </dl>

              {p.links.length > 0 && (
                <div className="links">
                  {p.links.map((l) => (
                    <a key={l.label} href={l.href} target="_blank" rel="noreferrer">
                      {l.label}
                    </a>
                  ))}
                </div>
              )}
            </Reveal>
          </section>
        </div>
      ))}

      <Footer />
    </div>
  )
}
