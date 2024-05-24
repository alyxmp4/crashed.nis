import { Hono } from 'hono'
import { authMiddleware } from '@/app/api/[[...route]]/route'
import { decode } from '@/lib/token/jwt'
import { Userinfo } from '@/shared/types'
import { getAdditionalUserInfo } from '@/features/getAdditionalUserInfo'
import { Session } from '@/lib/token/resolver'
import { getJournal } from '@/features/getJournal'
import { HTTPException } from 'hono/http-exception'
import { z } from 'zod'
import { getJournalElement } from '@/features/getJournalElement'
import { isAxiosError } from 'axios'
import { getReports } from '@/features/getReports'

const app = new Hono<{
  Variables: {
    session: Session
  }
}>()

app.use(async (c, next) => authMiddleware(c, next))

app.get('/contingent', async (c) => {
  const rawUserInfo = await decode<{ UserInfo: string }>(
    c.get('session').accessToken,
  )

  const { FirstName, SecondName } = JSON.parse(rawUserInfo.UserInfo) as Userinfo

  const data = await getAdditionalUserInfo(c.get('session').accessToken)

  return c.json({
    ...data,
    firstName: FirstName,
    lastName: SecondName,
  })
})

app.get('/journal', async (c) => {
  const session = c.get('session')
  const journal = await getJournal(session.accessToken, session.city)

  return c.json(journal)
})

app.get('/journal/:subject', async (c) => {
  const session = c.get('session')
  const subjectId = c.req.param('subject')
  const quarter = z.coerce
    .number()
    .min(1)
    .max(4)
    .safeParse(c.req.query('quarter'))

  if (!quarter.success) {
    throw new HTTPException(400, {
      res: Response.json({
        message: 'Bad request',
        cause: 'Quarter index (quarter search param) is required',
      }),
    })
  }

  try {
    const data = await getJournalElement(
      session.accessToken,
      session.city,
      subjectId,
      quarter.data,
    )

    return c.json(data)
  } catch (e) {
    if (
      isAxiosError(e) &&
      e.response?.data.message.startsWith('предмет не найден')
    ) {
      throw new HTTPException(404, {
        res: Response.json({
          message: 'Not found',
          cause: 'Subject with id ' + subjectId + ' not found',
        }),
      })
    } else
      throw new HTTPException(503, {
        res: Response.json(
          {
            message: 'Service unavailable',
            cause: 'AEO NIS microservices are currently unavailable / down',
          },
          {
            status: 503,
          },
        ),
      })
  }
})

app.get('/reports', async (c) => {
  const { accessToken } = c.get('session')

  try {
    const reports = await getReports(accessToken)
    return c.json(reports)
  } catch (e) {
    console.log(e)

    throw new HTTPException(503, {
      res: Response.json(
        {
          message: 'Service unavailable',
          cause: 'AEO NIS microservices are currently unavailable / down',
        },
        {
          status: 503,
        },
      ),
    })
  }
})

export default app
