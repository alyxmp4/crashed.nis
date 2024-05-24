'use client'

import React, { FC, PropsWithChildren, useState } from 'react'
import { QueryClient } from '@tanstack/react-query'
import { IDBQueryPersistor } from '@/lib/utils'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { useRouter } from 'next-nprogress-bar'

const QueryProvider: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter()

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
            refetchInterval: 300000, // 5 mins
            throwOnError: (error) => {
              if (error.message === 'UNAUTHORIZED') {
                queryClient.removeQueries()
                router.push('/login')
              }

              return false
            },
          },
        },
      }),
  )

  const persister = IDBQueryPersistor()

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      {children}
    </PersistQueryClientProvider>
  )
}

export default QueryProvider
