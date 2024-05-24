import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

const Page = async () => {
  const accessToken = cookies().get('Access')

  if (accessToken?.value) redirect('/dash')
  else redirect('/login')
}

export default Page
