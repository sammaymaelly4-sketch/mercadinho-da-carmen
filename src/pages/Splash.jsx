import { useNavigate } from 'react-router-dom'

export default function Splash() {
  const nav = useNavigate()

  return (
    <div style={{ width: '100%', height: '100%', background: '#1E3D2A', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', fontFamily: "'Nunito', sans-serif", padding: '0 20px' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle,rgba(196,168,130,.07) 1px,transparent 1px)', backgroundSize: '22px 22px' }} />
      <div style={{ position: 'absolute', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle,rgba(232,98,42,.18) 0%,transparent 65%)', top: '36%', left: '50%', transform: 'translate(-50%,-55%)', animation: 'pulse 2.8s ease-in-out infinite' }} />

      <div style={{ width: 88, height: 88, background: '#E8622A', borderRadius: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, marginBottom: 20, zIndex: 1, animation: 'pop .8s cubic-bezier(.34,1.56,.64,1) both .2s', boxShadow: '0 8px 24px rgba(232,98,42,.4)' }}>
        🛒
      </div>

      <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 30, color: '#F0E8D8', textAlign: 'center', lineHeight: 1.1, zIndex: 1, animation: 'fadeUp .6s ease both .5s', opacity: 0 }}>
        Mercadinho<br />
        <span style={{ color: '#E8622A' }}>da Carmen</span>
      </div>

      <div style={{ fontSize: 11, color: '#C4A882', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', marginTop: 8, zIndex: 1, animation: 'fadeUp .6s ease both .7s', opacity: 0 }}>
        Escolha sua experiência
      </div>

      <div style={{ width: '100%', maxWidth: 340, marginTop: 30, display: 'grid', gap: 12, zIndex: 1 }}>
        <button
          onClick={() => nav('/home')}
          className="btn-press tap-target"
          style={{
            border: 'none',
            borderRadius: 18,
            padding: '16px 18px',
            textAlign: 'left',
            background: 'linear-gradient(135deg,#2D5A3D,#1E3D2A)',
            color: '#fff',
            cursor: 'pointer',
            boxShadow: '0 8px 18px rgba(0,0,0,.2)',
          }}
        >
          <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 20 }}>🛒 Mercado</div>
          <div style={{ fontSize: 12, marginTop: 2, color: '#CFE1D4', fontWeight: 700 }}>Produtos do dia a dia e básicos</div>
        </button>

        <button
          onClick={() => nav('/adega')}
          className="btn-press tap-target"
          style={{
            border: '1px solid rgba(200,146,42,.35)',
            borderRadius: 18,
            padding: '16px 18px',
            textAlign: 'left',
            background: 'linear-gradient(135deg,#0D2B1A,#1b3b2a)',
            color: '#fff',
            cursor: 'pointer',
            boxShadow: '0 8px 18px rgba(0,0,0,.25)',
          }}
        >
          <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 20, color: '#F5C842' }}>🍷 Adega</div>
          <div style={{ fontSize: 12, marginTop: 2, color: '#D1BB84', fontWeight: 700 }}>Cervejas, vinhos, destilados e combos</div>
        </button>
      </div>

      <div style={{ position: 'absolute', bottom: 26, fontSize: 10, color: '#6B8A72', fontWeight: 700, letterSpacing: '.08em', zIndex: 1 }}>
        📍 Vila São José · Taubaté SP
      </div>
    </div>
  )
}
