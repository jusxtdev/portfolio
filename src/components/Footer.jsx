import { Rule } from './Rule.jsx'
import { profile } from '../data/content.js'

export default function Footer() {
  return (
    <>
      <Rule />
      <footer>
        <span>
          (c) {profile.year} {profile.name}
        </span>
        <a href="#home">
          Back to top ^
        </a>
      </footer>
    </>
  )
}
