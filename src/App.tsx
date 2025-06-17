import { ThemeProvider } from "styled-components";

import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { CartContextProvider } from "./contexts/CartContext";
import { AuthContextProvider } from "./contexts/AuthContext";
import { AdminContextProvider } from "./contexts/AdminContext";
import { UserContextProvider } from "./contexts/UserContext";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <AuthContextProvider>
          <AdminContextProvider>
            <UserContextProvider>
              <CartContextProvider>
                <Router />
              </CartContextProvider>
            </UserContextProvider>
          </AdminContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
}
