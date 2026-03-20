import { useNavigate, useLocation } from 'react-router-dom'

const TABS = [
  { path: '/home',        icon: '🏠', label: 'Início' },
  { path: '/adega',       icon: '🍷', label: 'Combos' },
  { path: '/carrinho',    icon: '🛒', label: 'Carrinho' },
  { path: '/pedidos',     icon: '🛵', label: 'Pedidos' },
  { path: '/perfil',      icon: '👤', label: 'Perfil' },
]

export default function BottomNav({ cartQty = 0 }) {
  const nav = useNavigate()
  const { pathname } = useLocation()

  return (
    <nav style={{ 
      background: 'var(--bg)',
      borderTop: '1px solid var(--border)', 
      display: 'flex', 
      flexShrink: 0,
      paddingBottom: 'calc(4px + var(--safe-bottom))',
      paddingTop: '6px',
      boxShadow: '0 -4px 20px rgba(255, 0, 127, 0.2)'
    }}>
      {TABS.map(t => {
        const active = pathname === t.path
        return (
          <button
            key={t.path}
            onClick={() => nav(t.path)}
            className="btn-press"
            style={{ 
              flex: 1, 
              border: 'none', 
              background: 'none', 
              padding: '8px 0', 
              cursor: 'pointer', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: 4,
              position: 'relative',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div style={{ 
              fontSize: 22, 
              position: 'relative',
              transform: active ? 'translateY(-2px)' : 'none',
              transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              filter: active ? 'drop-shadow(0 0 8px var(--accent))' : 'grayscale(100%) opacity(50%)'
            }}>
              {t.icon}
              {t.path === '/carrinho' && cartQty > 0 && (
                <span 
                  className="animate-bounce"
                  style={{ 
                    position: 'absolute', 
                    top: -4, 
                    right: -8, 
                    background: 'var(--primary)',
                    color: '#fff', 
                    fontSize: 10, 
                    fontWeight: 900, 
                    width: 18, 
                    height: 18, 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    boxShadow: '0 0 10px var(--primary)',
                    border: '2px solid var(--bg)'
                  }}
                >
                  {cartQty}
                </span>
              )}
            </div>
            <span style={{ 
              fontSize: 10, 
              fontWeight: 800, 
              color: active ? 'var(--accent)' : 'var(--text-muted)', 
              opacity: active ? 1 : 0.7,
              transition: 'all 0.3s ease',
              textShadow: active ? '0 0 5px var(--accent)' : 'none'
            }}>
              {t.label}
            </span>
            {active && (
              <div className="animate-fade-in" style={{ 
                position: 'absolute', 
                top: 0, 
                width: '30%', 
                height: 3, 
                background: 'var(--accent)', 
                boxShadow: '0 0 10px var(--accent)',
                borderRadius: '0 0 4px 4px' 
              }} />
            )}
          </button>
        )
      })}
    </nav>
  )
}

