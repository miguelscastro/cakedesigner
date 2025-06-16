import { Jwt } from '../contexts/AuthContext'
import { accountInfoData } from '../pages/app/User/components/MyProfile/components/AccountInfo'
import { userPersonalInfoData } from '../pages/app/User/components/MyProfile/components/PersonalInfo/components/ChangePersonalInfo'
import { userSettingsInfoData } from '../pages/app/User/components/MyProfile/components/SecuritySettings/components/ChangeSecuritySettings'

export const updateUser = async (
  tokenData: Jwt,
  data: userPersonalInfoData | accountInfoData | userSettingsInfoData,
): Promise<Response> => {
  const response = await fetch('http://localhost:8080/user/profile', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${tokenData.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return response
}
