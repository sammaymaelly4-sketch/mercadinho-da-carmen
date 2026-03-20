import { useState, useMemo, useCallback } from 'react'
import { getPorId } from '../lib/catalog'

export function useCart() {
  const [items, setItems] = useState({})

  const add = useCallback((prodId) =>
    setItems(prev => ({ ...prev, [prodId]: (prev[prodId] || 0) + 1 })), [])

  const remove = useCallback((prodId) =>
    setItems(prev => {
      const n = (prev[prodId] || 0) - 1
      if (n <= 0) { const s = { ...prev }; delete s[prodId]; return s }
      return { ...prev, [prodId]: n }
    }), [])

  const set = useCallback((prodId, qty) => {
    if (qty <= 0) {
      setItems(prev => { const s = { ...prev }; delete s[prodId]; return s })
    } else {
      setItems(prev => ({ ...prev, [prodId]: qty }))
    }
  }, [])

  const clear = useCallback(() => setItems({}), [])

  const totalQty = useMemo(
    () => Object.values(items).reduce((a, b) => a + b, 0),
    [items]
  )

  const totalPrice = useMemo(
    () => Object.entries(items).reduce((acc, [id, qty]) => {
      const p = getPorId(id)
      return acc + (p ? p.preco * qty : 0)
    }, 0),
    [items]
  )

  const cartItems = useMemo(
    () => Object.entries(items)
      .map(([id, qty]) => ({ produto: getPorId(id), qty }))
      .filter(i => i.produto),
    [items]
  )

  return useMemo(
    () => ({ items, add, remove, set, clear, totalQty, totalPrice, cartItems }),
    [items, add, remove, set, clear, totalQty, totalPrice, cartItems]
  )
}
