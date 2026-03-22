import { memo } from 'react'
import { formatPreco } from '../lib/catalog'

const ComboCard = memo(function ComboCard({ combo, onAdd }) {
  return (
    <div
      className="animate-fade-scale btn-press"
      style={{
        background: combo.cor,
        borderRadius: 20,
        padding: '20px 16px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: `0 8px 24px ${combo.cor}44`,
        minHeight: 160,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      onClick={() => onAdd && onAdd(combo.id)}
    >
      {/* Emoji de fundo decorativo */}
      <div style={{
        position: 'absolute', right: -8, top: -8,
        fontSize: 72, opacity: 0.15,
        transform: 'rotate(12deg)',
        lineHeight: 1,
      }}>
        {combo.emoji}
      </div>

      {/* Badge economia */}
      <div style={{
        position: 'absolute', top: 12, right: 12,
        background: 'rgba(0,0,0,0.25)',
        borderRadius: 99, padding: '3px 10px',
        fontSize: 'var(--fs-caption)', fontWeight: 900,
        color: '#fff',
      }}>
        💰 Economize {formatPreco(combo.economia)}
      </div>

      <div style={{ zIndex: 1 }}>
        <div style={{ fontSize: 28, marginBottom: 6 }}>{combo.emoji}</div>
        <div style={{
          fontFamily: "'Fredoka One', cursive",
          fontSize: 17,
          color: combo.corTexto,
          lineHeight: 1.2,
          marginBottom: 4,
        }}>
          {combo.nome}
        </div>
        <div style={{
          fontSize: 'var(--fs-body-sm)', color: 'rgba(243,237,221,0.9)',
          fontWeight: 700, lineHeight: 1.4,
          marginBottom: 12,
        }}>
          {combo.desc}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 1 }}>
        <div>
          <div style={{ fontSize: 'var(--fs-caption)', color: 'rgba(243,237,221,0.72)', textDecoration: 'line-through', fontWeight: 700 }}>
            {formatPreco(combo.precoOriginal)}
          </div>
          <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 22, color: '#fff' }}>
            {formatPreco(combo.preco)}
          </div>
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.2)',
          borderRadius: 12, padding: '8px 16px',
          fontSize: 12, fontWeight: 900, color: '#fff',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255,255,255,0.25)',
        }}>
          Quero esse →
        </div>
      </div>
    </div>
  )
})

export default ComboCard
