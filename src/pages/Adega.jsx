import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartContext } from '../contexts/CartContext'
import { getPorAdega, DESCONTO_FAIXAS, formatPreco, getAdegazDiscount } from '../lib/catalog'

// ─── Configuração das seções com cores neon ────────────────────────────────
const SECOES = [
  { id:'cervejas',     label:'Cervejas',     emoji:'🍺', neon:'#FFD700', glow:'0 0 8px #FFD700, 0 0 20px #FFD700, 0 0 40px rgba(255,215,0,0.5)' },
  { id:'destilados',   label:'Destilados',   emoji:'🥃', neon:'#FF6B35', glow:'0 0 8px #FF6B35, 0 0 20px #FF6B35, 0 0 40px rgba(255,107,53,0.5)' },
  { id:'vinhos',       label:'Vinhos',       emoji:'🍷', neon:'#FF3CAC', glow:'0 0 8px #FF3CAC, 0 0 20px #FF3CAC, 0 0 40px rgba(255,60,172,0.5)' },
  { id:'energeticos',  label:'Energéticos',  emoji:'⚡', neon:'#39FF14', glow:'0 0 8px #39FF14, 0 0 20px #39FF14, 0 0 40px rgba(57,255,20,0.5)'  },
  { id:'complementos', label:'Complementos', emoji:'🧊', neon:'#00D4FF', glow:'0 0 8px #00D4FF, 0 0 20px #00D4FF, 0 0 40px rgba(0,212,255,0.5)' },
]

// Mapa de cores por badge
const BADGE_CORES = {
  GELADA:   { bg:'rgba(0,212,255,0.15)',   borda:'#00D4FF', texto:'#00D4FF'  },
  PACK:     { bg:'rgba(57,255,20,0.15)',    borda:'#39FF14', texto:'#39FF14'  },
  HOT:      { bg:'rgba(255,107,53,0.15)',   borda:'#FF6B35', texto:'#FF6B35'  },
  PREMIUM:  { bg:'rgba(255,60,172,0.15)',   borda:'#FF3CAC', texto:'#FF3CAC'  },
  DESTAQUE: { bg:'rgba(255,215,0,0.15)',    borda:'#FFD700', texto:'#FFD700'  },
  ESPECIAL: { bg:'rgba(200,146,42,0.2)',    borda:'#C8922A', texto:'#C8922A'  },
  ESSENCIAL:{ bg:'rgba(255,255,255,0.08)', borda:'#555',    texto:'#aaa'     },
  NEW:      { bg:'rgba(57,255,20,0.15)',    borda:'#39FF14', texto:'#39FF14'  },
}

function NeonBadge({ label }) {
  if (!label) return null
  const c = BADGE_CORES[label] || BADGE_CORES.ESSENCIAL
  return (
    <span style={{
      background: c.bg,
      border: `1px solid ${c.borda}`,
      color: c.texto,
      fontSize: 9, fontWeight: 900,
      padding: '3px 8px', borderRadius: 99,
      letterSpacing: '0.08em',
      textShadow: `0 0 6px ${c.borda}`,
      boxShadow: `0 0 8px ${c.borda}50`,
      animation: 'neonPulse 2s ease-in-out infinite',
      display: 'inline-block',
    }}>{label}</span>
  )
}

