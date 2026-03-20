export function Pedidos() {
  return (
    <div className="screen">
      <div className="animate-fade-in" style={{ background: 'var(--primary)', padding: '16px 16px 14px', position: 'sticky', top: 0, zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 20, color: '#F0E8D8' }}>Meus Pedidos</div>
      </div>

      <div className="animate-slide-up" style={{ margin: '16px 16px 0', background: 'var(--primary-dark)', borderRadius: 'var(--radius)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
        <div style={{ background: 'var(--primary)', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: '18px', color: '#F0E8D8' }}>🛵 A caminho!</div>
            <div style={{ fontSize: '11px', color: '#C4A882', fontWeight: 700, marginTop: 4 }}>#MC-2847 · Vila São José</div>
          </div>
          <div style={{ background: 'rgba(129,199,132,0.15)', borderRadius: 99, padding: '6px 12px', fontSize: '11px', color: '#81C784', fontWeight: 800 }}>🟢 EM ROTA</div>
        </div>

        <div style={{ padding: '20px 16px' }}>
          {[
            { icon: '✓',  label: 'Pedido confirmado', sub: '14:32 · Pix aprovado',       done: true,  active: false },
            { icon: '✓',  label: 'Preparando',         sub: '14:33 · Carmen separou',     done: true,  active: false },
            { icon: '🛵', label: 'A caminho',           sub: '14:38 · saiu para entrega',  done: false, active: true  },
            { icon: '🏠', label: 'Entregue',            sub: 'previsão: 14:56',            done: false, active: false },
          ].map((s, i, arr) => (
            <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div className={s.active ? "animate-bounce" : ""} style={{ width: 32, height: 32, borderRadius: '50%', background: s.done ? 'var(--primary)' : s.active ? 'var(--accent)' : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#fff', flexShrink: 0 }}>
                  {s.icon}
                </div>
                <div style={{ paddingTop: 6 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: s.active ? '#fff' : s.done ? '#C4A882' : 'rgba(255,255,255,0.3)' }}>{s.label}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>{s.sub}</div>
                </div>
              </div>
              {i < arr.length - 1 && (
                <div style={{ width: 2, height: 16, background: s.done ? 'var(--primary)' : 'rgba(255,255,255,0.1)', marginLeft: 15, marginTop: 4, marginBottom: 4 }} />
              )}
            </div>
          ))}
        </div>

        <div style={{ padding: '12px 16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div>
            <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 32, color: 'var(--accent)' }}>18 min</div>
            <div style={{ fontSize: 11, color: '#C4A882', fontWeight: 700 }}>tempo estimado</div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn-press" style={{ width: 44, height: 44, borderRadius: '50%', border: '2px solid var(--primary)', background: 'transparent', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>💬</button>
            <button className="btn-press" style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--primary)', border: 'none', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📞</button>
          </div>
        </div>
      </div>

      <div className="animate-slide-up" style={{ padding: '24px 16px 0' }}>
        <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 16, color: 'var(--text)', marginBottom: 12 }}>Histórico</div>
        <div className="btn-press" style={{ background: 'var(--card-bg)', borderRadius: 'var(--radius)', padding: 16, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: 'var(--shadow)' }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)' }}>Pedido #MC-2841</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, marginTop: 4 }}>Ontem · 3 itens · R$ 24,80</div>
          </div>
          <div style={{ background: 'rgba(45,90,61,0.08)', borderRadius: 99, padding: '6px 12px', fontSize: 11, color: 'var(--primary)', fontWeight: 800 }}>✅ Entregue</div>
        </div>
      </div>
      <div style={{ height: 32 }} />
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
            <div style={{ fontSize: 11, color: '#C4A882', fontWeight: 700 }}>Faça login para salvar favoritos</div>
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

