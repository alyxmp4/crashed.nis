import { CityAbbr } from '@/shared/constants/cities'
import { decompress } from '@/lib/token/compressor'
import { decode } from '@/lib/token/jwt'

export type Session = {
  accessToken: string
  refreshToken?: string
  city: CityAbbr
}

export const resolveSession = async (
  token?: string,
): Promise<Session | null> => {
  if (!token || token.split('::').length !== 2) {
    return null
  }

  const [compressed, city] = token.split('::')

  try {
    const decompressed = await decompress(compressed!)

    const payload = await decode<{ exp: number }>(decompressed)

    if (Date.now() >= payload.exp * 1000) {
      return null
    }

    return {
      accessToken: decompressed,
      city: city as CityAbbr,
    }
  } catch (e) {
    return null
  }
}
