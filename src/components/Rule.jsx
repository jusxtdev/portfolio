/* ASCII separators. Purely decorative, hidden from assistive tech. */

export function Rule() {
  return (
    <div className="rule" aria-hidden="true">
      {'+' + '-'.repeat(259) + '+'}
    </div>
  )
}

export function Dash({ className = 'dash' }) {
  return (
    <span className={className} aria-hidden="true">
      {'- '.repeat(130)}
    </span>
  )
}
