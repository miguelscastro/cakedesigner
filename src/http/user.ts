import { Jwt } from '../@types/authContext'
import { accountInfoData } from '../components/Personal/Profile/AccountInfo'
import { userPersonalInfoData } from '../components/Personal/Profile/PersonalInfo/components/ChangePersonalInfo'
import { userSettingsInfoData } from '../components/Personal/Profile/SecuritySettings/components/ChangeSecuritySettings'

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
