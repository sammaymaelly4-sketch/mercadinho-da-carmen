import { useNavigate, useParams } from 'react-router-dom'
import { CATEGORIAS, getPorCategoria } from '../lib/catalog'
import { useCartContext } from '../contexts/CartContext'
import ProductCard from '../components/ProductCard'
import ScreenHeader from '../components/ScreenHeader'
import IconCircleButton from '../components/IconCircleButton'
import CardSurface from '../components/CardSurface'
import PrimaryButton from '../components/PrimaryButton'

export function Categorias() {
  const nav = useNavigate()
  return (
    <div className="screen">
      <ScreenHeader title="Categorias" />
      <div style={{ padding: 'var(--space-16)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-16)' }}>
        {Object.values(CATEGORIAS).map((c, i) => (
          <CardSurface
            key={c.id}
            onClick={() => nav('/categoria/' + c.id)}
            className="animate-fade-scale btn-press"
            style={{
              padding: '24px 16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              cursor: 'pointer',
              animationDelay: `${i * 0.05}s`,
            }}
          >
            <div style={{ width: 80, height: 80, borderRadius: 24, background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, border: '2px solid ' + c.cor + '22', boxShadow: '0 8px 16px rgba(0,0,0,0.05)' }}>
              {c.emoji}
            </div>
            <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 16, color: 'var(--text)' }}>{c.nome}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700 }}>{getPorCategoria(c.id).length} produtos</div>
          </CardSurface>
        ))}
      </div>
    </div>
  )
}

export function CategoriaPage() {
  const { id } = useParams()
  const nav = useNavigate()
  const { items, add, remove, totalQty } = useCartContext()
  const cat = CATEGORIAS[id]
  const produtos = getPorCategoria(id)

  if (!cat) {
    return (
      <div className="screen" style={{ padding: 40, textAlign: 'center' }}>
        <p style={{ fontSize: 18, color: 'var(--text-muted)' }}>Categoria não encontrada.</p>
        <PrimaryButton onClick={() => nav('/')} style={{ marginTop: 20, width: 'auto', padding: '12px 24px', borderRadius: 12, fontSize: 16 }}>
          Voltar
        </PrimaryButton>
      </div>
    )
  }

  return (
    <div className="screen">
      <ScreenHeader
        left={<IconCircleButton onClick={() => nav(-1)}>←</IconCircleButton>}
        title={<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ fontSize: 24 }}>{cat.emoji}</span><span className="screen-header__title">{cat.nome}</span></div>}
        right={(
          <IconCircleButton onClick={() => nav('/carrinho')} variant="accent">
            🛒
            {totalQty > 0 && (
              <span className="animate-bounce" style={{ position: 'absolute', top: -3, right: -3, background: '#fff', color: 'var(--accent)', fontSize: 10, fontWeight: 900, width: 18, height: 18, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--accent)' }}>
                {totalQty}
              </span>
            )}
          </IconCircleButton>
        )}
      />

      <div style={{ padding: '16px 16px 4px', display: 'flex', gap: 10, overflowX: 'auto', scrollbarWidth: 'none', margin: '0 -16px' }}>
        {Object.values(CATEGORIAS).map((c, i) => (
          <button
            key={c.id}
            onClick={() => nav('/categoria/' + c.id)}
            className="animate-fade-in"
            style={{
              flexShrink: 0,
              padding: '8px 16px',
              borderRadius: 99,
              border: c.id === id ? 'none' : '1px solid var(--border)',
              cursor: 'pointer',
              fontFamily: "'Nunito', sans-serif",
              fontSize: 13,
              fontWeight: 900,
              background: c.id === id ? 'var(--accent)' : 'var(--card-bg)',
              color: c.id === id ? '#fff' : 'var(--text-muted)',
              boxShadow: c.id === id ? '0 4px 12px rgba(232, 98, 42, 0.2)' : 'none',
              animationDelay: `${i * 0.05}s`,
            }}
          >
            {c.emoji} {c.nome}
          </button>
        ))}
      </div>

      <div style={{ padding: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {produtos.map((p, i) => (
            <ProductCard key={p.id} produto={p} index={i} qty={items[p.id] || 0} onAdd={add} onRemove={remove} />
          ))}
        </div>
        <div style={{ height: 40 }} />
      </div>
    </div>
  )
}
