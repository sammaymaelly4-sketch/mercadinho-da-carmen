import { memo } from 'react'
import { formatPreco, getAdegazDiscount, DESCONTO_FAIXAS } from '../lib/catalog'

const BADGE_ADEGA = {
  GELADA:   { bg: '#1565C0', label: '🧊 GELADA' },
  PACK:     { bg: '#C8922A', label: '📦 PACK'   },
  HOT:      { bg: '#B71C1C', label: '🔥 HOT'    },
  ESSENCIAL:{ bg: '#2D5A3D', label: '✅ ESSENCIAL' },
}

// Próxima faixa de desconto (para mostrar incentivo)
function proximaFaixa(qty) {
  return DESCONTO_FAIXAS.find(f => f.min > qty) || null
}

const AdegaCard = memo(function AdegaCard({ produto, qty = 0, onAdd, onRemove, index = 0 }) {
  const badge = produto.badge ? BADGE_ADEGA[produto.badge] : null
  const discount = produto.adega ? getAdegazDiscount(qty) : 0
  const precoFinal = produto.preco * (1 - discount)
  const proxFaixa = produto.adega ? proximaFaixa(qty) : null

  return (
    <div
      className={`animate-fade-scale stagger-${(index % 4) + 1}`}
      style={{
        background: 'rgba(255,255,255,0.05)',
        borderRadius: 16,
        overflow: 'hidden',
        border: '1px solid rgba(200,146,42,0.25)',
        position: 'relative',
        backdropFilter: 'blur(8px)',
      }}
    >
      {badge && (
        <div style={{
          position: 'absolute', top: 8, left: 8,
          background: badge.bg, color: '#fff',
          fontSize: 9, fontWeight: 900,
          padding: '3px 8px', borderRadius: 99, zIndex: 2,
          letterSpacing: '.04em',
        }}>
          {badge.label}
        </div>
      )}

      {/* Imagem / emoji */}
      <div style={{
        height: 88,
        background: 'linear-gradient(135deg, rgba(200,146,42,0.15), rgba(13,43,26,0.6))',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 44,
      }}>
        {produto.imageFallback}
      </div>

      <div style={{ padding: '10px 12px 12px' }}>
        <p style={{ fontSize: 13, fontWeight: 800, color: '#F0E8D8', lineHeight: 1.2, marginBottom: 2 }}>
          {produto.nome}
        </p>
        <small style={{ fontSize: 10, color: '#C8922A', fontWeight: 700, display: 'block', marginBottom: 8 }}>
          {produto.descricao}
        </small>

        {/* Desconto ativo */}
        {discount > 0 && (
          <div style={{
            background: 'rgba(200,146,42,0.2)', borderRadius: 8,
            padding: '3px 8px', marginBottom: 8, display: 'inline-block',
          }}>
            <span style={{ fontSize: 10, color: '#F5C842', fontWeight: 900 }}>
              -{Math.round(discount * 100)}% desconto
            </span>
          </div>
        )}

        {/* Incentivo próxima faixa */}
        {proxFaixa && qty > 0 && (
          <div style={{ marginBottom: 6 }}>
            <span style={{ fontSize: 9, color: 'rgba(200,146,42,0.7)', fontWeight: 700 }}>
              +{proxFaixa.min - qty} un → {proxFaixa.pct}% OFF
            </span>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            {discount > 0 && (
              <span style={{ fontSize: 10, color: 'rgba(200,146,42,0.5)', textDecoration: 'line-through', display: 'block', lineHeight: 1 }}>
                {formatPreco(produto.preco)}
              </span>
            )}
            <span style={{ fontFamily: "'Fredoka One', cursive", fontSize: 17, color: '#F5C842' }}>
              {formatPreco(precoFinal)}
            </span>
          </div>

          {qty === 0 ? (
            <button
              onClick={() => onAdd && onAdd(produto.id)}
              className="btn-press tap-target"
              style={{
                width: 34, height: 34,
                background: '#C8922A', border: 'none',
                borderRadius: 10, color: '#fff',
                fontSize: 20, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 900,
                boxShadow: '0 4px 10px rgba(200,146,42,0.4)',
              }}
            >+</button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(200,146,42,0.12)', borderRadius: 10, padding: 2 }}>
              <button
                onClick={() => onRemove && onRemove(produto.id)}
                className="tap-target"
                style={{ width: 28, height: 28, borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.08)', color: '#F5C842', fontSize: 16, fontWeight: 900, cursor: 'pointer' }}
              >−</button>
              <span style={{ fontSize: 14, fontWeight: 900, color: '#F0E8D8', minWidth: 18, textAlign: 'center' }}>{qty}</span>
              <button
                onClick={() => onAdd && onAdd(produto.id)}
                className="btn-press tap-target"
                style={{ width: 28, height: 28, borderRadius: 8, background: '#C8922A', border: 'none', color: '#fff', fontSize: 16, fontWeight: 900, cursor: 'pointer' }}
              >+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

export default AdegaCard
