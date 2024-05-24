'use server'

import { cookies } from 'next/headers'

export const logout = async () => {
  cookies().set('Access', '', {
    maxAge: 0,
    expires: new Date(0),
  })

  cookies().set('Refresh', '', {
    maxAge: 0,
    expires: new Date(0),
  })
}
