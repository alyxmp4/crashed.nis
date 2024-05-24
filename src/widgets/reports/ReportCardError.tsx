import React from 'react'
import { ImageBroken } from '@phosphor-icons/react'

const ReportCardError = () => {
  return (
    <div className="mx-auto h-[45rem] sm:h-[43.5rem]">
      <div className="relative top-1/2 -translate-y-1/2 transform flex-col items-center justify-center text-center">
        <ImageBroken size={72} className="mx-auto text-red-600" />
        <h2 className="scroll-m-20 text-2xl font-semibold sm:text-3xl">
          Ошибка загрузки табеля
        </h2>
        <p className="mx-auto mt-1 w-[80%] text-[14px] leading-5 sm:text-[17px]">
          Микросервисы НИШ вернули некорректный ответ. Пожалуйста, попробуйте
          позже
        </p>
      </div>
    </div>
  )
}

export default ReportCardError
