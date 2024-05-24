'use server'

import proxy from '@/shared/http'
import { LOGIN } from '@/shared/constants/endpoints'
import { v4 } from 'uuid'
import { LoginHttpResponse } from '@/shared/types'
import { getAdditionalUserInfo } from '@/features/getAdditionalUserInfo'
import { getCityByJceUrl } from '@/lib/utils'
import issue from '@/lib/token/issuer'
import { cookies } from 'next/headers'
import { isAxiosError } from 'axios'

type LoginActionType = {
  errors?: {
    iin?: string
    password?: string
  }
  success: boolean
}

export const login = async (
  iin: string,
  password: string,
): Promise<LoginActionType> => {
  try {
    const { accessToken, refreshToken, applications } = await proxy
      .request<LoginHttpResponse>({
        method: 'post',
        url: LOGIN,
        data: {
          action: 'v1/Users/Authenticate',
          operationId: v4(),
          username: iin,
          password,
          deviceInfo: 'SM-G950F',
        },
      })
      .then((res) => res.data)

    const {
      school: { gid: schoolId },
    } = await getAdditionalUserInfo(accessToken)

    const schoolOrganization = applications.find((application) => {
      return (
        application.organizationGid === schoolId && application.type === 52 // JCE endpoint
      )
    })

    if (!schoolOrganization)
      return {
        errors: {
          iin: 'Вы найдены в базе, но не зачислены ни в один из филиалов НИШ. Вероятно, вы используете аккаунт родителя',
        },
        success: false,
      }

    const city = getCityByJceUrl(schoolOrganization.url)

    await issue(accessToken, refreshToken, cookies(), city)

    return {
      success: true,
    }
  } catch (e) {
    if (isAxiosError(e) && e.response?.status === 400) {
      return { errors: { password: 'Неверный пароль или ИИН' }, success: false }
    } else
      return {
        errors: {
          password: 'Неизвестная ошибка на стороне НИШ. Попробуйте позже',
        },
        success: false,
      }
  }
}
