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
      paddingBottom: 'calc(4px + var(--safe-bottom))',
      paddingTop: '6px',
      boxShadow: '0 -4px 12px rgba(0,0,0,0.03)'
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
              transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
              {t.icon}
              {t.path === '/carrinho' && cartQty > 0 && (
                <span 
                  className="animate-bounce"
                  style={{ 
                    position: 'absolute', 
                    top: -4, 
                    right: -8, 
                    background: 'var(--accent)', 
                    color: '#fff', 
                    fontSize: 10, 
                    fontWeight: 900, 
                    width: 18, 
                    height: 18, 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    boxShadow: '0 2px 4px rgba(232, 98, 42, 0.3)',
                    border: '2px solid #fff'
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
              transition: 'all 0.3s ease'
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
                borderRadius: '0 0 4px 4px' 
              }} />
            )}
          </button>
        )
      })}
    </nav>
  )
}

