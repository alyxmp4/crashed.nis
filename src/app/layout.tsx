import { Inter as FontSans } from 'next/font/google'
import React, { PropsWithChildren } from 'react'

import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/lib/providers/ThemeProvider'

import '@/app/globals.scss'
import IconProvider from '@/lib/providers/IconProvider'
import ProgressProvider from '@/lib/providers/ProgressProvider'
import QueryProvider from '@/lib/providers/QueryProvider'

const fontSans = FontSans({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
})

export const metadata = {
  title: 'crashed.nis',
  description: 'crashed.nis',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <div
          vaul-drawer-wrapper=""
          className={cn(
            'min-h-screen bg-background font-sans antialiased',
            fontSans.variable,
          )}
        >
          <ProgressProvider>
            <QueryProvider>
              <ThemeProvider>
                <IconProvider>{children}</IconProvider>
              </ThemeProvider>
            </QueryProvider>
          </ProgressProvider>
        </div>
      </body>
    </html>
  )
}
