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
      <div style={{ height: 95, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 24, height: 24, border: '3px solid rgba(0,0,0,.1)', borderTopColor: '#E8622A', borderRadius: '50%', animation: 'spin .8s linear infinite' }} />
      </div>
    )
  }

  if (state.url) {
    return (
      <div style={{ height: 95, background: bg, overflow: 'hidden' }}>
        <img
          src={state.url}
          alt={produto.nome}
          style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 8 }}
          onError={e => {
            e.target.style.display = 'none'
            e.target.parentElement.innerHTML = `<div style="height:95px;display:flex;align-items:center;justify-content:center;font-size:42px">${produto.imageFallback}</div>`
          }}
        />
      </div>
    )
  }

  return (
    <div style={{ height: 95, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 42 }}>
      {state.emoji}
    </div>
  )
})

const ProductCard = memo(function ProductCard({ produto, qty = 0, onAdd, onRemove, index = 0 }) {
  const badge = produto.badge ? BADGE[produto.badge] : null
  const staggerClass = `stagger-${(index % 4) + 1}`

  return (
    <div className={`animate-fade-scale ${staggerClass}`} style={{
      background: 'var(--card-bg)',
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
      border: '1px solid var(--border)',
      position: 'relative',
      boxShadow: 'var(--shadow)',
      transition: 'transform 0.2s ease'
    }}>
      {badge && (
        <div style={{
          position: 'absolute',
          top: 8,
          left: 8,
          background: badge.bg,
          color: '#fff',
          fontSize: '10px',
          fontWeight: 900,
          padding: '3px 8px',
          borderRadius: 99,
          zIndex: 2,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          {badge.label}
        </div>
      )}

      <ProductImage produto={produto} />

      <div style={{ padding: '12px' }}>
        <p style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text)', lineHeight: 1.2, marginBottom: 4, textShadow: '0 0 5px rgba(255,255,255,0.3)' }}>
          {produto.nome}
        </p>
        <small style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: 12, height: '2.4em', overflow: 'hidden' }}>
          {produto.descricao}
        </small>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
          <span style={{ fontFamily: "'Fredoka One', cursive", fontSize: '18px', color: 'var(--primary)', textShadow: '0 0 8px var(--primary)' }}>
            {formatPreco(produto.preco)}
          </span>

          {qty === 0 ? (
            <button
              onClick={() => onAdd && onAdd(produto.id)}
              className="btn-press tap-target"
              style={{
                width: 36,
                height: 36,
                background: 'var(--primary)',
                border: '1px solid var(--accent)',
                borderRadius: '12px',
                color: '#fff',
                fontSize: 22,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                boxShadow: '0 4px 10px rgba(255, 0, 127, 0.4)'
              }}
            >+</button>
          ) : (
            <div className="animate-bounce" style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,0,127,0.1)', borderRadius: 12, padding: '2px', border: '1px solid var(--primary)' }}>
              <button
                onClick={() => onRemove && onRemove(produto.id)}
                className="tap-target"
                style={{ width: 30, height: 30, borderRadius: 10, border: '1px solid var(--primary)', background: 'var(--bg)', color: 'var(--primary)', fontSize: 18, fontWeight: 900, cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}
              >−</button>
              <span style={{ fontSize: 15, fontWeight: 900, color: 'var(--text)', minWidth: 20, textAlign: 'center', textShadow: '0 0 5px var(--accent)' }}>{qty}</span>
              <button
                onClick={() => onAdd && onAdd(produto.id)}
                className="btn-press tap-target"
                style={{ width: 30, height: 30, borderRadius: 10, background: 'var(--primary)', border: '1px solid var(--accent)', color: '#fff', fontSize: 18, fontWeight: 900, cursor: 'pointer', boxShadow: '0 0 8px var(--primary)' }}
              >+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

export default ProductCard
