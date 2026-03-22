export default function PrimaryButton({ children, variant = 'accent', className = '', style, ...props }) {
  return (
    <button
      className={`primary-button btn-press primary-button--${variant} ${className}`.trim()}
      style={style}
      {...props}
    >
      {children}
    </button>
  )
}
