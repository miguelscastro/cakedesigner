import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout'
import { Home } from './pages/Home'
import { ProductDetails } from './pages/ProductDetails'
import { Checkout } from './pages/Checkout'
import { Success } from './pages/Success'
import { Sign_in } from './pages/Sign-in'
import { AuthLayout } from './layouts/AuthLayout'
import { Sign_up } from './pages/Sign-up'
import { PrivateRoute } from './components/Private'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route element={<PrivateRoute />}>
          <Route path="checkout" element={<Checkout />} />
          <Route path="success" element={<Success />} />
        </Route>
      </Route>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="sign-in" element={<Sign_in />} />
        <Route path="sign-up" element={<Sign_up />} />
      </Route>
    </Routes>
  )
}
