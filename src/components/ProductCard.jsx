import { memo, useState, useEffect } from 'react'
import { resolveImage, formatPreco, CATEGORIAS } from '../lib/catalog'

const BADGE = {
  TOP:       { bg: '#E8622A', label: '⭐ TOP' },
  HOT:       { bg: '#E53935', label: '🔥 HOT' },
  NEW:       { bg: '#2D5A3D', label: '✨ NOVO' },
  FIT:       { bg: '#1976D2', label: '💪 FIT' },
  ESSENCIAL: { bg: '#6A1B9A', label: '✅ ESSENCIAL' },
}

const ProductImage = memo(function ProductImage({ produto }) {
  const cat = CATEGORIAS[produto.categoria]
  const bg = cat ? cat.bg : 'linear-gradient(135deg,#f5f5f5,#eee)'
  const [state, setState] = useState({ loading: true, url: null, emoji: null })

  useEffect(() => {
    let active = true
    resolveImage(produto).then(r => {
      if (!active) return
      if (r.type === 'fallback') setState({ loading: false, url: null, emoji: r.emoji })
      else setState({ loading: false, url: r.url, emoji: null })
    })
    return () => { active = false }
  }, [produto.id, produto.imageOverride])

  if (state.loading) {
    return (
      <div style={{ height: 120, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 24, height: 24, border: '3px solid rgba(0,0,0,.1)', borderTopColor: '#E8622A', borderRadius: '50%', animation: 'spin .8s linear infinite' }} />
      </div>
    )
  }

  if (state.url) {
    return (
      <div style={{ height: 120, background: bg, overflow: 'hidden' }}>
        <img
          src={state.url}
          alt={produto.nome}
          style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 8 }}
          onError={e => {
            e.target.style.display = 'none'
            e.target.parentElement.innerHTML = `<div style="height:120px;display:flex;align-items:center;justify-content:center;font-size:48px">${produto.imageFallback}</div>`
          }}
        />
      </div>
    )
  }

  return (
    <div style={{ height: 120, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>
      {state.emoji}
    </div>
  )
})

const ProductCard = memo(function ProductCard({ produto, qty = 0, onAdd, onRemove, index = 0 }) {
  const badge = produto.badge ? BADGE[produto.badge] : null
  const staggerClass = `stagger-${(index % 4) + 1}`

  return (
    <div className={`animate-fade-scale card-pressable ${staggerClass}`} style={{
      background: 'var(--card-bg)',
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
      border: '1px solid var(--border)',
      position: 'relative',
      boxShadow: 'var(--shadow)',
    }}>
      {badge && (
        <div style={{
          position: 'absolute',
          top: 8,
          left: 8,
          background: badge.bg,
          color: '#fff',
          fontSize: 'var(--fs-caption)',
          fontWeight: 900,
          padding: '3px 8px',
          borderRadius: 99,
          zIndex: 2,
          boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
        }}>
          {badge.label}
        </div>
      )}

      <ProductImage produto={produto} />

      <div style={{ padding: '12px' }}>
        <p style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text)', lineHeight: 1.2, marginBottom: 4 }}>
          {produto.nome}
        </p>
        <small style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: 12, height: '2.4em', overflow: 'hidden' }}>
          {produto.descricao}
        </small>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
          <span style={{ fontFamily: "'Fredoka One', cursive", fontSize: '20px', color: 'var(--accent)' }}>
            {formatPreco(produto.preco)}
          </span>

          {qty === 0 ? (
            <button
              onClick={() => onAdd && onAdd(produto.id)}
              className="btn-press tap-target"
              style={{
                width: 40,
                height: 40,
                background: 'var(--accent)',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontSize: 24,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                boxShadow: '0 4px 12px rgba(232, 98, 42, 0.35)',
                flexShrink: 0,
              }}
            >+</button>
          ) : (
            <div className="animate-bounce" style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(45,90,61,0.06)', borderRadius: 12, padding: '3px' }}>
              <button
                onClick={() => onRemove && onRemove(produto.id)}
                className="tap-target"
                style={{ width: 34, height: 34, borderRadius: 10, border: 'none', background: '#fff', color: 'var(--primary)', fontSize: 18, fontWeight: 900, cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.06)' }}
              >−</button>
              <span key={qty} className="animate-number-flip" style={{ fontSize: 16, fontWeight: 900, color: 'var(--text)', minWidth: 22, textAlign: 'center', display: 'block', overflow: 'hidden' }}>{qty}</span>
              <button
                onClick={() => onAdd && onAdd(produto.id)}
                className="btn-press tap-target"
                style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--accent)', border: 'none', color: '#fff', fontSize: 18, fontWeight: 900, cursor: 'pointer', boxShadow: '0 2px 6px rgba(232, 98, 42, 0.25)' }}
              >+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

export default ProductCard
