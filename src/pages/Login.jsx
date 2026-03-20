import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const nav = useNavigate()
  const [tab, setTab] = useState('entrar')

  return (
    <div className="animate-fade-in" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)', fontFamily: "'Nunito', sans-serif" }}>
      <div style={{ background: 'var(--primary-dark)', padding: '40px 20px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle,rgba(196,168,130,.07) 1px,transparent 1px)', backgroundSize: '20px 20px' }} />
        <button onClick={() => nav(-1)} className="btn-press tap-target" style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(255,255,255,.13)', border: 'none', color: '#fff', width: 36, height: 36, borderRadius: '50%', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
        <div className="animate-bounce" style={{ fontFamily: "'Fredoka One', cursive", fontSize: 32, color: '#F0E8D8', zIndex: 1, lineHeight: 1 }}>Mercadinho</div>
        <div className="animate-bounce stagger-1" style={{ fontFamily: "'Fredoka One', cursive", fontSize: 32, color: 'var(--accent)', zIndex: 1, lineHeight: 1 }}>da Carmen</div>
        <div className="animate-fade-in stagger-2" style={{ fontSize: 12, color: '#C4A882', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', marginTop: 8, zIndex: 1 }}>Delivery do Bairro</div>
        <div className="animate-bounce stagger-3" style={{ fontSize: 80, margin: '24px 0 16px', zIndex: 1 }}>🛒</div>
        <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 17, color: '#F0E8D8', zIndex: 1 }}>
          {tab === 'entrar' ? 'Bem-vindo de volta!' : 'Criar conta grátis'}
        </div>
        <div style={{ fontSize: 10, color: '#C4A882', fontWeight: 700, marginTop: 3, zIndex: 1 }}>
          {tab === 'entrar' ? 'Entre pra ver seus favoritos' : 'Rápido e fácil, 1 minuto'}
        </div>
      </div>

      <div className="animate-slide-up" style={{ flex: 1, background: 'var(--bg)', borderRadius: '32px 32px 0 0', padding: '32px 24px', marginTop: -24, overflowY: 'auto', zIndex: 2, boxShadow: '0 -8px 24px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', background: 'rgba(45,90,61,.08)', borderRadius: 16, padding: 4, marginBottom: 24 }}>
          {['entrar', 'cadastrar'].map(t => (
            <div key={t} onClick={() => setTab(t)} className="btn-press" style={{ flex: 1, textAlign: 'center', padding: 12, fontSize: 14, fontWeight: 800, borderRadius: 12, cursor: 'pointer', background: tab === t ? '#fff' : 'transparent', color: tab === t ? 'var(--primary)' : 'var(--text-muted)', boxShadow: tab === t ? '0 2px 8px rgba(0,0,0,0.05)' : 'none', transition: 'all 0.3s ease' }}>
              {t === 'entrar' ? 'Entrar' : 'Cadastrar'}
            </div>
          ))}
        </div>

        {tab === 'cadastrar' && (
          <div className="animate-fade-in" style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 6 }}>Nome completo</label>
            <input placeholder="Carmen Silva" style={{ width: '100%', background: '#fff', border: '1.5px solid var(--border)', borderRadius: 14, padding: '14px 16px', fontFamily: "'Nunito', sans-serif", fontSize: 15, fontWeight: 700, color: 'var(--text)', outline: 'none' }} />
          </div>
        )}

        <div className="animate-fade-in" style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 6 }}>Telefone ou E-mail</label>
          <input placeholder="(12) 99999-9999" style={{ width: '100%', background: '#fff', border: '1.5px solid var(--border)', borderRadius: 14, padding: '14px 16px', fontFamily: "'Nunito', sans-serif", fontSize: 15, fontWeight: 700, color: 'var(--text)', outline: 'none' }} />
        </div>

        <div className="animate-fade-in" style={{ marginBottom: 8 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 6 }}>Senha</label>
          <input type="password" placeholder="••••••••" style={{ width: '100%', background: '#fff', border: '1.5px solid var(--border)', borderRadius: 14, padding: '14px 16px', fontFamily: "'Nunito', sans-serif", fontSize: 15, fontWeight: 700, color: 'var(--text)', outline: 'none' }} />
        </div>

        {tab === 'entrar' && (
          <div style={{ textAlign: 'right', marginBottom: 20 }}>
            <span style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 800, cursor: 'pointer' }}>Esqueci minha senha</span>
          </div>
        )}

        <button onClick={() => nav('/home')} className="btn-press" style={{ width: '100%', background: 'var(--accent)', border: 'none', borderRadius: 16, padding: 18, fontFamily: "'Fredoka One', cursive", fontSize: 18, color: '#fff', cursor: 'pointer', marginTop: 12, marginBottom: 24, boxShadow: '0 8px 20px rgba(232, 98, 42, 0.3)' }}>
          {tab === 'entrar' ? '🔓 Entrar agora' : '✅ Criar minha conta'}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, borderTop: '1px solid var(--border)' }} />
          <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 700 }}>ou continue com</span>
          <div style={{ flex: 1, borderTop: '1px solid var(--border)' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[{ icon: '📱', label: 'WhatsApp' }, { icon: '🔵', label: 'Google' }].map(b => (
            <button key={b.label} onClick={() => nav('/home')} className="btn-press" style={{ width: '100%', background: '#fff', border: '1.5px solid var(--border)', borderRadius: 14, padding: 14, fontFamily: "'Nunito', sans-serif", fontSize: 15, fontWeight: 800, color: 'var(--text)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
              {b.icon} {b.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
          {['⭐ Favoritos salvos', '📦 Histórico', '🏷️ Cupons', '🔁 Reordenar'].map(c => (
            <div key={c} style={{ background: 'rgba(45,90,61,.08)', borderRadius: 99, padding: '4px 10px', fontSize: 9, fontWeight: 800, color: '#2D5A3D' }}>{c}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
