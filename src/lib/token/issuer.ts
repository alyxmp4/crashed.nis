import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import { CityAbbr } from '@/shared/constants/cities'
import { compress } from '@/lib/token/compressor'
import { decode } from '@/lib/token/jwt'

const issue = async (
  accessToken: string,
  refreshToken: string,
  cookies: ReadonlyRequestCookies,
  city: CityAbbr,
) => {
  const { access, refresh, refreshExpiration, accessExpiration } =
    await generate(accessToken, refreshToken, city)

  // The access token format is (encrypted NIS issued JWT token)::(city)

  cookies.set('Access', `${access}`, {
    maxAge: 60 * 60,
    path: '/',
    sameSite: 'lax',
    expires: new Date(accessExpiration * 1000),
    secure: true,
  })

  // The refresh token format is (encrypted NIS issued JWT token)::(device code used to refresh tokens)

  cookies.set('Refresh', `${refresh}`, {
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
    sameSite: 'lax',
    expires: new Date(refreshExpiration * 1000),
    secure: true,
  })
}

export const generate = async (
  accessToken: string,
  refreshToken: string,
  city: CityAbbr,
) => {
  const generatedDeviceInfo = 'SM-G950F'

  const [compressedAccessToken, compressedRefreshToken] = await Promise.all([
    compress(accessToken),
    compress(refreshToken),
  ])

  const [{ exp: accessTokenExpiration }, { exp: refreshTokenExpiration }] =
    await Promise.all([
      await decode<{ exp: number }>(accessToken),
      await decode<{ exp: number }>(refreshToken),
    ])

  return {
    access: `${compressedAccessToken}::${city}`,
    accessExpiration: accessTokenExpiration,
    refresh: `${compressedRefreshToken}::${generatedDeviceInfo}`,
    refreshExpiration: refreshTokenExpiration,
    device: generatedDeviceInfo,
  }
}

export default issue
