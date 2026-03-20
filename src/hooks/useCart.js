import { useState, useMemo, useCallback, useEffect } from 'react'
import { getPorId, getAdegazDiscount } from '../lib/catalog'

export function useCart() {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cart') || '{}') } catch { return {} }
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

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

  // cartItems inclui desconto por unidade para produtos da Adega
  const cartItems = useMemo(
    () => Object.entries(items)
      .map(([id, qty]) => {
        const produto = getPorId(id)
        if (!produto) return null
        const discount = produto.adega ? getAdegazDiscount(qty) : 0
        const precoUnitario = produto.preco * (1 - discount)
        return { produto, qty, discount, precoUnitario }
      })
      .filter(Boolean),
    [items]
  )

  const totalPrice = useMemo(
    () => cartItems.reduce((acc, { precoUnitario, qty }) => acc + precoUnitario * qty, 0),
    [cartItems]
  )

  const totalDesconto = useMemo(
    () => cartItems.reduce((acc, { produto, qty, discount }) =>
      acc + produto.preco * qty * discount, 0),
    [cartItems]
  )

  return useMemo(
    () => ({ items, add, remove, set, clear, totalQty, totalPrice, totalDesconto, cartItems }),
    [items, add, remove, set, clear, totalQty, totalPrice, totalDesconto, cartItems]
  )
}