function ProdutoCard({ produto, qty, onAdd, onRemove, secao }) {
  const neon = secao?.neon || '#C8922A'
  const glow = secao?.glow || `0 0 8px ${neon}`
  const discount = produto.adega ? getAdegazDiscount(qty) : 0
  const precoFinal = produto.preco * (1 - discount)

  return (
    <div style={{
      background: 'linear-gradient(145deg, #0f2d1c, #0a1a10)',
      borderRadius: 16,
      border: qty > 0 ? `1px solid ${neon}60` : '1px solid rgba(255,255,255,0.06)',
      boxShadow: qty > 0 ? `0 0 16px ${neon}30, 0 4px 20px rgba(0,0,0,0.5)` : '0 4px 16px rgba(0,0,0,0.4)',
      padding: 14,
      display: 'flex', flexDirection: 'column', gap: 8,
      transition: 'all 0.3s ease',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Brilho de fundo quando selecionado */}
      {qty > 0 && (
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(circle at 50% 0%, ${neon}12 0%, transparent 65%)`,
        }} />
      )}

      {/* Emoji + Badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{
          width: 52, height: 52,
          background: `linear-gradient(135deg, ${neon}25, ${neon}08)`,
          border: `1px solid ${neon}40`,
          borderRadius: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28,
          boxShadow: qty > 0 ? `0 0 12px ${neon}50` : 'none',
          transition: 'all 0.3s ease',
        }}>
          {produto.imageFallback}
        </div>
        <NeonBadge label={produto.badge} />
      </div>

      {/* Nome e descrição */}
      <div>
        <div style={{ fontFamily:"'Fredoka One', cursive", fontSize:15, color:'#F0E8D8', lineHeight:1.2, marginBottom:3 }}>
          {produto.nome}
        </div>
        <div style={{ fontSize:11, color:'#4a7a5a', fontWeight:600 }}>{produto.descricao}</div>
      </div>

      {/* Desconto ativo */}
      {discount > 0 && (
        <div style={{ display:'inline-flex', alignItems:'center', gap:4, background:'rgba(245,200,66,0.12)', borderRadius:8, padding:'3px 8px', border:'1px solid rgba(245,200,66,0.3)' }}>
          <span style={{ fontSize:10, color:'#F5C842', fontWeight:900 }}>-{Math.round(discount*100)}% OFF</span>
        </div>
      )}

      {/* Preço + controles */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:2 }}>
        <div>
          {discount > 0 && (
            <div style={{ fontSize:10, color:'rgba(255,255,255,0.3)', textDecoration:'line-through', lineHeight:1 }}>
              {formatPreco(produto.preco)}
            </div>
          )}
          <div style={{
            fontFamily:"'Fredoka One', cursive", fontSize:17,
            color: neon,
            textShadow: qty > 0 ? `0 0 8px ${neon}` : 'none',
            transition: 'all 0.3s ease',
          }}>
            {formatPreco(precoFinal)}
          </div>
        </div>

        {qty === 0 ? (
          <button onClick={onAdd} className="btn-press tap-target" style={{
            width:36, height:36, borderRadius:10,
            background: `linear-gradient(135deg, ${neon}, ${neon}cc)`,
            border:'none', color:'#060f08',
            fontSize:22, fontWeight:900, cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow: `0 0 14px ${neon}80`,
          }}>+</button>
        ) : (
          <div style={{
            display:'flex', alignItems:'center', gap:6,
            background:`${neon}15`, borderRadius:10, padding:'4px 8px',
            border:`1px solid ${neon}40`,
          }}>
            <button onClick={onRemove} style={{
              width:26, height:26, borderRadius:7,
              background:'rgba(255,255,255,0.06)', border:'none',
              color:neon, fontSize:16, fontWeight:900, cursor:'pointer',
            }}>−</button>
            <span style={{ fontSize:14, fontWeight:900, color:'#fff', minWidth:14, textAlign:'center' }}>{qty}</span>
            <button onClick={onAdd} style={{
              width:26, height:26, borderRadius:7,
              background:neon, border:'none',
              color:'#060f08', fontSize:16, fontWeight:900, cursor:'pointer',
              boxShadow:`0 0 8px ${neon}80`,
            }}>+</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Adega() {
  const nav = useNavigate()
  const { items, add, remove, totalQty } = useCartContext()
  const produtos = getPorAdega()
  const [secaoAtiva, setSecaoAtiva] = useState('cervejas')

  const secaoObj = SECOES.find(s => s.id === secaoAtiva)
  const produtosFiltrados = produtos.filter(p => p.secao === secaoAtiva)

  const totalAdega = produtos.reduce((acc, p) => acc + (items[p.id] || 0), 0)
  const desconto = totalAdega >= 12 ? 15 : totalAdega >= 6 ? 10 : totalAdega >= 3 ? 5 : 0

  return (
    <div className="screen screen--floating-ui" style={{ background:'#060f08' }}>

      {/* ── Animações neon globais ─────────────────────────────────────── */}
      <style>{`
        @keyframes neonFlicker {
          0%,19%,21%,23%,25%,54%,56%,100% { opacity:1; }
          20%,24%,55% { opacity:0.35; }
        }
        @keyframes neonPulse {
          0%,100% { opacity:1; }
          50% { opacity:0.65; }
        }
        @keyframes neonSignBlink {
          0%,100% { opacity:1; filter:brightness(1.2); }
          48%,52% { opacity:0.8; filter:brightness(0.85); }
          49%,51% { opacity:0.45; filter:brightness(0.5); }
        }
        @keyframes scanline {
          0% { top:-4px; }
          100% { top:100%; }
        }
        @keyframes floatGlow {
          0%,100% { transform:translateY(0) scale(1); opacity:0.08; }
          50% { transform:translateY(-8px) scale(1.05); opacity:0.14; }
        }
        @keyframes cartBounce {
          0%,100% { transform:translateY(0); }
          40% { transform:translateY(-4px); }
          60% { transform:translateY(-2px); }
        }
      `}</style>

      {/* ── TOPBAR ────────────────────────────────────────────────────── */}
      <div style={{
        background:'linear-gradient(180deg,#020a04 0%,#060f08 100%)',
        padding:'14px 16px',
        position:'sticky', top:0, zIndex:20,
        display:'flex', alignItems:'center', gap:12,
        borderBottom:'1px solid rgba(200,146,42,0.2)',
        boxShadow:'0 4px 30px rgba(0,0,0,0.9)',
      }}>
        <button onClick={() => nav(-1)} className="btn-press tap-target" style={{
          width:36, height:36, borderRadius:'50%',
          background:'rgba(200,146,42,0.1)',
          border:'1px solid rgba(200,146,42,0.3)',
          color:'#C8922A', fontSize:18, cursor:'pointer',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>←</button>

        <div style={{ flex:1 }}>
          <div style={{
            fontFamily:"'Fredoka One', cursive", fontSize:22,
            color:'#F5C842',
            textShadow:'0 0 7px #F5C842, 0 0 18px #F5C842, 0 0 35px #C8922A',
            animation:'neonSignBlink 5s ease-in-out infinite',
            lineHeight:1,
          }}>
            🍷 Adega da Carmen
          </div>
          <div style={{ fontSize:10, color:'#C8922A', fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', marginTop:2 }}>
            Bebidas · Drinks · Combos
          </div>
        </div>

        <button onClick={() => nav('/carrinho')} className="btn-press tap-target" style={{
          width:40, height:40, borderRadius:'50%',
          background: totalQty > 0 ? 'linear-gradient(135deg,#C8922A,#F5C842)' : 'rgba(200,146,42,0.15)',
          border:`1px solid ${totalQty > 0 ? '#F5C842' : 'rgba(200,146,42,0.3)'}`,
          color: totalQty > 0 ? '#060f08' : '#C8922A',
          fontSize:18, cursor:'pointer',
          position:'relative',
          display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow: totalQty > 0 ? '0 0 16px rgba(245,200,66,0.6)' : 'none',
          transition:'all 0.3s ease',
          animation: totalQty > 0 ? 'cartBounce 1.5s ease-in-out infinite' : 'none',
        }}>
          🛒
          {totalQty > 0 && (
            <span style={{
              position:'absolute', top:-4, right:-4,
              background:'#39FF14', color:'#060f08',
              fontSize:'10px', fontWeight:900,
              width:18, height:18, borderRadius:'50%',
              display:'flex', alignItems:'center', justifyContent:'center',
              boxShadow:'0 0 10px #39FF14',
              animation:'neonPulse 1.2s ease-in-out infinite',
            }}>{totalQty}</span>
          )}
        </button>
      </div>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <div style={{
        background:'linear-gradient(160deg,#060f08 0%,#0d2b1a 55%,#060f08 100%)',
        padding:'22px 20px 18px',
        position:'relative', overflow:'hidden',
      }}>
        {/* Grade neon de fundo */}
        <div style={{
          position:'absolute', inset:0, pointerEvents:'none',
          backgroundImage:`
            linear-gradient(rgba(200,146,42,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,146,42,0.04) 1px, transparent 1px)
          `,
          backgroundSize:'28px 28px',
        }} />
        {/* Linha de scan */}
        <div style={{
          position:'absolute', left:0, right:0, height:2,
          background:'linear-gradient(90deg,transparent,rgba(200,146,42,0.25),transparent)',
          animation:'scanline 5s linear infinite',
          pointerEvents:'none',
        }} />
        {/* Emoji decorativo flutuante */}
        <div style={{
          position:'absolute', right:14, top:10, fontSize:72, opacity:0.1,
          animation:'floatGlow 4s ease-in-out infinite',
        }}>🍷</div>

        <div style={{ position:'relative', zIndex:1 }}>
          {/* Indicador "ABERTO" piscando */}
          <div style={{
            display:'inline-flex', alignItems:'center', gap:6,
            background:'rgba(57,255,20,0.08)',
            border:'1px solid #39FF14',
            borderRadius:99, padding:'4px 12px', marginBottom:12,
            animation:'neonPulse 2s ease-in-out infinite',
          }}>
            <span style={{ width:7, height:7, borderRadius:'50%', background:'#39FF14', boxShadow:'0 0 6px #39FF14', display:'inline-block' }} />
            <span style={{ fontSize:10, fontWeight:900, color:'#39FF14', letterSpacing:'.1em' }}>ABERTO AGORA</span>
          </div>

          <div style={{ fontFamily:"'Fredoka One', cursive", fontSize:24, color:'#F0E8D8', lineHeight:1.2, marginBottom:6 }}>
            Noites memoráveis<br />
            <span style={{
              color:'#F5C842',
              textShadow:'0 0 10px #F5C842, 0 0 25px #C8922A',
              animation:'neonFlicker 4s infinite alternate',
            }}>começam aqui.</span>
          </div>
          <div style={{ fontSize:12, color:'#4a7a5a', fontWeight:600, marginBottom:14 }}>
            Entrega em até 20 min · Vila São José, Taubaté
          </div>

          {/* Faixas de desconto */}
          <div style={{
            background:'rgba(200,146,42,0.08)',
            border:'1px solid rgba(200,146,42,0.2)',
            borderRadius:12, padding:'10px 14px',
          }}>
            <div style={{ fontSize:11, color:'#F5C842', fontWeight:900, marginBottom:8, letterSpacing:'.06em' }}>
              ⚡ DESCONTO PROGRESSIVO
              {totalAdega > 0 && <span style={{ color:'#39FF14', marginLeft:8, animation:'neonPulse 1.5s infinite' }}>· {totalAdega} itens{desconto > 0 ? ` · ${desconto}% OFF ativo!` : ''}</span>}
            </div>
            <div style={{ display:'flex', gap:6 }}>
              {DESCONTO_FAIXAS.map(f => {
                const ativo = totalAdega >= f.min
                return (
                  <div key={f.min} style={{
                    flex:1,
                    background: ativo ? 'rgba(245,200,66,0.18)' : 'rgba(255,255,255,0.03)',
                    borderRadius:8, padding:'7px 4px', textAlign:'center',
                    border:`1px solid ${ativo ? '#F5C842' : 'rgba(255,255,255,0.06)'}`,
                    boxShadow: ativo ? '0 0 10px rgba(245,200,66,0.3)' : 'none',
                    transition:'all 0.4s ease',
                  }}>
                    <div style={{ fontFamily:"'Fredoka One', cursive", fontSize:16, color: ativo ? '#F5C842' : '#333' }}>{f.pct}%</div>
                    <div style={{ fontSize:9, color: ativo ? '#C8922A' : '#2a3a2a', fontWeight:800 }}>{f.min}+ un</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── TABS DE SEÇÃO ─────────────────────────────────────────────── */}
      <div style={{
        background:'#060f08',
        borderBottom:'1px solid rgba(255,255,255,0.05)',
        position:'sticky', top:64, zIndex:15,
        display:'flex', overflowX:'auto', overflowY:'hidden',
        scrollbarWidth:'none', padding:'0 4px',
      }}>
        {SECOES.map(sec => {
          const ativa = secaoAtiva === sec.id
          return (
            <button key={sec.id} onClick={() => setSecaoAtiva(sec.id)} style={{
              flex:'0 0 auto',
              padding:'11px 14px',
              background:'none', border:'none',
              borderBottom: ativa ? `2px solid ${sec.neon}` : '2px solid transparent',
              color: ativa ? sec.neon : '#2a4a35',
              fontFamily:"'Fredoka One', cursive",
              fontSize:13, cursor:'pointer',
              display:'flex', alignItems:'center', gap:5,
              textShadow: ativa ? sec.glow : 'none',
              transition:'all 0.25s ease',
              whiteSpace:'nowrap',
              animation: ativa ? 'neonPulse 2s ease-in-out infinite' : 'none',
            }}>
              <span style={{ fontSize:15 }}>{sec.emoji}</span>
              {sec.label}
            </button>
          )
        })}
      </div>

      {/* ── GRID DE PRODUTOS ──────────────────────────────────────────── */}
      <div style={{ padding:'16px 14px 0' }}>

        {/* Título da seção */}
        <div style={{ marginBottom:14, display:'flex', alignItems:'center', gap:10 }}>
          <div style={{
            width:3, height:22, borderRadius:2,
            background: secaoObj?.neon,
            boxShadow: secaoObj?.glow,
          }} />
          <span style={{
            fontFamily:"'Fredoka One', cursive", fontSize:18,
            color: secaoObj?.neon,
            textShadow: secaoObj?.glow,
            animation:'neonFlicker 3s infinite alternate',
          }}>
            {secaoObj?.emoji} {secaoObj?.label}
          </span>
          <span style={{ fontSize:11, color:'#2a4a35', fontWeight:700, marginLeft:'auto' }}>
            {produtosFiltrados.length} itens
          </span>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          {produtosFiltrados.map(produto => (
            <ProdutoCard
              key={produto.id}
              produto={produto}
              qty={items[produto.id] || 0}
              secao={secaoObj}
              onAdd={() => add(produto.id)}
              onRemove={() => remove(produto.id)}
            />
          ))}
        </div>

        {produtosFiltrados.length === 0 && (
          <div style={{ textAlign:'center', padding:'40px 20px' }}>
            <div style={{ fontSize:40, marginBottom:12 }}>🔍</div>
            <div style={{ fontFamily:"'Fredoka One', cursive", fontSize:16, color:'#2a4a35' }}>
              Nenhum produto nessa seção
            </div>
          </div>
        )}
      </div>

      {/* ── BARRA FLUTUANTE DO CARRINHO ───────────────────────────────── */}
      {totalQty > 0 && (
        <div className="floating-cart-bar">
          <button onClick={() => nav('/carrinho')} className="btn-press" style={{
            width:'100%',
            background:'linear-gradient(135deg,#C8922A,#F5C842)',
            border:'none', borderRadius:16,
            padding:'14px 20px',
            display:'flex', alignItems:'center', justifyContent:'space-between',
            cursor:'pointer',
            boxShadow:'0 0 24px rgba(245,200,66,0.55), 0 8px 24px rgba(0,0,0,0.5)',
            animation:'neonPulse 2.5s ease-in-out infinite',
          }}>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <span style={{
                background:'rgba(0,0,0,0.2)', borderRadius:8, padding:'4px 10px',
                fontFamily:"'Fredoka One', cursive", fontSize:14, color:'#060f08',
              }}>
                {totalQty} {totalQty === 1 ? 'item' : 'itens'}
              </span>
              <span style={{ fontFamily:"'Fredoka One', cursive", fontSize:15, color:'#060f08' }}>
                Ver Carrinho
              </span>
            </div>
            <span style={{ fontFamily:"'Fredoka One', cursive", fontSize:18, color:'#060f08' }}>→</span>
          </button>
        </div>
      )}
    </div>
  )
}
