import { useParams, useNavigate } from 'react-router-dom'
import { getPorId, CATEGORIAS, formatPreco } from '../lib/catalog'
import { useCartContext } from '../contexts/CartContext'

export default function Produto() {
  const { id } = useParams()
  const nav = useNavigate()
  const { items, add, remove, totalQty } = useCartContext()
  const produto = getPorId(id)
  const qty = items[id] || 0

  if (!produto) {
    return (
      <div className="screen animate-fade-in" style={{ padding: 40, textAlign: 'center' }}>
        <p style={{ fontSize: 18, color: 'var(--text-muted)' }}>Produto não encontrado.</p>
        <button onClick={() => nav(-1)} className="btn-press" style={{ marginTop: 20, padding: '12px 24px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 12 }}>Voltar</button>
      </div>
    )
  }

  const cat = CATEGORIAS[produto.categoria]

  return (
    <div className="screen">
      <div className="animate-fade-in" style={{ background: 'var(--primary)', padding: '14px 16px', position: 'sticky', top: 0, zIndex: 10, display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <button onClick={() => nav(-1)} className="btn-press tap-target" style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
        <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 18, color: '#F0E8D8', flex: 1 }}>{cat ? cat.nome : 'Produto'}</div>
        <button onClick={() => nav('/carrinho')} className="btn-press tap-target" style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--accent)', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          🛒
          {totalQty > 0 && (
            <span className="animate-bounce" style={{ position: 'absolute', top: -3, right: -3, background: '#fff', color: 'var(--accent)', fontSize: '10px', fontWeight: 900, width: 18, height: 18, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--accent)' }}>
              {totalQty}
            </span>
          )}
        </button>
      </div>

      <div className="animate-fade-scale" style={{ background: cat ? cat.bg : '#f5f5f5', padding: '60px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 120, position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: -10, left: 0, right: 0, height: 20, background: 'var(--bg)', borderRadius: '20px 20px 0 0' }} />
        <span className="animate-bounce">{produto.imageFallback}</span>
      </div>

      <div className="animate-slide-up stagger-1" style={{ padding: '24px 20px 16px', background: 'var(--bg)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontFamily: "'Fredoka One', cursive", fontSize: 28, color: 'var(--text)', lineHeight: 1.1, marginBottom: 8 }}>{produto.nome}</h1>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 600, lineHeight: 1.4 }}>{produto.descricao}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontFamily: "'Fredoka One', cursive", fontSize: 32, color: 'var(--accent)' }}>{formatPreco(produto.preco)}</p>
            <div style={{ background: 'var(--primary)', color: '#fff', fontSize: 10, fontWeight: 900, padding: '4px 8px', borderRadius: 99, display: 'inline-block', marginTop: 8 }}>EM ESTOQUE</div>
          </div>
        </div>
      </div>

      <div className="animate-slide-up stagger-2" style={{ padding: '20px', background: 'var(--card-bg)', margin: '0 20px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
        <p style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 16 }}>Quantidade no pedido</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, background: 'rgba(45,90,61,0.05)', borderRadius: 16, padding: 4 }}>
            <button onClick={() => remove(id)} className="tap-target" style={{ width: 44, height: 44, borderRadius: 12, background: '#fff', border: 'none', fontSize: 24, color: 'var(--primary)', fontWeight: 900, cursor: 'pointer', boxShadow: '0 4px 8px rgba(0,0,0,0.05)' }}>−</button>
            <span className="animate-bounce" key={qty} style={{ fontFamily: "'Fredoka One', cursive", fontSize: 24, color: 'var(--text)', minWidth: 30, textAlign: 'center' }}>{qty}</span>
            <button onClick={() => add(id)} className="btn-press tap-target" style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--accent)', border: 'none', fontSize: 24, color: '#fff', fontWeight: 900, cursor: 'pointer', boxShadow: '0 4px 12px rgba(232, 98, 42, 0.3)' }}>+</button>
          </div>
          {qty > 0 && (
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700 }}>Total do item</div>
              <div className="animate-fade-in" style={{ fontFamily: "'Fredoka One', cursive", fontSize: 20, color: 'var(--text)' }}>{formatPreco(produto.preco * qty)}</div>
            </div>
          )}
        </div>
      </div>

      <div className="animate-slide-up stagger-3" style={{ padding: '32px 20px calc(24px + var(--safe-bottom))' }}>
        <button
          onClick={() => { if (qty === 0) add(id); nav('/carrinho') }}
          className="btn-press"
          style={{ width: '100%', background: 'var(--accent)', border: 'none', borderRadius: 20, padding: '20px', fontFamily: "'Fredoka One', cursive", fontSize: 20, color: '#fff', cursor: 'pointer', boxShadow: '0 10px 30px rgba(232, 98, 42, 0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12 }}
        >
          🛒 {qty > 0 ? 'Ver meu carrinho' : 'Adicionar ao carrinho'}
        </button>
      </div>
    </div>
  )
}
