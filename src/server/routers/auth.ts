import { Hono } from 'hono'
import { getCookie } from 'hono/cookie'
import { HTTPException } from 'hono/http-exception'
import { decompress } from '@/lib/token/compressor'
import { refreshToken } from '@/features/refreshToken'
import { generate } from '@/lib/token/issuer'

const app = new Hono()

app.post('/refresh', async (c) => {
  const cookie = getCookie(c, 'Refresh')

  if (!cookie || cookie.split('::').length !== 2) {
    throw new HTTPException(400, {
      res: Response.json(
        {
          message: 'Bad request',
          cause: 'Refresh token is either invalid or expired',
        },
        {
          status: 400,
        },
      ),
    })
  }

  const [compressedRefreshToken, device] = cookie.split('::')

  try {
    const requestRefreshToken = await decompress(compressedRefreshToken!)

    const {
      accessToken,
      refreshToken: responseRefreshToken,
      city,
    } = await refreshToken(requestRefreshToken, device!)

    const { access, accessExpiration, refreshExpiration, refresh } =
      await generate(accessToken, responseRefreshToken, city)

    const headers = new Headers()

    headers.append(
      'Set-Cookie',
      `Access=${access}; Path=/; SameSite=Lax; Expires=${new Date(accessExpiration * 1000).toUTCString()}; HttpOnly; Secure`,
    )
    headers.append(
      'Set-Cookie',
      `Refresh=${refresh}; Path=/; SameSite=Lax; Expires=${new Date(refreshExpiration * 1000).toUTCString()}; HttpOnly; Secure`,
    )

    return c.json(
      {
        accessToken: `${access}`,
        refreshToken: `${refresh}`,
        expires: new Date(accessExpiration * 1000).getTime(),
      },
      {
        headers,
        status: 201,
      },
    )
  } catch (e) {
    throw new HTTPException(500, {
      res: Response.json(
        {
          message: 'Internal server error',
        },
        {
          status: 500,
        },
      ),
    })
  }
})

export default app
