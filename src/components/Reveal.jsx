import useReveal from '../hooks/useReveal.js'

/* Fade/slide-in wrapper. `as` can be any tag or component (e.g. Link). */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
  const ref = useReveal()
  return (
    <Tag
      ref={ref}
      className={`rv ${className}`.trim()}
      style={{ '--d': `${delay}s`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
