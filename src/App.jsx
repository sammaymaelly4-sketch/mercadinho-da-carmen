import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { CartProvider, useCartContext } from './contexts/CartContext'
import BottomNav from './components/BottomNav'

const Splash        = lazy(() => import('./pages/Splash'))
const Home          = lazy(() => import('./pages/Home'))
const Categorias    = lazy(() => import('./pages/Categorias').then(m => ({ default: m.Categorias })))
const CategoriaPage = lazy(() => import('./pages/Categorias').then(m => ({ default: m.CategoriaPage })))
const Adega         = lazy(() => import('./pages/Adega'))
const Carrinho      = lazy(() => import('./pages/Carrinho'))
const Pedidos       = lazy(() => import('./pages/Pedidos').then(m => ({ default: m.Pedidos })))
const Perfil        = lazy(() => import('./pages/Pedidos').then(m => ({ default: m.Perfil })))
const Login         = lazy(() => import('./pages/Login'))
const Produto       = lazy(() => import('./pages/Produto'))

const NO_NAV = ['/', '/login']

function Shell() {
  const cart = useCartContext()
  const { pathname } = useLocation()
  const showNav = !NO_NAV.includes(pathname)

  return (
    <div className="app-shell">
      <Suspense fallback={<div style={{ flex: 1, background: 'var(--bg)' }} />}>
        <Routes>
          <Route path="/"              element={<Splash />} />
          <Route path="/home"          element={<Home />} />
          <Route path="/categorias"    element={<Categorias />} />
          <Route path="/categoria/:id" element={<CategoriaPage />} />
          <Route path="/adega"         element={<Adega />} />
          <Route path="/produto/:id"   element={<Produto />} />
          <Route path="/carrinho"      element={<Carrinho />} />
          <Route path="/pedidos"       element={<Pedidos />} />
          <Route path="/perfil"        element={<Perfil />} />
          <Route path="/login"         element={<Login />} />
        </Routes>
      </Suspense>
      {showNav && <BottomNav cartQty={cart.totalQty} />}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Shell />
      </CartProvider>
    </BrowserRouter>
  )
}
