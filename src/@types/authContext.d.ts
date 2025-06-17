import { ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
  role: string;
}

export interface Jwt {
  token: string;
  expires_in: string;
}

export interface AuthContextType {
  authenticatedUser: User | null;
  createAccount: (
    data:
      | { name: string; email: string; password: string }
      | { name: string; email: string; password: string }
  ) => Promise<true | string | undefined>;
  authLogin: (data: {
    email: string;
    password: string;
  }) => Promise<string | undefined>;
  isTokenValid: () => boolean;
  logout: () => void;
  updateUserInfo: (
    data: { name: string } | { email: string } | { password: string }
  ) => Promise<void>;
  getJWT: () => Jwt | undefined;
}

export interface AuthContextProviderProps {
  children: ReactNode;
}
