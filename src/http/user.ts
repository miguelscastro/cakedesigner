import { Jwt } from "../@types/authContext";
import { accountInfoData } from "../components/Personal/Profile/AccountInfo";
import { userPersonalInfoData } from "../components/Personal/Profile/PersonalInfo/components/ChangePersonalInfo";
import { userSettingsInfoData } from "../components/Personal/Profile/SecuritySettings/components/ChangeSecuritySettings";
import type { deleteUserInfoData } from "../components/Personal/Profile/SecuritySettings/components/DeleteAccount";

export const updateUser = async (
  tokenData: Jwt,
  data: userPersonalInfoData | accountInfoData | userSettingsInfoData
): Promise<Response> => {
  const response = await fetch("http://localhost:8080/user/profile", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${tokenData.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
};

export const deleteUserAccount = async (
  tokenData: Jwt,
  data: deleteUserInfoData
): Promise<Response> => {
  const response = await fetch(
    "http://localhost:8080/user/profile/delete-account",
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${tokenData.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return response;
};
