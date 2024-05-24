import { CityAbbr } from '@/shared/constants/cities'
import { decode } from '@/lib/token/jwt'
import { RubricInfo, Userinfo } from '@/shared/types'
import proxy from '@/shared/http'
import { GET_DIARY_RUBRIC } from '@/shared/constants/endpoints'
import { v4 } from 'uuid'

export const getJournalElement = async (
  token: string,
  city: CityAbbr,
  subject: string,
  quarter: number,
) => {
  const { UserInfo: stringifiedUserInfo } = await decode<{ UserInfo: string }>(
    token,
  )
  const { PersonGid: studentId } = JSON.parse(stringifiedUserInfo) as Userinfo

  return await proxy
    .request<RubricInfo>({
      method: 'POST',
      url: GET_DIARY_RUBRIC(city),
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        action: 'Api/GetDataBySectionAndByPeriod',
        operationId: v4(),
        studentId,
        subjectId: subject,
        periodIndex: quarter,
      },
    })
    .then((res) => res.data)
}
