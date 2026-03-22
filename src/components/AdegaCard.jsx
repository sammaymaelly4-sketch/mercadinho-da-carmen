import { memo } from 'react'
import { formatPreco, getAdegazDiscount, DESCONTO_FAIXAS } from '../lib/catalog'

const BADGE_CORES = {
  GELADA:   { bg:'rgba(0,212,255,0.15)',  borda:'#00D4FF', texto:'#00D4FF' },
  PACK:     { bg:'rgba(57,255,20,0.15)',   borda:'#39FF14', texto:'#39FF14' },
  HOT:      { bg:'rgba(255,107,53,0.15)',  borda:'#FF6B35', texto:'#FF6B35' },
  PREMIUM:  { bg:'rgba(255,60,172,0.15)',  borda:'#FF3CAC', texto:'#FF3CAC' },
  DESTAQUE: { bg:'rgba(255,215,0,0.15)',   borda:'#FFD700', texto:'#FFD700' },
  ESPECIAL: { bg:'rgba(200,146,42,0.2)',   borda:'#C8922A', texto:'#C8922A' },
  ESSENCIAL:{ bg:'rgba(255,255,255,0.08)',borda:'#555',    texto:'#aaa'    },
  NEW:      { bg:'rgba(57,255,20,0.15)',   borda:'#39FF14', texto:'#39FF14' },
}

function proximaFaixa(qty) {
  return DESCONTO_FAIXAS.find(f => f.min > qty) || null
}

const AdegaCard = memo(function AdegaCard({ produto, qty = 0, onAdd, onRemove, index = 0 }) {
  const badgeCor = produto.badge ? BADGE_CORES[produto.badge] : null
  const discount = produto.adega ? getAdegazDiscount(qty) : 0
  const precoFinal = produto.preco * (1 - discount)
  const proxFaixa = produto.adega ? proximaFaixa(qty) : null
  const neon = '#C8922A'

  return (
    <div
      className={`animate-fade-scale stagger-${(index % 4) + 1}`}
      style={{
        background: 'linear-gradient(145deg, #0f2d1c, #0a1a10)',
        borderRadius: 16,
        overflow: 'hidden',
        border: qty > 0 ? `1px solid ${neon}60` : '1px solid rgba(255,255,255,0.06)',
        position: 'relative',
        boxShadow: qty > 0 ? `0 0 16px ${neon}30, 0 4px 20px rgba(0,0,0,0.5)` : '0 4px 16px rgba(0,0,0,0.4)',
        transition: 'all 0.3s ease',
      }}
    >
      {badgeCor && (
        <div style={{
          position: 'absolute', top: 8, right: 8,
          background: badgeCor.bg,
          border: `1px solid ${badgeCor.borda}`,
          color: badgeCor.texto,
          fontSize: 9, fontWeight: 900,
          padding: '3px 8px', borderRadius: 99, zIndex: 2,
          letterSpacing: '.06em',
          textShadow: `0 0 6px ${badgeCor.borda}`,
          boxShadow: `0 0 8px ${badgeCor.borda}50`,
          animation: 'neonPulse 2s ease-in-out infinite',
        }}>
          {produto.badge}
        </div>
      )}

      <div style={{
        height: 80,
        background: `linear-gradient(135deg, ${neon}18, rgba(13,43,26,0.6))`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 40,
        boxShadow: qty > 0 ? `inset 0 0 20px ${neon}15` : 'none',
        transition: 'all 0.3s ease',
      }}>
        {produto.imageFallback}
      </div>

      <div style={{ padding: '10px 12px 12px' }}>
        <p style={{ fontSize: 13, fontWeight: 800, color: '#F0E8D8', lineHeight: 1.2, marginBottom: 2 }}>
          {produto.nome}
        </p>
        <small style={{ fontSize: 10, color: '#4a7a5a', fontWeight: 700, display: 'block', marginBottom: 8 }}>
          {produto.descricao}
        </small>

        {discount > 0 && (
          <div style={{
            background: 'rgba(245,200,66,0.12)', borderRadius: 8,
            padding: '3px 8px', marginBottom: 6, display: 'inline-block',
            border: '1px solid rgba(245,200,66,0.3)',
          }}>
            <span style={{ fontSize: 10, color: '#F5C842', fontWeight: 900 }}>
              -{Math.round(discount * 100)}% OFF
            </span>
          </div>
        )}

        {proxFaixa && qty > 0 && (
          <div style={{ marginBottom: 6 }}>
            <span style={{ fontSize: 9, color: 'rgba(200,146,42,0.6)', fontWeight: 700 }}>
              +{proxFaixa.min - qty} un → {proxFaixa.pct}% OFF
            </span>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            {discount > 0 && (
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', textDecoration: 'line-through', display: 'block', lineHeight: 1 }}>
                {formatPreco(produto.preco)}
              </span>
            )}
            <span style={{
              fontFamily: "'Fredoka One', cursive", fontSize: 17,
              color: '#F5C842',
              textShadow: qty > 0 ? '0 0 8px #F5C842' : 'none',
              transition: 'all 0.3s ease',
            }}>
              {formatPreco(precoFinal)}
            </span>
          </div>

          {qty === 0 ? (
            <button
              onClick={() => onAdd && onAdd(produto.id)}
              className="btn-press tap-target"
              style={{
                width: 34, height: 34,
                background: 'linear-gradient(135deg, #C8922A, #F5C842)',
                border: 'none', borderRadius: 10,
                color: '#060f08', fontSize: 20, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 900,
                boxShadow: '0 0 12px rgba(200,146,42,0.5)',
              }}
            >+</button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(200,146,42,0.12)', borderRadius: 10, padding: 2, border: '1px solid rgba(200,146,42,0.3)' }}>
              <button
                onClick={() => onRemove && onRemove(produto.id)}
                className="tap-target"
                style={{ width: 28, height: 28, borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.06)', color: '#F5C842', fontSize: 16, fontWeight: 900, cursor: 'pointer' }}
              >-</button>
              <span style={{ fontSize: 14, fontWeight: 900, color: '#F0E8D8', minWidth: 18, textAlign: 'center' }}>{qty}</span>
              <button
                onClick={() => onAdd && onAdd(produto.id)}
                className="btn-press tap-target"
                style={{ width: 28, height: 28, borderRadius: 8, background: '#C8922A', border: 'none', color: '#060f08', fontSize: 16, fontWeight: 900, cursor: 'pointer', boxShadow: '0 0 8px rgba(200,146,42,0.5)' }}
              >+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

export default AdegaCard
