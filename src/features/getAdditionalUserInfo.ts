import proxy from '@/shared/http'
import { USER_INFO } from '@/shared/constants/endpoints'
import { v4 } from 'uuid'
import { type AdditionalUserInfo } from '@/shared/types'
import { unstable_cache } from 'next/cache'

const fetchAdditionalUserInfo = async (
  token: string,
): Promise<AdditionalUserInfo> => {
  return await proxy
    .request<AdditionalUserInfo>({
      url: USER_INFO,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        applicationType: 'ContingentAPI',
        action: 'Api/AdditionalUserInfo',
        operationId: v4(),
      },
    })
    .then((res) => res.data)
}

/*
  What called an additional user info here is the class and the school of the viewer, nothing else
  It is doubtedly going to change often, so we can cache it for a long time
*/

export const getAdditionalUserInfo = unstable_cache(
  fetchAdditionalUserInfo,
  ['AdditionalUserInfo'],
  {
    revalidate: 60 * 60 * 24 * 15,
  },
)
