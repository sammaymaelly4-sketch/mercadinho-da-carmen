import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPorId, CATEGORIAS, formatPreco } from '../lib/catalog'
import { useCartContext } from '../contexts/CartContext'

export default function Produto() {
  const { id } = useParams()
  const nav = useNavigate()
  const { items, add, remove, totalQty } = useCartContext()
  const produto = getPorId(id)
  const qty = items[id] || 0
  const [addedFlash, setAddedFlash] = useState(false)

  function handleAdd() {
    add(id)
    setAddedFlash(true)
    setTimeout(() => setAddedFlash(false), 600)
  }

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
      {/* TOPBAR */}
      <div className="animate-fade-in" style={{ background: 'var(--primary)', padding: '14px 16px', position: 'sticky', top: 0, zIndex: 10, display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <button onClick={() => nav(-1)} className="btn-press tap-target" style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
        <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 18, color: '#F0E8D8', flex: 1 }}>{cat ? cat.nome : 'Produto'}</div>
        <button onClick={() => nav('/carrinho')} className="btn-press tap-target" style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--accent)', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          🛒
          {totalQty > 0 && (
            <span key={totalQty} className="animate-bounce" style={{ position: 'absolute', top: -3, right: -3, background: '#fff', color: 'var(--accent)', fontSize: 10, fontWeight: 900, minWidth: 18, height: 18, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--accent)', padding: '0 3px' }}>
              {totalQty > 9 ? '9+' : totalQty}
            </span>
          )}
        </button>
      </div>

      {/* HERO IMAGE */}
      <div className="animate-fade-scale" style={{ background: cat ? cat.bg : '#f5f5f5', padding: '64px 20px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 120, position: 'relative', overflow: 'hidden' }}>
        {/* Decorative glow behind emoji */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', transform: 'translate(-50%, -55%)', filter: 'blur(30px)', animation: 'pulse 3s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: -10, left: 0, right: 0, height: 22, background: 'var(--bg)', borderRadius: '22px 22px 0 0' }} />
        <span key={qty} className={addedFlash ? 'animate-bounce' : ''} style={{ position: 'relative', zIndex: 1, filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.1))' }}>
          {produto.imageFallback}
        </span>
      </div>

      {/* PRODUCT INFO */}
      <div className="animate-slide-up stagger-1" style={{ padding: '28px 20px 16px', background: 'var(--bg)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontFamily: "'Fredoka One', cursive", fontSize: 30, color: 'var(--text)', lineHeight: 1.1, marginBottom: 8 }}>{produto.nome}</h1>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 600, lineHeight: 1.5 }}>{produto.descricao}</p>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <p className="animate-slide-up stagger-2" style={{ fontFamily: "'Fredoka One', cursive", fontSize: 34, color: 'var(--accent)', lineHeight: 1 }}>{formatPreco(produto.preco)}</p>
            <div style={{ background: 'var(--primary)', color: '#fff', fontSize: 11, fontWeight: 900, padding: '4px 8px', borderRadius: 99, display: 'inline-block', marginTop: 8, letterSpacing: '.04em' }}>EM ESTOQUE</div>
          </div>
        </div>
      </div>

      {/* QUANTITY STEPPER */}
      <div className="animate-slide-up stagger-2" style={{ padding: '20px', background: 'var(--card-bg)', margin: '0 20px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
        <p style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', marginBottom: 16 }}>Quantidade no pedido</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, background: 'rgba(45,90,61,0.05)', borderRadius: 16, padding: 4 }}>
            <button onClick={() => remove(id)} className="tap-target" style={{ width: 48, height: 48, borderRadius: 14, background: '#fff', border: 'none', fontSize: 26, color: 'var(--primary)', fontWeight: 900, cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
            <span key={qty} className="animate-number-flip" style={{ fontFamily: "'Fredoka One', cursive", fontSize: 26, color: 'var(--text)', minWidth: 32, textAlign: 'center', display: 'block', overflow: 'hidden' }}>{qty}</span>
            <button onClick={handleAdd} className="btn-press tap-target" style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--accent)', border: 'none', fontSize: 26, color: '#fff', fontWeight: 900, cursor: 'pointer', boxShadow: '0 4px 14px rgba(232, 98, 42, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
          </div>
          {qty > 0 && (
            <div className="animate-fade-in" style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 700 }}>Total do item</div>
              <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 22, color: 'var(--text)' }}>{formatPreco(produto.preco * qty)}</div>
            </div>
          )}
        </div>
      </div>

      {/* CTA BUTTON */}
      <div className="animate-slide-up stagger-3" style={{ padding: '28px 20px calc(28px + var(--safe-bottom))' }}>
        <button
          onClick={() => { if (qty === 0) handleAdd(); nav('/carrinho') }}
          className={`btn-press ${qty > 0 ? 'glow-btn' : ''}`}
          style={{ width: '100%', background: 'var(--accent)', border: 'none', borderRadius: 22, padding: '22px', fontFamily: "'Fredoka One', cursive", fontSize: 21, color: '#fff', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, transition: 'opacity 0.2s' }}
        >
          {qty > 0 ? '🛒 Ver meu carrinho' : '🛒 Adicionar ao carrinho'}
          {qty > 0 && <span style={{ background: 'rgba(255,255,255,0.25)', borderRadius: 99, padding: '2px 10px', fontSize: 16 }}>{qty}</span>}
        </button>
      </div>
    </div>
  )
}
