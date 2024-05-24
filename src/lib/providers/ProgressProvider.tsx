'use client'

import React, { FC, PropsWithChildren } from 'react'
import { AppProgressBar } from 'next-nprogress-bar'

const ProgressProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <AppProgressBar
        color="hsl(var(--primary))"
        options={{ showSpinner: false }}
      />
      {children}
    </>
  )
}

export default ProgressProvider
