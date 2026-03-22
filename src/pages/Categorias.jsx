import { useNavigate, useParams } from 'react-router-dom'
import { CATEGORIAS, getPorCategoria } from '../lib/catalog'
import { useCartContext } from '../contexts/CartContext'
import ProductCard from '../components/ProductCard'

export function Categorias() {
  const nav = useNavigate()
  return (
    <div className="screen">
      <div className="animate-fade-in" style={{ background: 'var(--primary)', padding: '16px 16px 14px', position: 'sticky', top: 0, zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 21, color: '#F0E8D8' }}>Categorias</div>
      </div>
      <div style={{ padding: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {Object.values(CATEGORIAS).map((c, i) => (
          <div key={c.id} onClick={() => nav('/categoria/' + c.id)} className="animate-fade-scale btn-press card-pressable" style={{
            background: 'var(--card-bg)',
            borderRadius: 'var(--radius)',
            padding: '28px 16px',
            border: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
            cursor: 'pointer',
            boxShadow: 'var(--shadow)',
            animationDelay: `${i * 0.05}s`
          }}>
            <div style={{
              width: 84,
              height: 84,
              borderRadius: '26px',
              background: c.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 42,
              border: '2px solid ' + c.cor + '22',
              boxShadow: '0 8px 20px rgba(0,0,0,0.06)'
            }}>
              {c.emoji}
            </div>
            <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: '17px', color: 'var(--text)' }}>{c.nome}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 700 }}>{getPorCategoria(c.id).length} produtos</div>
          </div>
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

  if (!cat) return (
    <div className="screen" style={{ padding: 40, textAlign: 'center' }}>
      <p style={{ fontSize: 18, color: 'var(--text-muted)' }}>Categoria não encontrada.</p>
      <button onClick={() => nav('/')} className="btn-press" style={{ marginTop: 20, padding: '12px 24px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 12 }}>Voltar</button>
    </div>
  )

  return (
    <div className="screen">
      <div className="animate-fade-in" style={{ background: 'var(--primary)', padding: '14px 16px', position: 'sticky', top: 0, zIndex: 10, display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <button onClick={() => nav(-1)} className="btn-press tap-target" style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
        <span style={{ fontSize: 24 }}>{cat.emoji}</span>
        <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: '19px', color: '#F0E8D8', flex: 1 }}>{cat.nome}</div>
        <button onClick={() => nav('/carrinho')} className="btn-press tap-target" style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--accent)', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          🛒
          {totalQty > 0 && (
            <span key={totalQty} className="animate-bounce" style={{ position: 'absolute', top: -3, right: -3, background: '#fff', color: 'var(--accent)', fontSize: 10, fontWeight: 900, minWidth: 18, height: 18, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--accent)', padding: '0 3px' }}>
              {totalQty > 9 ? '9+' : totalQty}
            </span>
          )}
        </button>
      </div>

      {/* Filter pills with scroll-snap */}
      <div style={{ padding: '12px 0 0', display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none', paddingLeft: 16, paddingRight: 16, scrollSnapType: 'x mandatory' }}>
        {Object.values(CATEGORIAS).map((c, i) => (
          <button key={c.id} onClick={() => nav('/categoria/' + c.id)} className="animate-fade-in"
            style={{
              flexShrink: 0,
              padding: '10px 20px',
              borderRadius: 99,
              border: c.id === id ? 'none' : '1px solid var(--border)',
              cursor: 'pointer',
              fontFamily: "'Nunito', sans-serif",
              fontSize: 13,
              fontWeight: 900,
              background: c.id === id ? 'var(--accent)' : 'var(--card-bg)',
              color: c.id === id ? '#fff' : 'var(--text-muted)',
              boxShadow: c.id === id ? '0 4px 14px rgba(232, 98, 42, 0.25)' : 'none',
              scrollSnapAlign: 'start',
              transition: 'all 0.2s ease',
              animationDelay: `${i * 0.05}s`
            }}>
            {c.emoji} {c.nome}
          </button>
        ))}
      </div>

      {/* Product grid with staggered entry */}
      <div style={{ padding: '14px 16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {produtos.map((p, i) => (
            <ProductCard key={p.id} produto={p} index={i} qty={items[p.id] || 0} onAdd={add} onRemove={remove} />
          ))}
        </div>
        <div style={{ height: 40 }} />
      </div>
    </div>
  )
}
