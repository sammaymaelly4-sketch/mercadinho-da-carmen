import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartContext } from '../contexts/CartContext'
import { formatPreco } from '../lib/catalog'
import { salvarPedido } from '../lib/pedidosService'

function validarCarrinho(cartItems, totalPrice) {
  const erros = []
  if (cartItems.length === 0) erros.push('Carrinho vazio')
  if (totalPrice < 5) erros.push('Pedido mínimo: R$ 5,00')
  cartItems.forEach(({ produto, qty, precoUnitario }) => {
    if (!produto?.id) erros.push('Produto inválido detectado')
    if (qty <= 0 || qty > 99) erros.push(`Quantidade inválida: ${produto.nome}`)
    if (precoUnitario <= 0) erros.push(`Preço inválido: ${produto.nome}`)
  })
  return erros
}

export default function Carrinho() {
  const nav = useNavigate()
  const cart = useCartContext()
  const [pagamento, setPagamento] = useState('Pix')
  const [erro, setErro] = useState(null)
  const [enviando, setEnviando] = useState(false)

  async function finalizarPedido() {
    const erros = validarCarrinho(cart.cartItems, cart.totalPrice)
    if (erros.length > 0) { setErro(erros[0]); return }
    setEnviando(true)
    const pedido = {
      id: `MC-${Date.now()}`,
      itens: cart.cartItems.map(({ produto, qty, precoUnitario }) => ({
        id: produto.id, nome: produto.nome, qty, precoUnitario
      })),
      total: cart.totalPrice,
      pagamento,
      status: 'confirmado',
      criadoEm: new Date().toISOString()
    }
    await salvarPedido(pedido)
    cart.clear()
    nav('/pedidos')
  }

  if (cart.cartItems.length === 0) {
    return (
      <div className="screen animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: 40, textAlign: 'center' }}>
        <div className="animate-bounce" style={{ fontSize: 80 }}>🛒</div>
        <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 24, color: 'var(--text)' }}>Carrinho vazio</div>
        <div style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 700 }}>Adicione produtos para continuar suas compras</div>
        <button onClick={() => nav('/home')} className="btn-press" style={{ background: 'var(--accent)', border: 'none', borderRadius: 16, padding: '16px 32px', fontFamily: "'Fredoka One', cursive", fontSize: 18, color: '#fff', cursor: 'pointer', boxShadow: '0 8px 20px rgba(232, 98, 42, 0.3)' }}>
          Ver produtos
        </button>
      </div>
    )
  }

  return (
    <div className="screen">
      <div className="animate-fade-in" style={{ background: 'var(--primary)', padding: '16px 16px 14px', position: 'sticky', top: 0, zIndex: 10, display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <button onClick={() => nav(-1)} className="btn-press tap-target" style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: '18px', color: '#FFFFFF', textShadow: '0 0 5px var(--accent)' }}>Carrinho da Festa</div>
          <div style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 700 }}>{cart.totalQty} {cart.totalQty === 1 ? 'item selecionado' : 'itens selecionados'}</div>
        </div>
      </div>

      <div style={{ padding: '8px 16px' }}>
        {cart.cartItems.map(({ produto, qty, discount, precoUnitario }, i) => (
          <div key={produto.id} className="animate-slide-up" style={{
            background: 'var(--card-bg)',
            marginBottom: 12,
            borderRadius: 'var(--radius)',
            padding: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow)',
            animationDelay: `${i * 0.05}s`
          }}>
            <div style={{ fontSize: 36, width: 56, height: 56, background: 'rgba(255,0,127,0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid var(--primary)' }}>{produto.imageFallback}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)', lineHeight: 1.2 }}>{produto.nome}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, marginTop: 2 }}>
                {discount > 0
                  ? <><span style={{ textDecoration: 'line-through', marginRight: 4 }}>{formatPreco(produto.preco)}</span><span style={{ color: 'var(--accent)', fontWeight: 900 }}>{formatPreco(precoUnitario)} (-{Math.round(discount*100)}%)</span></>
                  : <>{formatPreco(produto.preco)} cada</>
                }
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255,0,127,0.1)', borderRadius: 10, padding: 2, border: '1px solid var(--primary)' }}>
                  <button onClick={() => cart.set(produto.id, qty - 1)} className="tap-target" style={{ width: 28, height: 28, borderRadius: 8, border: '1px solid var(--primary)', background: 'var(--bg)', color: 'var(--primary)', fontSize: 16, fontWeight: 900, cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>−</button>
                  <span style={{ fontSize: 15, fontWeight: 900, color: 'var(--text)', minWidth: 16, textAlign: 'center' }}>{qty}</span>
                  <button onClick={() => cart.set(produto.id, qty + 1)} className="btn-press tap-target" style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--primary)', border: '1px solid var(--accent)', color: '#fff', fontSize: 16, fontWeight: 900, cursor: 'pointer', boxShadow: '0 0 8px var(--primary)' }}>+</button>
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 16, color: discount > 0 ? 'var(--accent)' : 'var(--text)' }}>{formatPreco(precoUnitario * qty)}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <div style={{ margin: '8px 16px', background: 'rgba(255,0,127,.1)', borderRadius: 'var(--radius)', padding: 16, display: 'flex', alignItems: 'center', gap: 12, border: '1px solid var(--border)' }}>
          <span style={{ fontSize: 24, filter: 'drop-shadow(0 0 5px var(--accent))' }}>🛵</span>
          <div>
            <div style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 800 }}>Entrega Neon em até 25 min</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>A festa vai começar!</div>
          </div>
        </div>

        <div style={{ margin: '12px 16px', background: 'var(--card-bg)', borderRadius: 'var(--radius)', padding: 16, border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 700 }}>Subtotal</span>
            <span style={{ fontSize: 13, color: 'var(--text)', fontWeight: 800 }}>{formatPreco(cart.totalPrice)}</span>
          </div>
          {cart.totalDesconto > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 700 }}>⚡ Desconto Adega</span>
              <span style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 900 }}>-{formatPreco(cart.totalDesconto)}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 700 }}>Taxa de entrega</span>
            <span style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 800, textShadow: '0 0 5px var(--primary)' }}>Grátis 🎁</span>
          </div>
          <div style={{ borderTop: '2px dashed var(--border)', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: "'Fredoka One', cursive", fontSize: 18, color: 'var(--text)' }}>Total</span>
            <span style={{ fontFamily: "'Fredoka One', cursive", fontSize: 22, color: 'var(--accent)', textShadow: '0 0 8px var(--accent)' }}>{formatPreco(cart.totalPrice)}</span>
          </div>
        </div>

        <div style={{ padding: '8px 16px' }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)', marginBottom: 12 }}>💳 Forma de pagamento</div>
          <div style={{ display: 'flex', gap: 10 }}>
            {[{ icon: '💚', label: 'Pix' }, { icon: '💳', label: 'Cartão' }, { icon: '💵', label: 'Dinheiro' }].map(p => (
              <div key={p.label} onClick={() => setPagamento(p.label)} className="btn-press" style={{ flex: 1, background: pagamento === p.label ? 'var(--primary)' : 'var(--card-bg)', borderRadius: 14, padding: '12px 8px', textAlign: 'center', border: pagamento === p.label ? '1px solid var(--accent)' : '1px solid var(--border)', cursor: 'pointer', boxShadow: pagamento === p.label ? '0 4px 12px rgba(255, 0, 127, 0.4)' : 'none' }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>{p.icon}</div>
                <div style={{ fontSize: 11, color: pagamento === p.label ? '#fff' : 'var(--text-muted)', fontWeight: 900 }}>{p.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '24px 16px calc(16px + var(--safe-bottom))' }}>
          {erro && (
            <div style={{ background: '#300', border: '1px solid #F44336', borderRadius: 12, padding: '10px 16px', marginBottom: 12, fontSize: 13, color: '#FF5252', fontWeight: 700 }}>
              ⚠️ {erro}
            </div>
          )}
          <button onClick={finalizarPedido} disabled={enviando} className="btn-press" style={{ width: '100%', background: enviando ? 'var(--primary-dark)' : 'var(--primary)', border: '1px solid var(--accent)', borderRadius: 18, padding: 18, fontFamily: "'Fredoka One', cursive", fontSize: 18, color: '#fff', cursor: enviando ? 'not-allowed' : 'pointer', boxShadow: '0 8px 24px rgba(255, 0, 127, 0.4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: enviando ? 0.8 : 1, textShadow: '0 0 5px #fff' }}>
            <span>{enviando ? 'Enviando...' : 'Finalizar Pedido'}</span>
            <span>{formatPreco(cart.totalPrice)}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
