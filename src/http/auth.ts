import { Jwt } from "../@types/authContext";
import type { newAdminInfoData } from "../pages/app/Admin/components/ManageAdmins";
import { SignInInfoData } from "../pages/auth/Sign-in";
import { SignUpInfoData } from "../pages/auth/Sign-up";

export const createUser = async (
  data: SignUpInfoData | newAdminInfoData,
  tokenData?: Jwt
): Promise<Response> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (tokenData?.token) {
    headers["Authorization"] = `Bearer ${tokenData.token}`;
  }

  const response = await fetch("http://localhost:8080/auth/sign-up", {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  return response;
};

export const authUser = async (data: SignInInfoData): Promise<Response> => {
  const response = await fetch("http://localhost:8080/auth/sign-in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
};

export const verifyUserToken = async (
  tokenData: Jwt
): Promise<Response | void> => {
  const response = await fetch("http://localhost:8080/user", {
    headers: {
      Authorization: `Bearer ${tokenData.token}`,
    },
  });

  return response;
};
