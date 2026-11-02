import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import { Rule, Dash } from '../components/Rule.jsx'
import Footer from '../components/Footer.jsx'
import usePageTitle from '../hooks/usePageTitle.js'
import { profile, projects, sortProjectsById, stack, now } from '../data/content.js'

export default function Home() {
  usePageTitle(`${profile.name} | Backend Portfolio`)
  const featuredProjects = sortProjectsById(projects).slice(0, 3)

  return (
    <div className="wrap" id="home">
      {/* <Rule /> */}

      {/* hero */}
      <div className="hero">
        <Reveal className="status">
          <i>[*]</i>
          {profile.status}
        </Reveal>
        <Reveal as="h1" delay={0.08}>
          Learning backend <em>engineering</em>
        </Reveal>
        <Reveal as="p" className="lead" delay={0.16}>
          I'm <b>{profile.name}</b>, {profile.intro}
        </Reveal>
        <Reveal className="hero-foot" delay={0.3}>
          <span>{profile.tagline}</span>
          <a
            href="/#work"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Scroll v
          </a>
        </Reveal>
      </div>

      {/* work */}
      <Rule />
      <section id="work">
        <Reveal className="label">
          <span>[01]</span>Work
        </Reveal>
        <div>
          {featuredProjects.map((p, i) => (
            <Reveal
              as="div"
              key={p.id}
              className="row"
              delay={i * 0.06}
            >
              <span className="n">[{String(i + 1).padStart(2, '0')}]</span>
              <div>
                <h3>
                  {p.title}
                  {p.status === 'in progress' && <span className="tag">[in progress]</span>}
                </h3>
                <p>{p.blurb}</p>
              </div>
              <div className="project-meta">
                <span className="t">{p.stack.join(' . ')}</span>
                {p.links.length > 0 && (
                  <div className="project-links">
                    {p.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={link.label}
                        title={link.label}
                      >
                        {isGitHubLink(link) ? <GitHubIcon /> : <LiveUrlIcon />}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          ))}

          <Reveal className="more" delay={0.18}>
            <Link to="/projects" className="more-link">
              View all projects <span>-&gt;</span>
            </Link>
          </Reveal>

        </div>
      </section>

      {/* stack */}
      <Rule />
      <section id="stack">
        <Reveal className="label">
          <span>[02]</span>Stack
        </Reveal>
        <Reveal as="dl" className="stack">
          {stack.map((g) => (
            <GroupRow key={g.label} label={g.label}>
              {g.items.map((it) => (
                <span key={it}>{it}</span>
              ))}
            </GroupRow>
          ))}
        </Reveal>
      </section>

      {/* now */}
      <Rule />
      <section id="now">
        <Reveal className="label">
          <span>[03]</span>Now
        </Reveal>
        <Reveal as="dl">
          {now.map((n) => (
            <GroupRow key={n.label} label={n.label}>
              {n.value}
            </GroupRow>
          ))}
        </Reveal>
      </section>

      {/* contact */}
      <Rule />
      <section id="contact">
        <Reveal className="label">
          <span>[04]</span>Contact
        </Reveal>
        <Reveal className="contact">
          <a className="mail" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <div className="links">
            <a target='_blank' href={profile.github}>GitHub</a>
            <a target='_blank' href={profile.linkedin}>LinkedIn</a>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  )
}

function isGitHubLink(link) {
  return /github|source/i.test(`${link.label} ${link.href}`)
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 1024 1024" aria-hidden="true">
      <path
        fill="currentColor"
        stroke="none"
        d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
        transform="scale(64)"
      />
    </svg>
  )
}

function LiveUrlIcon() {
  return <ExternalLink aria-hidden="true" />
}

function GroupRow({ label, children }) {
  return (
    <>
      <dt>{label}</dt>
      <dd>{children}</dd>
    </>
  )
}
