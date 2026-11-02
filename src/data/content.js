/* All editable content lives here. Replace placeholders before publishing. */

export const profile = {
  name: 'Dev Prajapati',
  email: 'jusxtdev@gmail.com',
  github: 'https://github.com/jusxtdev',
  linkedin: 'https://www.linkedin.com/in/jusxtdev/',
  year: 2026,
  status: 'Open to internships',
  tagline: 'Student / Backend / Systems',
  intro:
    'a third-year student learning backend engineering: APIs, databases, and the systems underneath them.',
}

export const stack = [
  { label: 'Languages', items: ['Go', 'C', 'Python', 'Javascript', 'TypeScript'] },
  { label: 'Backend', items: ['REST APIs', 'Auth', 'Middleware'] },
  { label: 'Data', items: ['PostgreSQL', 'Schema design', 'Indexing'] },
  { label: 'Core', items: ['Data structures', 'Operating systems', 'Networks'] },
]

export const now = [
  { label: 'Building', value: 'Learner PM backend' },
  { label: 'Learning', value: 'Go, databases, system design' },
  { label: 'Preparing', value: 'GATE CS' },
  { label: 'Aiming for', value: 'Systems-level engineering' },
]

/*
  Projects.
  - `blurb` is the short line shown on the Home page.
  - `summary`, `highlights`, `links` are shown on the Projects page.
  - `slug` becomes the URL hash: /projects#learner-pm
  - `links` entries: { label, href }. Leave empty to show no links.
*/
export const projects = [
  {
    id: 1,
    slug: 'cairn',
    title: 'Cairn',
    status: 'in progress',
    year: '2026',
    blurb:
      'A Linear-style project manager made for learners. Users, projects and tasks behind a clean REST API.',
    summary:
      'A Linear-style project management app built for people who are learning. The backend comes first; a frontend follows once the API is solid.',
    highlights: [
      'REST API in Go using the chi router',
      'Relational schema for users, projects and tasks',
      'Backend first, frontend planned afterwards',
    ],
    stack: ['Go', 'chi', 'SQL'],
    links: [
      { label: 'GitHub', href: 'https://github.com/jusxtdev/cairn' },
      { label: 'Live', href: 'https://learner-pm.vercel.app/' },
    ],
  },
  {
    id: 4,
    slug: 'project-three',
    title: 'Project title',
    status: 'planned',
    year: '2026',
    blurb: 'One line on what it does and what you learned.',
    summary: 'Two or three sentences on the problem, your approach and the outcome.',
    highlights: ['What you built', 'A hard problem you solved', 'What you would do next'],
    stack: ['Tech', 'Tech'],
    links: [{ label: 'Source', href: 'https://github.com/' }],
  },
   {
    id: 3,
    slug: 'project-two',
    title: 'Project title',
    status: 'planned',
    year: '2026',
    blurb: 'One line on what it does and what you learned.',
    summary: 'Two or three sentences on the problem, your approach and the outcome.',
    highlights: ['What you built', 'A hard problem you solved', 'What you would do next'],
    stack: ['Tech', 'Tech'],
    links: [{ label: 'Source', href: 'https://github.com/' }],
  },
  {
    id: 2,
    slug: 'kv-store',
    title: 'In-Memory Key-Value Store',
    status: 'completed',
    year: '2026',
    blurb: 'An in-memory key-value store with a REST API, WAL and snapshot support, built in Go.',
    summary: 'A simple in-memory key-value store with a REST API, write-ahead log and snapshot support. Built in Go to learn about data structures, concurrency and persistence.',
    highlights: ['In-memory key-value store', 'Write-ahead log', 'Snapshot support'],
    stack: ['Go', 'standard net/http'],
    links: [{ label: 'Source', href: 'https://github.com/jusxtdev/kv-store' }],
  },
]

export function sortProjectsById(projectList) {
  return [...projectList].sort((a, b) => a.id - b.id)
}
