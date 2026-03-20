import { useNavigate } from 'react-router-dom'
import { useCartContext } from '../contexts/CartContext'
import { getPorAdega, DESCONTO_FAIXAS, formatPreco } from '../lib/catalog'
import AdegaCard from '../components/AdegaCard'

const SECOES = [
  { label: '🍺 Cervejas', filtro: (p) => ['AD01','AD02','AD03','AD04'].includes(p.id) },
  { label: '⚡ Energéticos', filtro: (p) => ['AD05','AD06'].includes(p.id) },
  { label: '🍷 Vinho & Destilados', filtro: (p) => ['AD07','AD08','AD09','AD10'].includes(p.id) },
  { label: '🧊 Gelo & Combos', filtro: (p) => ['AD11','AD12'].includes(p.id) },
]

export default function Adega() {
  const nav = useNavigate()
  const { items, add, remove, totalQty } = useCartContext()
  const produtos = getPorAdega()

  return (
    <div
      className="screen"
      style={{ background: '#0D2B1A' }}
    >
      {/* TOPBAR DARK */}
      <div style={{
        background: '#0A2218',
        padding: '14px 16px',
        position: 'sticky', top: 0, zIndex: 10,
        display: 'flex', alignItems: 'center', gap: 12,
        borderBottom: '1px solid rgba(200,146,42,0.2)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
      }}>
        <button
          onClick={() => nav(-1)}
          className="btn-press tap-target"
          style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(200,146,42,0.15)', border: '1px solid rgba(200,146,42,0.3)', color: '#C8922A', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >←</button>

        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 20, color: '#F5C842', lineHeight: 1 }}>
            🍷 Adega
          </div>
          <div style={{ fontSize: 10, color: '#C8922A', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            Bebidas Geladas · Combos
          </div>
        </div>

        <button
          onClick={() => nav('/carrinho')}
          className="btn-press tap-target"
          style={{ width: 36, height: 36, borderRadius: '50%', background: '#C8922A', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          🛒
          {totalQty > 0 && (
            <span className="animate-bounce" style={{ position: 'absolute', top: -3, right: -3, background: '#F5C842', color: '#0D2B1A', fontSize: '10px', fontWeight: 900, width: 18, height: 18, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {totalQty}
            </span>
          )}
        </button>
      </div>

      {/* HERO ADEGA */}
      <div style={{
        background: 'linear-gradient(135deg, #0D2B1A 0%, #1a4530 50%, #0A2218 100%)',
        padding: '28px 20px 24px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Padrão de fundo */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(200,146,42,0.06) 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
        <div style={{ position: 'absolute', right: -20, top: -10, fontSize: 120, opacity: 0.06, transform: 'rotate(15deg)' }}>🍷</div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 28, color: '#F0E8D8', lineHeight: 1.1, marginBottom: 8 }}>
            Bebidas geladas<br />
            <span style={{ color: '#F5C842' }}>entregues em 20 min</span>
          </div>
          <div style={{ fontSize: 12, color: '#C8922A', fontWeight: 700, marginBottom: 16 }}>
            Cervejas, vinhos, destilados e muito mais
          </div>

          {/* Faixas de desconto progressivo */}
          <div style={{ background: 'rgba(200,146,42,0.12)', borderRadius: 14, padding: '12px 14px', border: '1px solid rgba(200,146,42,0.2)' }}>
            <div style={{ fontSize: 11, color: '#F5C842', fontWeight: 900, marginBottom: 8, letterSpacing: '.06em' }}>
              ⚡ DESCONTO PROGRESSIVO
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {DESCONTO_FAIXAS.map(f => (
                <div key={f.min} style={{ flex: 1, background: 'rgba(200,146,42,0.15)', borderRadius: 10, padding: '8px 4px', textAlign: 'center', border: '1px solid rgba(200,146,42,0.2)' }}>
                  <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 16, color: '#F5C842' }}>{f.pct}%</div>
                  <div style={{ fontSize: 9, color: '#C8922A', fontWeight: 800 }}>{f.min}+ un</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SEÇÕES DE PRODUTOS */}
      <div style={{ padding: '8px 0 40px' }}>
        {SECOES.map((sec) => {
          const prods = produtos.filter(sec.filtro)
          if (!prods.length) return null
          return (
            <div key={sec.label} style={{ marginBottom: 24 }}>
              <div style={{ padding: '20px 16px 12px', fontFamily: "'Fredoka One', cursive", fontSize: 17, color: '#F5C842' }}>
                {sec.label}
              </div>
              <div style={{ padding: '0 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {prods.map((p, i) => (
                  <AdegaCard
                    key={p.id}
                    produto={p}
                    index={i}
                    qty={items[p.id] || 0}
                    onAdd={add}
                    onRemove={remove}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
