export default function ScreenHeader({
  title,
  subtitle,
  left,
  right,
  sticky = true,
  className = '',
}) {
  return (
    <header className={`screen-header animate-fade-in ${sticky ? 'screen-header--sticky' : ''} ${className}`.trim()}>
      <div className="screen-header__row">
        {left ? <div className="screen-header__side">{left}</div> : null}
        <div className="screen-header__content">
          {typeof title === 'string' ? <h1 className="screen-header__title">{title}</h1> : title}
          {subtitle ? <p className="screen-header__subtitle">{subtitle}</p> : null}
        </div>
        {right ? <div className="screen-header__side screen-header__side--right">{right}</div> : null}
      </div>
    </header>
  )
}
