export default function SectionTitle({ title, actionLabel, onAction, actionColor, style }) {
  return (
    <div className="section-title" style={style}>
      <span className="section-title__text">{title}</span>
      {actionLabel ? (
        <button
          onClick={onAction}
          className="section-title__action btn-press"
          style={actionColor ? { color: actionColor } : undefined}
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  )
}
