import { useNavigate, useLocation } from 'react-router-dom'

const TABS = [
  { path: '/home',        icon: '🏠', label: 'Início' },
  { path: '/categorias',  icon: '☰',  label: 'Categorias' },
  { path: '/carrinho',    icon: '🛒',  label: 'Carrinho' },
  { path: '/pedidos',     icon: '📦',  label: 'Pedidos' },
  { path: '/perfil',      icon: '👤',  label: 'Perfil' },
]

export default function BottomNav({ cartQty = 0 }) {
  const nav = useNavigate()
  const { pathname } = useLocation()

  return (
    <nav style={{ 
      background: '#fff', 
      borderTop: '1px solid var(--border)', 
      display: 'flex', 
      flexShrink: 0,
      paddingBottom: 'calc(6px + var(--safe-bottom))',
      paddingTop: '6px',
      boxShadow: '0 -4px 20px rgba(0,0,0,0.05)'
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
              padding: '8px 0 6px', 
              cursor: 'pointer', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: 3,
              minHeight: 52,
              position: 'relative',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Active top indicator */}
            {active && (
              <div
                className="nav-indicator"
                style={{ 
                  position: 'absolute', 
                  top: 0, 
                  height: 3, 
                  background: 'var(--accent)', 
                  borderRadius: '0 0 4px 4px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '30%',
                }} 
              />
            )}

            <div style={{ 
              fontSize: 24, 
              position: 'relative',
              transform: active ? 'translateY(-1px)' : 'none',
              transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              lineHeight: 1,
            }}>
              {t.icon}
              {t.path === '/carrinho' && cartQty > 0 && (
                <span 
                  key={cartQty}
                  className="animate-bounce"
                  style={{ 
                    position: 'absolute', 
                    top: -5, 
                    right: -10, 
                    background: 'var(--accent)', 
                    color: '#fff', 
                    fontSize: 10, 
                    fontWeight: 900, 
                    minWidth: 18, 
                    height: 18, 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(232, 98, 42, 0.4)',
                    border: '2px solid #fff',
                    padding: '0 3px',
                  }}
                >
                  {cartQty > 9 ? '9+' : cartQty}
                </span>
              )}
            </div>
            <span style={{ 
              fontSize: 11, 
              fontWeight: 800, 
              color: active ? 'var(--accent)' : 'var(--text-muted)', 
              opacity: active ? 1 : 0.65,
              transition: 'all 0.25s ease',
              letterSpacing: active ? '0.01em' : 'normal',
            }}>
              {t.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
