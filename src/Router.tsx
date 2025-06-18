import { Routes, Route, Navigate } from "react-router-dom";

import { DefaultLayout } from "./layouts/DefaultLayout";
import { AuthLayout } from "./layouts/AuthLayout";
import { PrivateRoute } from "./layouts/Private";

import { Sign_in } from "./pages/auth/Sign-in";
import { Sign_up } from "./pages/auth/Sign-up";

import { Checkout } from "./pages/app/Checkout";
import { Success } from "./pages/app/Success";

import { Home } from "./pages/public/Home";
import { ProductDetails } from "./pages/public/ProductDetails";
import { User } from "./pages/app/User";
import { Purchases } from "./pages/app/User/components/Purchases";
import { Admin } from "./pages/app/Admin";
import { PersonalInfo } from "./components/Personal/Profile/PersonalInfo";
import { ChangeUserInfo } from "./components/Personal/Profile/PersonalInfo/components/ChangePersonalInfo";
import { SecuritySettings } from "./components/Personal/Profile/SecuritySettings";
import { ChangeUserSecurityInfo } from "./components/Personal/Profile/SecuritySettings/components/ChangeSecuritySettings";
import { Profile } from "./components/Personal/Profile";
import { AccountInfo } from "./components/Personal/Profile/AccountInfo";
import { Dashboard } from "./pages/app/Admin/components/Dashboard";
import { Products } from "./pages/app/Admin/components/Products";
import { ManageAdmins } from "./pages/app/Admin/components/ManageAdmins";
import { Orders } from "./pages/app/Admin/components/Orders";

export function Router() {
  const profileRoutes = (
    <Route path="profile" element={<Profile />}>
      <Route path="my-data" element={<PersonalInfo />}>
        <Route path="personal-data" element={<ChangeUserInfo />} />
      </Route>
      <Route path="account-data" element={<AccountInfo />} />
      <Route path="security-settings" element={<SecuritySettings />}>
        <Route path="manage-info" element={<ChangeUserSecurityInfo />} />
      </Route>
    </Route>
  );
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path="product/:id" element={<ProductDetails />} />

        <Route element={<PrivateRoute allowedRoles={["USER"]} />}>
          <Route path="checkout" element={<Checkout />} />
          <Route path="success" element={<Success />} />

          <Route path="/user" element={<User />}>
            <Route index element={<Navigate to="profile" />} />
            {profileRoutes}

            <Route path="purchases" element={<Purchases />} />
          </Route>
        </Route>
        <Route element={<PrivateRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/admin" element={<Admin />}>
            <Route index element={<Navigate to="profile" />} />
            {profileRoutes}

            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="manage-admins" element={<ManageAdmins />} />
          </Route>
        </Route>
      </Route>

      <Route path="/auth" element={<AuthLayout />}>
        <Route path="sign-in" element={<Sign_in />} />
        <Route path="sign-up" element={<Sign_up />} />
      </Route>
    </Routes>
  );
}
