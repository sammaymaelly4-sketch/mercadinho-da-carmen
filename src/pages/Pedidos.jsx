import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatPreco } from '../lib/catalog'
import { listarPedidos } from '../lib/pedidosService'

function formatarData(iso) {
  const d = new Date(iso)
  const agora = new Date()
  const diffMin = Math.round((agora - d) / 60000)
  if (diffMin < 1) return 'Agora mesmo'
  if (diffMin < 60) return `${diffMin} min atrás`
  const diffH = Math.round(diffMin / 60)
  if (diffH < 24) return `${diffH}h atrás`
  const diffDias = Math.round(diffH / 24)
  return diffDias === 1 ? 'Ontem' : `${diffDias} dias atrás`
}

export function Pedidos() {
  const nav = useNavigate()
  const [pedidos, setPedidos] = useState(() => {
    try { return JSON.parse(localStorage.getItem('pedidos') || '[]') } catch { return [] }
  })
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    listarPedidos().then(data => { setPedidos(data); setCarregando(false) })
  }, [])

  const ativo = pedidos[0] || null
  const historico = pedidos.slice(1)

  const ETAPAS = [
    { icon: '✓',  label: 'Pedido confirmado', sub: 'A Carmen já tá separando tudo com carinho. 🧺' },
    { icon: '✓',  label: 'Preparando',         sub: 'Quase pronto! A Carmen tá embalando seu pedido.' },
    { icon: '🛵', label: 'A caminho!',          sub: 'Saiu! O entregador da Carmen tá voando até você. 🛵' },
    { icon: '🏠', label: 'Entregue',            sub: 'Chegou! Bom proveito da Carmen pra você. 🧡' },
  ]

  if (carregando) {
    return (
      <div className="screen animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 40, textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>⏳</div>
        <div style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 700 }}>Carregando pedidos...</div>
      </div>
    )
  }

  if (pedidos.length === 0) {
    return (
      <div className="screen animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: 40, textAlign: 'center' }}>
        <div style={{ fontSize: 80 }}>📦</div>
        <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 24, color: 'var(--text)' }}>Nenhum pedido ainda</div>
        <div style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 700 }}>Seus pedidos aparecerão aqui após finalizar uma compra</div>
        <button onClick={() => nav('/home')} className="btn-press" style={{ background: 'var(--accent)', border: 'none', borderRadius: 16, padding: '16px 32px', fontFamily: "'Fredoka One', cursive", fontSize: 18, color: '#fff', cursor: 'pointer', boxShadow: '0 8px 20px rgba(232, 98, 42, 0.3)' }}>
          Ir às compras
        </button>
      </div>
    )
  }

  return (
    <div className="screen">
      <div className="animate-fade-in" style={{ background: 'var(--primary)', padding: '16px 16px 14px', position: 'sticky', top: 0, zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 20, color: '#F0E8D8' }}>Meus Pedidos</div>
      </div>

      {ativo && (
        <div className="animate-slide-up" style={{ margin: '16px 16px 0', background: 'var(--primary-dark)', borderRadius: 'var(--radius)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ background: 'var(--primary)', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: '18px', color: '#F0E8D8' }}>🛵 A caminho!</div>
              <div style={{ fontSize: 'var(--fs-body-sm)', color: '#C4A882', fontWeight: 700, marginTop: 4 }}>{ativo.id} · Vila São José</div>
            </div>
            <div style={{ background: 'rgba(129,199,132,0.15)', borderRadius: 99, padding: '6px 12px', fontSize: 'var(--fs-body-sm)', color: '#81C784', fontWeight: 800 }}>🟢 EM ROTA</div>
          </div>

          <div style={{ padding: '20px 16px' }}>
            {ETAPAS.map((s, i, arr) => {
              const done = i < 2
              const active = i === 2
              return (
                <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div className={active ? 'animate-bounce' : ''} style={{ width: 32, height: 32, borderRadius: '50%', background: done ? 'var(--primary)' : active ? 'var(--accent)' : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#fff', flexShrink: 0 }}>
                      {s.icon}
                    </div>
                    <div style={{ paddingTop: 6 }}>
                      <div style={{ fontSize: 13, fontWeight: 800, color: active ? '#fff' : done ? '#C4A882' : 'rgba(255,255,255,0.3)' }}>{s.label}</div>
                      <div style={{ fontSize: 'var(--fs-body-sm)', color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>{s.sub}</div>
                    </div>
                  </div>
                  {i < arr.length - 1 && (
                    <div style={{ width: 2, height: 16, background: done ? 'var(--primary)' : 'rgba(255,255,255,0.1)', marginLeft: 15, marginTop: 4, marginBottom: 4 }} />
                  )}
                </div>
              )
            })}
          </div>

          <div style={{ padding: '12px 16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div>
              <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 22, color: 'var(--accent)' }}>{formatPreco(ativo.total)}</div>
              <div style={{ fontSize: 'var(--fs-body-sm)', color: '#C4A882', fontWeight: 700 }}>{ativo.pagamento} · {ativo.itens?.length || 0} {ativo.itens?.length === 1 ? 'item' : 'itens'}</div>
            </div>
            <div style={{ fontSize: 'var(--fs-body-sm)', color: '#C4A882', fontWeight: 700 }}>{formatarData(ativo.criadoEm)}</div>
          </div>
        </div>
      )}

      {historico.length > 0 && (
        <div className="animate-slide-up" style={{ padding: '24px 16px 0' }}>
          <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 16, color: 'var(--text)', marginBottom: 12 }}>Histórico</div>
          {historico.map((p, i) => (
            <div key={p.id} className="btn-press animate-fade-in" style={{ background: 'var(--card-bg)', borderRadius: 'var(--radius)', padding: 16, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: 'var(--shadow)', marginBottom: 12, animationDelay: `${i * 0.05}s` }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)' }}>{p.id}</div>
                <div style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)', fontWeight: 600, marginTop: 4 }}>
                  {formatarData(p.criadoEm)} · {p.itens?.length || 0} {p.itens?.length === 1 ? 'item' : 'itens'} · {formatPreco(p.total)}
                </div>
              </div>
              <div style={{ background: 'rgba(45,90,61,0.08)', borderRadius: 99, padding: '6px 12px', fontSize: 'var(--fs-body-sm)', color: 'var(--primary)', fontWeight: 800 }}>✅ Entregue</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function Perfil() {
  const nav = useNavigate()
  return (
    <div className="screen animate-fade-in">
      <div style={{ background: 'var(--primary)', padding: '24px 16px 32px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 20, color: '#F0E8D8', marginBottom: 20 }}>Meu Perfil</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div className="animate-bounce" style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, boxShadow: '0 4px 12px rgba(232, 98, 42, 0.3)' }}>👤</div>
          <div className="animate-slide-up">
            <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 18, color: '#F0E8D8' }}>Visitante</div>
            <div style={{ fontSize: 'var(--fs-body-sm)', color: '#C4A882', fontWeight: 700 }}>Faça login para salvar favoritos</div>
          </div>
        </div>
      </div>
      <div style={{ padding: 20, marginTop: -16, background: 'var(--bg)', borderRadius: '24px 24px 0 0' }}>
        <button onClick={() => nav('/login')} className="btn-press" style={{ width: '100%', background: 'var(--accent)', border: 'none', borderRadius: 16, padding: 16, fontFamily: "'Fredoka One', cursive", fontSize: 18, color: '#fff', cursor: 'pointer', marginBottom: 20, boxShadow: '0 8px 20px rgba(232, 98, 42, 0.3)' }}>
          Entrar / Cadastrar
        </button>
        {[
          { icon: '📦', label: 'Meus pedidos' },
          { icon: '❤️', label: 'Favoritos' },
          { icon: '📍', label: 'Meus endereços' },
          { icon: '💳', label: 'Formas de pagamento' },
          { icon: '🎫', label: 'Meus cupons' },
        ].map((item, i) => (
          <div key={item.label} className="animate-slide-up btn-press" style={{ background: 'var(--card-bg)', borderRadius: 14, padding: 16, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12, cursor: 'pointer', boxShadow: 'var(--shadow)', animationDelay: `${i * 0.05}s` }}>
            <span style={{ fontSize: 24 }}>{item.icon}</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', flex: 1 }}>{item.label}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: 18 }}>›</span>
          </div>
        ))}
      </div>
    </div>
  )
}

