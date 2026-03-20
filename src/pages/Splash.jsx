import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Splash() {
  const nav = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => nav('/home'), 2600)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{ width: '100%', height: '100%', background: '#1E3D2A', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', fontFamily: "'Nunito', sans-serif" }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle,rgba(196,168,130,.07) 1px,transparent 1px)', backgroundSize: '22px 22px' }} />
      <div style={{ position: 'absolute', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle,rgba(232,98,42,.18) 0%,transparent 65%)', top: '50%', left: '50%', transform: 'translate(-50%,-55%)', animation: 'pulse 2.8s ease-in-out infinite' }} />

      <div style={{ width: 88, height: 88, background: '#E8622A', borderRadius: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, marginBottom: 20, zIndex: 1, animation: 'pop .8s cubic-bezier(.34,1.56,.64,1) both .2s', boxShadow: '0 8px 24px rgba(232,98,42,.4)' }}>
        🛒
      </div>

      <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 28, color: '#F0E8D8', textAlign: 'center', lineHeight: 1.1, zIndex: 1, animation: 'fadeUp .6s ease both .5s', opacity: 0 }}>
        Mercadinho<br />
        <span style={{ color: '#E8622A' }}>da Carmen</span>
      </div>

      <div style={{ fontSize: 11, color: '#C4A882', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', marginTop: 8, zIndex: 1, animation: 'fadeUp .6s ease both .7s', opacity: 0 }}>
        Delivery do Bairro
      </div>

      <div style={{ position: 'absolute', bottom: 52, width: 160, height: 3, background: 'rgba(196,168,130,.2)', borderRadius: 99, overflow: 'hidden', zIndex: 1 }}>
        <div style={{ height: '100%', width: 0, background: '#E8622A', borderRadius: 99, animation: 'fillBar 2s ease forwards 1s' }} />
      </div>

      <div style={{ position: 'absolute', bottom: 26, fontSize: 10, color: '#6B8A72', fontWeight: 700, letterSpacing: '.08em', zIndex: 1 }}>
        📍 Vila São José · Taubaté SP
      </div>
    </div>
  )
}
