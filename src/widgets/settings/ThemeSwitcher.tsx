'use client'

import React, { useEffect, useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Desktop, Moon, Sun } from '@phosphor-icons/react'
import { useTheme } from 'next-themes'

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
    // at least it works
  }

  return (
    <Tabs defaultValue={theme} onValueChange={setTheme}>
      <TabsList>
        <TabsTrigger value="light">
          <Sun size={20} />
        </TabsTrigger>
        <TabsTrigger value="dark">
          <Moon size={20} />
        </TabsTrigger>
        <TabsTrigger value="system">
          <Desktop size={20} />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

export default ThemeSwitcher
