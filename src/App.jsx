import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useCart } from './hooks/useCart'
import BottomNav from './components/BottomNav'
import Splash from './pages/Splash'
import Home from './pages/Home'
import { Categorias, CategoriaPage } from './pages/Categorias'
import Carrinho from './pages/Carrinho'
import { Pedidos, Perfil } from './pages/Pedidos'
import Login from './pages/Login'
import Produto from './pages/Produto'

const NO_NAV = ['/', '/login']

function Shell() {
  const cart = useCart()
  const { pathname } = useLocation()
  const showNav = !NO_NAV.includes(pathname)

  return (
    <div className="app-shell">
      <Routes>
        <Route path="/"              element={<Splash />} />
        <Route path="/home"          element={<Home cart={cart} onAdd={cart.add} onRemove={cart.remove} />} />
        <Route path="/categorias"    element={<Categorias />} />
        <Route path="/categoria/:id" element={<CategoriaPage cart={cart} onAdd={cart.add} onRemove={cart.remove} />} />
        <Route path="/produto/:id"   element={<Produto cart={cart} onAdd={cart.add} onRemove={cart.remove} />} />
        <Route path="/carrinho"      element={<Carrinho cart={cart} />} />
        <Route path="/pedidos"       element={<Pedidos />} />
        <Route path="/perfil"        element={<Perfil />} />
        <Route path="/login"         element={<Login />} />
      </Routes>
      {showNav && <BottomNav cartQty={cart.totalQty} />}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  )
}
