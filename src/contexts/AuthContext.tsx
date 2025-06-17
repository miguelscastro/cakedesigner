import { createContext, useEffect, useState } from "react";
import { SignInInfoData } from "../pages/auth/Sign-in";
import { useNavigate } from "react-router-dom";
import { SignUpInfoData } from "../pages/auth/Sign-up";
import { authUser, createUser, verifyUserToken } from "../http/auth";
import { updateUser } from "../http/user";
import {
  AuthContextProviderProps,
  AuthContextType,
  Jwt,
  User,
} from "../@types/authContext";
import { userPersonalInfoData } from "../components/Personal/Profile/PersonalInfo/components/ChangePersonalInfo";
import { userSettingsInfoData } from "../components/Personal/Profile/SecuritySettings/components/ChangeSecuritySettings";
import { accountInfoData } from "../components/Personal/Profile/AccountInfo";
import type { newAdminInfoData } from "../pages/app/Admin/components/ManageAdmins";

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null);

  const navigate = useNavigate();

  function getJWT() {
    const tokenString = localStorage.getItem("token");

    if (!tokenString) {
      setAuthenticatedUser(null);
      return;
    }

    try {
      const tokenData = JSON.parse(tokenString);
      return tokenData;
    } catch (err) {
      console.error("Erro ao fazer parse do token:", err);
      localStorage.removeItem("token");
      setAuthenticatedUser(null);
      return;
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      const tokenData = getJWT();
      if (tokenData == null) {
        return;
      }

      try {
        const response = await verifyUserToken(tokenData);

        if (!response || !response.ok) {
          throw new Error("Token inválido ou expirado");
        }

        const userData = await response.json();
        setAuthenticatedUser({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          photoUrl: userData.profileImage,
          role: userData.role,
        });
      } catch (err) {
        console.error("Erro ao buscar usuário:", err);
        localStorage.removeItem("token");
        setAuthenticatedUser(null);
      }
    };
    fetchUser();
    const verifyTokenExpireDate = setInterval(() => {
      if (!isTokenValid()) {
        logout();
      }
    }, 60 * 1000);
    return () => clearInterval(verifyTokenExpireDate);
  }, []);

  async function createAccount(data: SignUpInfoData | newAdminInfoData) {
    const tokenData = getJWT();
    if (tokenData == null) {
      return;
    }

    try {
      const isAdmin = "role" in data && data.role === "ADMIN";

      const response = await createUser(data, isAdmin ? tokenData : undefined);

      if (!response.ok) {
        return "Algo deu errado, tente novamente";
      }

      await response.json();
      return true;
    } catch {
      return "Erro ao criar conta. Tente novamente.";
    }
  }

  async function updateUserInfo(
    data: userPersonalInfoData | accountInfoData | userSettingsInfoData
  ) {
    const tokenData = getJWT();
    if (tokenData == null) {
      return;
    }

    try {
      const response = await updateUser(tokenData, data);

      if (!response.ok) {
        throw new Error("Credenciais inválidas");
      }

      const userData = await response.json();

      setAuthenticatedUser({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        photoUrl: userData.profileImage,
        role: userData.role,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function authLogin(data: SignInInfoData) {
    try {
      const response = await authUser(data);

      if (!response.ok) {
        return "Email ou senha invalidos";
      }

      const authData = await response.json();
      const { access_token, user } = authData;

      localStorage.setItem("token", JSON.stringify(access_token));
      setAuthenticatedUser({
        id: user.id,
        name: user.name,
        email: user.email,
        photoUrl: user.profileImage,
        role: user.role,
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  function isTokenValid() {
    const tokenString = localStorage.getItem("token");
    if (!tokenString) return false;

    try {
      const tokenData: Jwt = JSON.parse(tokenString);
      const expiresAt = new Date(tokenData.expires_in).getTime();
      return Date.now() < expiresAt;
    } catch (error) {
      console.error("Erro ao validar token:", error);
      return false;
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setAuthenticatedUser(null);
  }
  return (
    <AuthContext.Provider
      value={{
        authenticatedUser,
        createAccount,
        authLogin,
        isTokenValid,
        logout,
        updateUserInfo,
        getJWT,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
