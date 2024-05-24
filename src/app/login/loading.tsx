import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const Page = () => {
  return (
    <div className="items-left mx-auto flex h-screen max-w-96 flex-col justify-center p-4 text-left">
      <Skeleton className="mb-3 mt-2 h-12 w-12 rounded-full" />
      <Skeleton className="h-5 w-20" />

      <Skeleton className="mt-1 h-4 w-64" />

      <Skeleton className="mb-1 mt-1 h-10 w-full" />
      <Skeleton className="mb-1 h-10 w-full" />
      <Skeleton className="mb-1 mt-2 h-10 w-full" />
    </div>
  )
}

export default Page
