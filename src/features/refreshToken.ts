import proxy from '@/shared/http'
import { REFRESH_TOKEN } from '@/shared/constants/endpoints'
import { v4 } from 'uuid'
import { LoginHttpResponse } from '@/shared/types'
import { getAdditionalUserInfo } from '@/features/getAdditionalUserInfo'
import { getCityByJceUrl } from '@/lib/utils'

type RefreshActionType = {
  accessToken: string
  refreshToken: string
  city: string
}

export const refreshToken = async (
  token: string,
  device: string,
): Promise<RefreshActionType> => {
  const { accessToken, refreshToken, applications } = await proxy
    .request<LoginHttpResponse>({
      method: 'POST',
      url: REFRESH_TOKEN,
      data: {
        action: 'v1/Users/ReissueTokens',
        operationId: v4(),
        refreshToken: token,
        deviceInfo: device,
      },
    })
    .then((res) => res.data)

  const {
    school: { gid: UserSchoolGid },
  } = await getAdditionalUserInfo(accessToken)

  const schoolOrganization = applications.find((application) => {
    return (
      application.organizationGid === UserSchoolGid && application.type === 52
    )
  })

  return {
    accessToken,
    refreshToken,
    city: getCityByJceUrl(schoolOrganization?.url!),
  }
}
