import { CityAbbr } from '@/shared/constants/cities'
import proxy from '@/shared/http'
import { GET_JOURNAL } from '@/shared/constants/endpoints'
import { decode } from '@/lib/token/jwt'
import { Journal, Userinfo } from '@/shared/types'
import { v4 } from 'uuid'

export const getJournal = async (
  token: string,
  city: CityAbbr,
): Promise<Journal> => {
  const { UserInfo: stringifiedUserInfo } = await decode<{ UserInfo: string }>(
    token,
  )
  const { PersonGid: studentId } = JSON.parse(stringifiedUserInfo) as Userinfo

  return await proxy
    .request<Journal>({
      method: 'POST',
      url: GET_JOURNAL(city),
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        action: 'Api/GetSubjectsAndPeriods',
        operationId: v4(),
        studentId,
      },
    })
    .then((res) => res.data)
}
