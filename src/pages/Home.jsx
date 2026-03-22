import { useNavigate } from 'react-router-dom'
import { useCartContext } from '../contexts/CartContext'
import { getDestaques, getPorCategoria, CATEGORIAS, formatPreco } from '../lib/catalog'
import { COMBOS } from '../lib/combos'
import ProductCard from '../components/ProductCard'
import ComboCard from '../components/ComboCard'

const CATS_ORDER = ['bebidas', 'snacks', 'higiene', 'limpeza', 'gelo']

// ─── Horário ──────────────────────────────────────────────────────────────────
function getTimeSlot() {
  const h = new Date().getHours()
  const d = new Date().getDay() // 0=Dom, 5=Sex, 6=Sáb
  const isWeekend = d === 0 || d === 5 || d === 6
  if (isWeekend && h >= 16) return 'weekend'
  if (h >= 6  && h < 12)    return 'morning'
  if (h >= 12 && h < 17)    return 'afternoon'
  if (h >= 17)               return 'evening'
  return 'morning'
}

const TIME_CONFIG = {
  morning: {
    hero: { titulo: 'Bom dia! ☀️', sub: 'Café, pão e leite gelado esperando você.', destaque: '🥛 MERCADO BÁSICO', cor: '#2D5A3D' },
    produtos: () => getPorCategoria('higiene').slice(0, 4),
    sectionLabel: '🥛 Básicos do dia',
  },
  afternoon: {
    hero: { titulo: 'Tarde gostosa 🌤️', sub: 'Salgadinhos e bebidas refrescantes.', destaque: '🍿 SNACKS & BEBIDAS', cor: '#FF7043' },
    produtos: () => [...getPorCategoria('snacks').slice(0, 2), ...getPorCategoria('bebidas').slice(0, 2)],
    sectionLabel: '🍿 Snacks & Refrescos',
  },
  evening: {
    hero: { titulo: 'Noite boa 🌙', sub: 'Adega completa e combos incríveis pra você.', destaque: '🍷 ADEGA & COMBOS', cor: '#C8922A' },
    produtos: () => getPorCategoria('adega').filter(p => p.destaque).slice(0, 4),
    sectionLabel: '🍷 Destaques da Adega',
  },
  weekend: {
    hero: { titulo: 'Kit Sexta da Carmen 🍺', sub: 'Cerveja gelada, salgadinho e gelo — a festa é aqui!', destaque: '⚡ OFERTA ESPECIAL', cor: '#E8622A' },
    produtos: () => getPorCategoria('adega').filter(p => p.destaque).slice(0, 4),
    sectionLabel: '🎉 Especial de Fim de Semana',
  },
}

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
  const slot = getTimeSlot()
  const tc = TIME_CONFIG[slot]
  const isWeekend = slot === 'weekend'
  const isEvening = slot === 'evening' || slot === 'weekend'

  return (
    <div className="screen">

      {/* TOPBAR */}
      <div className="animate-fade-in" style={{ background: 'var(--primary)', padding: '16px 16px 12px', position: 'sticky', top: 0, zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: '20px', color: '#F0E8D8' }}>Mercadinho da Carmen</div>
            <div style={{ fontSize: 'var(--fs-caption)', color: 'var(--text-on-dark-muted)', fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase' }}>📍 Vila São José · Taubaté</div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => nav('/perfil')} className="btn-press tap-target" style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,.15)', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👤</button>
            <button onClick={() => nav('/carrinho')} className="btn-press tap-target" style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--accent)', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              🛒
              {totalQty > 0 && (
                <span className="animate-bounce" style={{ position: 'absolute', top: -3, right: -3, background: '#fff', color: 'var(--accent)', fontSize: 'var(--fs-caption)', fontWeight: 900, width: 18, height: 18, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--accent)' }}>
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

      {/* HERO DINÂMICO POR HORÁRIO */}
      <div className="animate-fade-in stagger-1" style={{ background: 'var(--primary-dark)', padding: '24px 16px 0', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', minHeight: 120, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 16, background: 'var(--bg)', borderRadius: '16px 16px 0 0' }} />
        <div style={{ zIndex: 1, paddingBottom: 24 }}>
          <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: '22px', color: '#fff', lineHeight: 1.15, marginBottom: 8 }}>
            {tc.hero.titulo}
            <br />
            <span style={{ color: 'var(--accent)', fontSize: 18 }}>{tc.hero.sub}</span>
          </div>
          <div style={{ background: tc.hero.cor, color: '#fff', fontSize: 'var(--fs-caption)', fontWeight: 900, padding: '5px 12px', borderRadius: 99, display: 'inline-block', marginTop: 8, letterSpacing: '.06em' }}>
            {tc.hero.destaque}
          </div>
        </div>
        <div className="animate-bounce" style={{ fontSize: 64, zIndex: 1, paddingBottom: 12 }}>
          {isWeekend ? '🎉' : isEvening ? '🍷' : '🛵'}
        </div>
      </div>

      {/* BANNER KIT SEXTA — Sexta/Sáb/Dom 16h+ */}
      {isWeekend && (
        <div className="animate-slide-up" style={{ margin: '16px 16px 0' }}>
          <div
            onClick={() => nav('/adega')}
            className="btn-press"
            style={{
              background: 'linear-gradient(135deg, #E8622A, #C8922A)',
              borderRadius: 20, padding: '20px 20px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(232,98,42,0.4)',
              position: 'relative', overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', right: -10, top: -10, fontSize: 80, opacity: 0.15, transform: 'rotate(12deg)' }}>🍺</div>
            <div>
              <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 20, color: '#fff', marginBottom: 4 }}>
                Kit Sexta da Carmen 🍺
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', fontWeight: 700 }}>
                Heineken gelada + salgadinho + gelo
              </div>
              <div style={{ fontSize: 'var(--fs-body-sm)', color: 'rgba(243,237,221,0.9)', fontWeight: 700, marginTop: 4 }}>
                A partir de R$ 22,90 · Entrega 20 min
              </div>
            </div>
            <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 22, color: '#fff', flexShrink: 0 }}>→</div>
          </div>
        </div>
      )}

      {/* ACESSO RÁPIDO ADEGA */}
      <div className="animate-slide-up stagger-2" style={{ padding: isWeekend ? '12px 16px 0' : '20px 16px 0' }}>
        <div
          onClick={() => nav('/adega')}
          className="btn-press"
          style={{
            background: 'linear-gradient(135deg, #0D2B1A, #1a4530)',
            borderRadius: 20, padding: '18px 20px',
            display: 'flex', alignItems: 'center', gap: 16,
            cursor: 'pointer',
            border: '1px solid rgba(200,146,42,0.3)',
            boxShadow: '0 6px 20px rgba(13,43,26,0.4)',
            position: 'relative', overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', right: -8, top: -8, fontSize: 72, opacity: 0.08 }}>🍷</div>
          <div style={{ width: 52, height: 52, borderRadius: 16, background: 'rgba(200,146,42,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0, border: '1px solid rgba(200,146,42,0.3)' }}>
            🍷
          </div>
          <div style={{ flex: 1, zIndex: 1 }}>
            <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 17, color: '#F5C842' }}>Adega da Carmen</div>
            <div style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--text-brand-gold)', fontWeight: 800, marginTop: 2 }}>
              Cervejas, vinhos, destilados · Desconto até 15%
            </div>
          </div>
          <div style={{ fontSize: 20, color: '#C8922A', flexShrink: 0, zIndex: 1 }}>›</div>
        </div>
      </div>

      {/* CATEGORIAS */}
      <div className="animate-slide-up stagger-2" style={{ padding: '16px 16px 0' }}>
        <div style={{ display: 'flex', gap: 16, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 8 }}>
          {CATS_ORDER.map(cid => {
            const c = CATEGORIAS[cid]
            return (
              <div key={cid} onClick={() => nav('/categoria/' + cid)} className="btn-press" style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <div style={{ width: 64, height: 64, borderRadius: '20px', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, border: '2px solid ' + c.cor + '22', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                  {c.emoji}
                </div>
                <span style={{ fontSize: 'var(--fs-body-sm)', fontWeight: 800, color: 'var(--text)' }}>{c.nome}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* FAVORITOS */}
      <div className="animate-slide-up stagger-3" style={{ padding: '20px 16px 0' }}>
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

      {/* COMBOS DA CARMEN */}
      <div className="animate-slide-up stagger-4" style={{ padding: '4px 16px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontFamily: "'Fredoka One', cursive", fontSize: '18px', color: 'var(--text)' }}>🎁 Combos da Carmen</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 14 }}>
          {COMBOS.map(c => (
            <ComboCard key={c.id} combo={c} onAdd={() => nav('/carrinho')} />
          ))}
        </div>
      </div>

      {/* SEÇÃO DINÂMICA POR HORÁRIO */}
      <div className="animate-slide-up" style={{ padding: '28px 16px 0', animationDelay: '0.4s' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontFamily: "'Fredoka One', cursive", fontSize: '18px', color: 'var(--text)' }}>{tc.sectionLabel}</span>
          {isEvening
            ? <span onClick={() => nav('/adega')} className="btn-press" style={{ fontSize: '12px', color: '#C8922A', fontWeight: 800, cursor: 'pointer' }}>ver adega</span>
            : <span onClick={() => nav('/categorias')} className="btn-press" style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: 800, cursor: 'pointer' }}>ver tudo</span>
          }
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {tc.produtos().map((p, i) => (
            <ProductCard key={p.id} produto={p} index={i} qty={items[p.id] || 0} onAdd={add} onRemove={remove} />
          ))}
        </div>
      </div>

      {/* OFERTAS RELÂMPAGO */}
      <div className="animate-slide-up" style={{ padding: '28px 16px 0', animationDelay: '0.5s' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontFamily: "'Fredoka One', cursive", fontSize: '18px', color: 'var(--text)' }}>⚡ Ofertas Relâmpago</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {FLASH.map((f, i) => (
            <div key={i} className="btn-press" style={{
              background: f.cor, borderRadius: 'var(--radius)', padding: '16px',
              minHeight: 100, position: 'relative', overflow: 'hidden', cursor: 'pointer',
              boxShadow: `0 8px 16px ${f.cor}33`
            }}>
              <div style={{ fontSize: 'var(--fs-caption)', fontWeight: 900, color: 'rgba(243,237,221,0.92)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '.06em' }}>{f.label}</div>
              <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: '20px', color: '#fff' }}>{f.sub}</div>
              <div style={{ position: 'absolute', right: -10, bottom: -10, fontSize: 64, opacity: 0.2, transform: 'rotate(-15deg)' }}>{f.emoji}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
