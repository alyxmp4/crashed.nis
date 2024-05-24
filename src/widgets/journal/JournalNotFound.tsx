import React, { FC } from 'react'
import { LinkBreak } from '@phosphor-icons/react'

type JournalFallbackProps = {
  description?: React.ReactNode
}

const JournalNotFound: FC<JournalFallbackProps> = ({ description }) => {
  return (
    <div className="h-[42rem] w-full sm:h-[40.5rem]">
      <div className="relative top-1/2 -translate-y-1/2 transform flex-col items-center justify-center text-center">
        <LinkBreak size={72} className="mx-auto text-red-600" />
        <h2 className="scroll-m-20 text-2xl font-semibold sm:text-3xl">
          Журнал не найден
        </h2>
        <p className="mt-1 text-[14px] leading-5 sm:text-[17px]">
          {description ?? 'Попробуйте позже'}
        </p>
      </div>
    </div>
  )
}

export default JournalNotFound
