import { Routes, Route } from 'react-router-dom'

import { DefaultLayout } from './layouts/DefaultLayout'
import { AuthLayout } from './layouts/AuthLayout'

import { PrivateRoute } from './components/Private'

import { Sign_in } from './pages/auth/Sign-in'
import { Sign_up } from './pages/auth/Sign-up'

import { Checkout } from './pages/app/Checkout'
import { Success } from './pages/app/Success'
import { Profile } from './pages/app/Profile'

import { Home } from './pages/public/Home'
import { ProductDetails } from './pages/public/ProductDetails'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route element={<PrivateRoute />}>
          <Route path="checkout" element={<Checkout />} />
          <Route path="success" element={<Success />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="sign-in" element={<Sign_in />} />
        <Route path="sign-up" element={<Sign_up />} />
      </Route>
    </Routes>
  )
}
