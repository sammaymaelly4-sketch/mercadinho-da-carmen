import { useNavigate } from 'react-router-dom'
import { useCartContext } from '../contexts/CartContext'
import { getDestaques, getPorCategoria, CATEGORIAS } from '../lib/catalog'
import { COMBOS } from '../lib/combos'
import ProductCard from '../components/ProductCard'
import ComboCard from '../components/ComboCard'
import ScreenHeader from '../components/ScreenHeader'
import IconCircleButton from '../components/IconCircleButton'
import SectionTitle from '../components/SectionTitle'
import BadgePill from '../components/BadgePill'

const CATS_ORDER = ['bebidas', 'snacks', 'higiene', 'limpeza', 'gelo']

function getTimeSlot() {
  const h = new Date().getHours()
  const d = new Date().getDay()
  const isWeekend = d === 0 || d === 5 || d === 6
  if (isWeekend && h >= 16) return 'weekend'
  if (h >= 6 && h < 12) return 'morning'
  if (h >= 12 && h < 17) return 'afternoon'
  if (h >= 17) return 'evening'
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
  { label: 'Cerveja Pack 12x', sub: '50% OFF', cor: '#E8622A', emoji: '🍺' },
  { label: 'Gelo 1kg', sub: 'R$ 5,00', cor: '#2D5A3D', emoji: '🧊' },
  { label: 'Monster + Gelo', sub: 'Combo', cor: '#1E3D2A', emoji: '⚡' },
  { label: 'Kit Higiene', sub: 'R$ 29,90', cor: '#6A1B9A', emoji: '🧴' },
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
      <ScreenHeader
        title={<>
          <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 20, color: '#F0E8D8' }}>Mercadinho da Carmen</div>
          <div style={{ fontSize: 10, color: '#C4A882', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' }}>📍 Vila São José · Taubaté</div>
        </>}
        right={(
          <div style={{ display: 'flex', gap: 'var(--space-8)' }}>
            <IconCircleButton onClick={() => nav('/perfil')}>👤</IconCircleButton>
            <IconCircleButton onClick={() => nav('/carrinho')} variant="accent">
              🛒
              {totalQty > 0 && (
                <span className="animate-bounce" style={{ position: 'absolute', top: -3, right: -3, background: '#fff', color: 'var(--accent)', fontSize: 10, fontWeight: 900, width: 18, height: 18, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--accent)' }}>
                  {totalQty}
                </span>
              )}
            </IconCircleButton>
          </div>
        )}
      />

      <div onClick={() => nav('/categorias')} className="btn-press" style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,.15)', borderRadius: 14, padding: '12px 16px', cursor: 'pointer', margin: '-8px 16px 0', position: 'relative', zIndex: 11 }}>
        <span style={{ fontSize: 16 }}>🔍</span>
        <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: 700 }}>O que você precisa hoje?</span>
      </div>

      <div className="animate-fade-in stagger-1" style={{ background: 'var(--primary-dark)', padding: '24px 16px 0', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', minHeight: 120, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 16, background: 'var(--bg)', borderRadius: '16px 16px 0 0' }} />
        <div style={{ zIndex: 1, paddingBottom: 24 }}>
          <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 22, color: '#fff', lineHeight: 1.15, marginBottom: 8 }}>
            {tc.hero.titulo}
            <br />
            <span style={{ color: 'var(--accent)', fontSize: 18 }}>{tc.hero.sub}</span>
          </div>
          <BadgePill style={{ background: tc.hero.cor, color: '#fff', marginTop: 8 }}>{tc.hero.destaque}</BadgePill>
        </div>
        <div className="animate-bounce" style={{ fontSize: 64, zIndex: 1, paddingBottom: 12 }}>
          {isWeekend ? '🎉' : isEvening ? '🍷' : '🛵'}
        </div>
      </div>

      {isWeekend && (
        <div className="animate-slide-up" style={{ margin: '16px 16px 0' }}>
          <div
            onClick={() => nav('/adega')}
            className="btn-press"
            style={{
              background: 'linear-gradient(135deg, #E8622A, #C8922A)',
              borderRadius: 20,
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(232,98,42,0.4)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', right: -10, top: -10, fontSize: 80, opacity: 0.15, transform: 'rotate(12deg)' }}>🍺</div>
            <div>
              <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 20, color: '#fff', marginBottom: 4 }}>Kit Sexta da Carmen 🍺</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', fontWeight: 700 }}>Heineken gelada + salgadinho + gelo</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 700, marginTop: 4 }}>A partir de R$ 22,90 · Entrega 20 min</div>
            </div>
            <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 22, color: '#fff', flexShrink: 0 }}>→</div>
          </div>
        </div>
      )}

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
          <div style={{ width: 52, height: 52, borderRadius: 16, background: 'rgba(200,146,42,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0, border: '1px solid rgba(200,146,42,0.3)' }}>🍷</div>
          <div style={{ flex: 1, zIndex: 1 }}>
            <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 17, color: '#F5C842' }}>Adega da Carmen</div>
            <div style={{ fontSize: 11, color: '#C8922A', fontWeight: 700, marginTop: 2 }}>Cervejas, vinhos, destilados · Desconto até 15%</div>
          </div>
          <div style={{ fontSize: 20, color: '#C8922A', flexShrink: 0, zIndex: 1 }}>›</div>
        </div>
      </div>

      <div className="animate-slide-up stagger-2" style={{ padding: '16px 16px 0' }}>
        <div style={{ display: 'flex', gap: 16, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 8 }}>
          {CATS_ORDER.map(cid => {
            const c = CATEGORIAS[cid]
            return (
              <div key={cid} onClick={() => nav('/categoria/' + cid)} className="btn-press" style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <div style={{ width: 64, height: 64, borderRadius: 20, background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, border: '2px solid ' + c.cor + '22', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>{c.emoji}</div>
                <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--text)' }}>{c.nome}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="animate-slide-up stagger-3" style={{ padding: '20px 16px 0' }}>
        <SectionTitle title="⭐ Seus favoritos" actionLabel="ver tudo" onAction={() => nav('/categorias')} />
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', scrollbarWidth: 'none', padding: '4px 0 16px', margin: '0 -16px', paddingLeft: 16, paddingRight: 16, scrollSnapType: 'x mandatory' }}>
          {destaques.map((p, i) => (
            <div key={p.id} style={{ flexShrink: 0, width: 145, scrollSnapAlign: 'start' }}>
              <ProductCard produto={p} index={i} qty={items[p.id] || 0} onAdd={add} onRemove={remove} />
            </div>
          ))}
        </div>
      </div>

      <div className="animate-slide-up stagger-4" style={{ padding: '4px 16px 0' }}>
        <SectionTitle title="🎁 Combos da Carmen" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 14 }}>
          {COMBOS.map(c => <ComboCard key={c.id} combo={c} onAdd={() => nav('/carrinho')} />)}
        </div>
      </div>

      <div className="animate-slide-up" style={{ padding: '28px 16px 0', animationDelay: '0.4s' }}>
        <SectionTitle
          title={tc.sectionLabel}
          actionLabel={isEvening ? 'ver adega' : 'ver tudo'}
          onAction={() => nav(isEvening ? '/adega' : '/categorias')}
          actionColor={isEvening ? '#C8922A' : undefined}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {tc.produtos().map((p, i) => (
            <ProductCard key={p.id} produto={p} index={i} qty={items[p.id] || 0} onAdd={add} onRemove={remove} />
          ))}
        </div>
      </div>

      <div className="animate-slide-up" style={{ padding: '28px 16px 0', animationDelay: '0.5s' }}>
        <SectionTitle title="⚡ Ofertas Relâmpago" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {FLASH.map((f, i) => (
            <div key={i} className="btn-press" style={{ background: f.cor, borderRadius: 'var(--radius)', padding: 16, minHeight: 100, position: 'relative', overflow: 'hidden', cursor: 'pointer', boxShadow: `0 8px 16px ${f.cor}33` }}>
              <div style={{ fontSize: 10, fontWeight: 900, color: 'rgba(255,255,255,0.8)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '.06em' }}>{f.label}</div>
              <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 20, color: '#fff' }}>{f.sub}</div>
              <div style={{ position: 'absolute', right: -10, bottom: -10, fontSize: 64, opacity: 0.2, transform: 'rotate(-15deg)' }}>{f.emoji}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 32 }} />
    </div>
  )
}
