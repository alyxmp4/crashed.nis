import React from 'react'
import AuthForm from '@/widgets/login/AuthForm'
import Logo from '@/components/misc/Logo'

const Page = () => {
  return (
    <div className="items-left mx-auto flex h-screen max-w-96 flex-col justify-center p-4 text-left">
      <Logo />
      <h2 className="w-full scroll-m-20 text-left text-3xl font-semibold leading-none tracking-tight first:mt-0">
        Вход
      </h2>

      <p className="w-full text-left leading-7 text-muted-foreground">
        Используйте свой аккаунт СУШ
      </p>

      <AuthForm />
    </div>
  )
}

export default Page
