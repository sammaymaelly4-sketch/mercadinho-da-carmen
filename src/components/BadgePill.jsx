export default function BadgePill({ children, className = '', style }) {
  return (
    <span className={`badge-pill ${className}`.trim()} style={style}>
      {children}
    </span>
  )
}
