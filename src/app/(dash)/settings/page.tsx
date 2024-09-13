'use client'

import React from 'react'
import ThemeSwitcher from '@/widgets/settings/ThemeSwitcher'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useSettingsStore from '@/lib/hooks/store/useSettingsStore'
import { Button } from '@/components/ui/button'
import ResponsiveModal from '@/components/ui/responsive-modal'
import { SignOut } from '@phosphor-icons/react'
import { logout } from '@/server/actions/logout'
import { useRouter } from 'next-nprogress-bar'
import { useQueryClient } from '@tanstack/react-query'

const Page = () => {
  const { sort, updateSort } = useSettingsStore()
  const router = useRouter()
  const queryClient = useQueryClient()

  return (
    <div className="mt-3">
      <div className="flex flex-row items-center justify-between py-1.5">
        <p className="text-xl lg:text-2xl">Тема оформления</p>
        <ThemeSwitcher />
      </div>
      <div className="flex flex-row items-center justify-between py-1.5">
        <p className="text-xl lg:text-2xl">Сортировка</p>
        <Select value={sort} onValueChange={updateSort}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent position="item-aligned">
            <SelectItem value="asc">По алфавиту</SelectItem>
            <SelectItem value="score-up">По возрастанию</SelectItem>
            <SelectItem value="score-down">По убыванию</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-row items-center justify-between py-1.5">
        <p className="text-xl lg:text-2xl">Выход</p>
        <ResponsiveModal
          trigger={
            <Button>
              <SignOut size={18} className="mr-1.5" /> Выйти
            </Button>
          }
          title={
            <span className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
              Подтвердите действие
            </span>
          }
          close={<Button variant="outline">Отмена</Button>}
        >
          Выход из аккаунта сотрёт все локальные данные о вас, вам придётся
          заново входить в свой аккаунт. Вы уверены?
          <Button
            className="mt-3 w-full"
            onClick={() => {
              queryClient.removeQueries()
              logout().then(() => router.push('/login'))
            }}
          >
            Подтвердить выход
          </Button>
        </ResponsiveModal>
      </div>

      <p className="-mb-12 mt-4 text-muted-foreground sm:-mb-0">
        Приложение не имеет никакого отношения к АОО НИШ. Некоторые данные
        хранятся локально на вашем устройстве. Они никуда не передаются, не
        обрабатываются.
      </p>
    </div>
  )
}

export default Page
