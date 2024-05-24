import React from 'react'
import {
  DeviceTabletSpeaker,
  GearFine,
  House,
} from '@phosphor-icons/react/dist/ssr'
import NavLink from '@/widgets/navbar/NavLink'

const NavBar = () => {
  return (
    <nav className="fixed bottom-14 left-1/2 flex h-16 w-[45%] min-w-48 max-w-96 -translate-x-1/2 transform select-none flex-row justify-center rounded-full border-[2px] border-border p-2 backdrop-blur backdrop-brightness-125 sm:h-20 sm:w-80 sm:p-4 dark:backdrop-brightness-50">
      <NavLink
        href={'/dash'}
        icon={<House className="mx-auto text-[24px] sm:text-[32px]" />}
        text="Главная"
      />
      <NavLink
        href={'/reports'}
        icon={
          <DeviceTabletSpeaker className="mx-auto text-[24px] sm:text-[32px]" />
        }
        text="Табель"
      />
      <NavLink
        href={'/settings'}
        icon={<GearFine className="mx-auto text-[24px] sm:text-[32px]" />}
        text="Настройки"
      />
    </nav>
  )
}

export default NavBar
