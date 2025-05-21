import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout'
import { Home } from './pages/Home'
import { ProductDetails } from './pages/ProductDetails'
import { Checkout } from './pages/Checkout'
import { Success } from './pages/Success'
import { Login } from './pages/Login'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
      </Route>
      <Route path="/login">
        <Route path="/login/" element={<Login />} />
      </Route>
    </Routes>
  )
}
