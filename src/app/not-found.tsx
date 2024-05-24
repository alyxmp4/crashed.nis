'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next-nprogress-bar'
import Link from 'next/link'
import { ArrowLeft, Spinner } from '@phosphor-icons/react'

const NotFound = () => {
  const router = useRouter()

  return (
    <div className="items-left mx-auto flex h-screen max-w-96 flex-col justify-center px-4 text-center">
      <Image
        src="https://http.cat/404"
        alt="404 cat"
        width={750}
        height={600}
        className="mb-4"
        priority={false}
      />

      <Link href="/dash">
        <Button className="my-1 w-full">
          <Spinner className="mr-1" /> На главную
        </Button>
      </Link>
      <Button variant="outline" className="my-1" onClick={() => router.back()}>
        <ArrowLeft className="mr-1" />
        Назад
      </Button>
    </div>
  )
}

export default NotFound
