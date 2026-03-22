export default function IconCircleButton({
  children,
  onClick,
  variant = 'neutral',
  className = '',
  style,
  ...props
}) {
  return (
    <button
      onClick={onClick}
      className={`icon-circle-button btn-press tap-target icon-circle-button--${variant} ${className}`.trim()}
      style={style}
      {...props}
    >
      {children}
    </button>
  )
}
