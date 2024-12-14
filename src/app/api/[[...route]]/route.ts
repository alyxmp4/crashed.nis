import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { compress } from 'hono/compress'
import { cors } from 'hono/cors'
import { createMiddleware } from 'hono/factory'
import { resolveSession, Session } from '@/lib/token/resolver'
import { getCookie } from 'hono/cookie'
import { timeout } from 'hono/timeout'
import { HTTPException } from 'hono/http-exception'
import auth from '@/server/routers/auth'
import bridge from '@/server/routers/bridge'
import { env } from '@/env'

export const runtime = env.RUNTIME
export const maxDuration = 20

const app = new Hono().basePath('/api')

app.use(compress(), cors(), timeout(20000))

type RequestWithSession = {
  Variables: {
    session: Session
  }
}

export const authMiddleware = createMiddleware<RequestWithSession>(
  async (c, next) => {
    const header = c.req.header('Authorization')
    let accessToken: string | undefined = undefined

    if (header) {
      const [type, token] = header.split(' ')

      if (type === 'Bearer' && token) {
        accessToken = token
      }
    } else {
      const cookie = getCookie(c, 'Access')

      if (cookie) {
        accessToken = cookie
      }
    }

    const session = await resolveSession(accessToken)

    if (!session) {
      throw new HTTPException(401, {
        res: Response.json(
          {
            message: 'Unauthorized',
            cause: 'Access token is either invalid or expired',
          },
          {
            status: 401,
          },
        ),
      })
    }

    c.set('session', session)

    await next()
  },
)

app.route('/auth', auth)
app.route('/', bridge)

export const GET = handle(app)
export const POST = handle(app)
