import { Routes, Route, Navigate } from 'react-router-dom'

import { DefaultLayout } from './layouts/DefaultLayout'
import { AuthLayout } from './layouts/AuthLayout'

import { PrivateRoute } from './components/Private'

import { Sign_in } from './pages/auth/Sign-in'
import { Sign_up } from './pages/auth/Sign-up'

import { Checkout } from './pages/app/Checkout'
import { Success } from './pages/app/Success'

import { Home } from './pages/public/Home'
import { ProductDetails } from './pages/public/ProductDetails'
import { User } from './pages/app/User'
import { Purchases } from './pages/app/User/components/Purchases'
import { MyProfile } from './pages/app/User/components/MyProfile'
import { PersonalInfo } from './pages/app/User/components/MyProfile/components/PersonalInfo'
import { AccountInfo } from './pages/app/User/components/MyProfile/components/AccountInfo'
import { SecuritySettings } from './pages/app/User/components/MyProfile/components/SecuritySettings'
import { ChangeUserInfo } from './pages/app/User/components/MyProfile/components/PersonalInfo/ChangeUserInfo'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path="product/:id" element={<ProductDetails />} />

        <Route element={<PrivateRoute />}>
          <Route path="checkout" element={<Checkout />} />
          <Route path="success" element={<Success />} />

          <Route path="/user" element={<User />}>
            <Route index element={<Navigate to="profile" />} />

            <Route path="purchases" element={<Purchases />} />

            <Route path="profile" element={<MyProfile />}>
              <Route path="my-data" element={<PersonalInfo />}>
                <Route path="edit" element={<ChangeUserInfo />} />
              </Route>
              <Route path="account-data" element={<AccountInfo />} />
              <Route path="security-settings" element={<SecuritySettings />} />
            </Route>
          </Route>
        </Route>
      </Route>

      <Route path="/auth" element={<AuthLayout />}>
        <Route path="sign-in" element={<Sign_in />} />
        <Route path="sign-up" element={<Sign_up />} />
      </Route>
    </Routes>
  )
}
