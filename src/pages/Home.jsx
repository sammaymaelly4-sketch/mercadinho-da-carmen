import { useNavigate } from 'react-router-dom'
import { useCartContext } from '../contexts/CartContext'
import { getDestaques, getPorCategoria, CATEGORIAS, formatPreco } from '../lib/catalog'
import ProductCard from '../components/ProductCard'

const CATS_ORDER = ['bebidas', 'snacks', 'higiene', 'limpeza', 'gelo']

const FLASH = [
  { label: 'Cerveja Pack 12x', sub: '50% OFF',  cor: '#E8622A', emoji: '🍺' },
  { label: 'Gelo 1kg',         sub: 'R$ 5,00',  cor: '#2D5A3D', emoji: '🧊' },
  { label: 'Monster + Gelo',   sub: 'Combo',    cor: '#1E3D2A', emoji: '⚡' },
  { label: 'Kit Higiene',      sub: 'R$ 29,90', cor: '#6A1B9A', emoji: '🧴' },
]

export default function Home() {
  const nav = useNavigate()
  const { items, add, remove, totalQty } = useCartContext()
  const destaques = getDestaques()

  return (
    <div className="screen">
      {/* TOPBAR */}
      <div className="animate-fade-in" style={{ background: 'var(--primary)', padding: '16px 16px 12px', position: 'sticky', top: 0, zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: '20px', color: '#F0E8D8' }}>Mercadinho da Carmen</div>
            <div style={{ fontSize: '10px', color: '#C4A882', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' }}>📍 Vila São José · Taubaté</div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => nav('/perfil')} className="btn-press tap-target" style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,.15)', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👤</button>
            <button onClick={() => nav('/carrinho')} className="btn-press tap-target" style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--accent)', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              🛒
              {totalQty > 0 && (
                <span className="animate-bounce" style={{ position: 'absolute', top: -3, right: -3, background: '#fff', color: 'var(--accent)', fontSize: '10px', fontWeight: 900, width: 18, height: 18, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--accent)' }}>
                  {totalQty}
                </span>
              )}
            </button>
          </div>
        </div>
        <div onClick={() => nav('/categorias')} className="btn-press" style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,.15)', borderRadius: 14, padding: '12px 16px', cursor: 'pointer' }}>
          <span style={{ fontSize: 16 }}>🔍</span>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: 700 }}>O que você precisa hoje?</span>
        </div>
      </div>

      {/* HERO */}
      <div className="animate-fade-in stagger-1" style={{ background: 'var(--primary-dark)', padding: '24px 16px 0', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', minHeight: 120, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 16, background: 'var(--bg)', borderRadius: '16px 16px 0 0' }} />
        <div style={{ zIndex: 1, paddingBottom: 24 }}>
          <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: '24px', color: '#fff', lineHeight: 1.15, marginBottom: 8 }}>
            Chegou em<br /><span style={{ color: 'var(--accent)' }}>20 minutos!</span>
          </div>
          <div style={{ fontSize: '12px', color: '#C4A882', fontWeight: 700, lineHeight: 1.4, maxWidth: 180 }}>
            Entregas rápidas e produtos fresquinhos para o seu bairro.
          </div>
          <div style={{ background: 'var(--accent)', color: '#fff', fontSize: '10px', fontWeight: 900, padding: '4px 12px', borderRadius: 99, display: 'inline-block', marginTop: 12, letterSpacing: '.06em' }}>
            ⚡ ENTREGA RÁPIDA
          </div>
        </div>
        <div className="animate-bounce" style={{ fontSize: 64, zIndex: 1, paddingBottom: 12 }}>🛵</div>
      </div>

      {/* CATEGORIAS */}
      <div className="animate-slide-up stagger-2" style={{ padding: '4px 16px 0' }}>
        <div style={{ display: 'flex', gap: 16, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 8 }}>
          {CATS_ORDER.map(cid => {
            const c = CATEGORIAS[cid]
            return (
              <div key={cid} onClick={() => nav('/categoria/' + cid)} className="btn-press" style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <div style={{ width: 64, height: 64, borderRadius: '20px', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, border: '2px solid ' + c.cor + '22', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                  {c.emoji}
                </div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text)' }}>{c.nome}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* FAVORITOS */}
      <div className="animate-slide-up stagger-3" style={{ padding: '24px 16px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontFamily: "'Fredoka One', cursive", fontSize: '18px', color: 'var(--text)' }}>⭐ Seus favoritos</span>
          <span onClick={() => nav('/categorias')} className="btn-press" style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: 800, cursor: 'pointer' }}>ver tudo</span>
        </div>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', scrollbarWidth: 'none', padding: '4px 0 16px', margin: '0 -16px', paddingLeft: 16, paddingRight: 16, scrollSnapType: 'x mandatory' }}>
          {destaques.map((p, i) => (
            <div key={p.id} style={{ flexShrink: 0, width: 145, scrollSnapAlign: 'start' }}>
              <ProductCard produto={p} index={i} qty={items[p.id] || 0} onAdd={add} onRemove={remove} />
            </div>
          ))}
        </div>
      </div>

      {/* OFERTAS RELÂMPAGO */}
      <div className="animate-slide-up stagger-4" style={{ padding: '8px 16px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontFamily: "'Fredoka One', cursive", fontSize: '18px', color: 'var(--text)' }}>⚡ Ofertas Relâmpago</span>
          <span style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: 800, cursor: 'pointer' }}>ver tudo</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {FLASH.map((f, i) => (
            <div key={i} className="btn-press" style={{
              background: f.cor,
              borderRadius: 'var(--radius)',
              padding: '16px',
              minHeight: 100,
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              boxShadow: `0 8px 16px ${f.cor}33`
            }}>
              <div style={{ fontSize: '10px', fontWeight: 900, color: 'rgba(255,255,255,0.8)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '.06em' }}>{f.label}</div>
              <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: '20px', color: '#fff' }}>{f.sub}</div>
              <div style={{ position: 'absolute', right: -10, bottom: -10, fontSize: 64, opacity: 0.2, transform: 'rotate(-15deg)' }}>{f.emoji}</div>
            </div>
          ))}
        </div>
      </div>

      {/* BEBIDAS RÁPIDAS */}
      <div className="animate-slide-up" style={{ padding: '28px 16px 0', animationDelay: '0.5s' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontFamily: "'Fredoka One', cursive", fontSize: '18px', color: 'var(--text)' }}>🍺 Bebidas</span>
          <span onClick={() => nav('/categoria/bebidas')} className="btn-press" style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: 800, cursor: 'pointer' }}>ver todas</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {getPorCategoria('bebidas').slice(0, 4).map((p, i) => (
            <ProductCard key={p.id} produto={p} index={i + 4} qty={items[p.id] || 0} onAdd={add} onRemove={remove} />
          ))}
        </div>
      </div>

      <div style={{ height: 32 }} />
    </div>
  )
}
