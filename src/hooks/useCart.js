import { useState } from 'react'
import { getPorId } from '../lib/catalog'

export function useCart() {
  const [items, setItems] = useState({})

  const add = (prodId) =>
    setItems(prev => ({ ...prev, [prodId]: (prev[prodId] || 0) + 1 }))

  const remove = (prodId) =>
    setItems(prev => {
      const n = (prev[prodId] || 0) - 1
      if (n <= 0) { const s = { ...prev }; delete s[prodId]; return s }
      return { ...prev, [prodId]: n }
    })

  const set = (prodId, qty) => {
    if (qty <= 0) {
      setItems(prev => { const s = { ...prev }; delete s[prodId]; return s })
    } else {
      setItems(prev => ({ ...prev, [prodId]: qty }))
    }
  }

  const clear = () => setItems({})

  const totalQty = Object.values(items).reduce((a, b) => a + b, 0)

  const totalPrice = Object.entries(items).reduce((acc, [id, qty]) => {
    const p = getPorId(id)
    return acc + (p ? p.preco * qty : 0)
  }, 0)

  const cartItems = Object.entries(items)
    .map(([id, qty]) => ({ produto: getPorId(id), qty }))
    .filter(i => i.produto)

  return { items, add, remove, set, clear, totalQty, totalPrice, cartItems }
}
