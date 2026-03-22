export default function CardSurface({ as: Component = 'div', children, className = '', style, ...props }) {
  return (
    <Component className={`card-surface ${className}`.trim()} style={style} {...props}>
      {children}
    </Component>
  )
}
