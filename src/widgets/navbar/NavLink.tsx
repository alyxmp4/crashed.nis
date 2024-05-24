'use client'

import React, { FC } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

type NavLinkProps = {
  icon: React.ReactNode
  text: string
  href: string
}

const NavLink: FC<NavLinkProps> = ({ icon, text, href }) => {
  const pathname = usePathname()

  return (
    <Link
      href={pathname.startsWith(href) ? '#' : href}
      className={`mx-2 flex w-fit grow flex-col justify-center text-center transition-colors hover:text-primary ${pathname.startsWith(href) ? 'text-primary hover:text-muted-foreground' : ''}`}
    >
      {icon}
      <span className={`leading-2 hidden text-[13px] text-current sm:block`}>
        {text}
      </span>
    </Link>
  )
}

export default NavLink
