import { decode } from '@/lib/token/jwt'
import { ReportCard, Userinfo } from '@/shared/types'
import proxy from '@/shared/http'
import { REPORT_CARD } from '@/shared/constants/endpoints'
import { v4 } from 'uuid'

export const getReports = async (token: string): Promise<ReportCard> => {
  const { UserInfo: stringifiedUserInfo } = await decode<{ UserInfo: string }>(
    token,
  )
  const { PersonGid: studentId } = JSON.parse(stringifiedUserInfo) as Userinfo

  return await proxy
    .request<ReportCard>({
      method: 'POST',
      url: REPORT_CARD,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        action: 'v1/ReportCard/GetAllReportCardsAsync',
        operationId: v4(),
        studentId,
      },
    })
    .then((res) => res.data)
}
