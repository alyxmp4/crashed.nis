'use client'

import React, { FC, PropsWithChildren } from 'react'
import { IconContext } from '@phosphor-icons/react'

const IconProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <IconContext.Provider
      value={{
        size: 18,
        weight: 'regular',
      }}
    >
      {children}
    </IconContext.Provider>
  )
}

export default IconProvider
