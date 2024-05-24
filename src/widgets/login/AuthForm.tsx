'use client'

import React from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Spinner } from '@phosphor-icons/react'
import { login } from '@/server/actions/login'
import { useRouter } from 'next-nprogress-bar'

const schema = z.object({
  iin: z
    .string({
      invalid_type_error: 'ИИН должен быть строкой',
      required_error: 'ИИН обязателен',
    })
    .length(12, { message: 'ИИН должен быть из 12 символов' })
    .refine(
      (iin) => {
        if (isNaN(parseInt(iin))) return false

        const year = parseInt(iin.slice(0, 2))
        const month = parseInt(iin.slice(2, 4))
        const day = parseInt(iin.slice(4, 6))

        if (month > 12 || month < 1) {
          return false
        }

        if (day < 1 || day > 31) {
          return false
        }

        if (month === 2) {
          const isLeapYear =
            (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
          if (isLeapYear && day > 29) {
            return false
          } else if (!isLeapYear && day > 28) {
            return false
          }
        }

        const monthsWith30Days = [4, 6, 9, 11]
        return !(monthsWith30Days.includes(month) && day > 30)
      },
      {
        message: 'Некорректный ИИН',
      },
    ),
  password: z
    .string({
      invalid_type_error: 'Пароль должен быть строкой',
      required_error: 'Пароль обязателен',
    })
    .min(6, 'Пароль должен быть не менее 6 символов'),
})

type AuthFormType = z.infer<typeof schema>

const AuthForm = () => {
  const form = useForm<AuthFormType>({
    resolver: zodResolver(schema),
  })

  const router = useRouter()

  const onSubmit: SubmitHandler<AuthFormType> = async ({ iin, password }) => {
    await login(iin, password).then((res) => {
      if (res.success) router.push('/')
      else {
        if (res.errors?.iin) form.setError('iin', { message: res.errors?.iin })
        if (res.errors?.password)
          form.setError('password', { message: res.errors?.password })
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <FormField
          control={form.control}
          name="iin"
          render={({ field }) => (
            <FormItem className="mb-1 mt-1">
              <FormControl>
                <Input placeholder="ИИН" autoComplete="username" {...field} />
              </FormControl>
              <FormMessage className="pb-1 leading-none text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-1 mt-1">
              <FormControl>
                <Input
                  placeholder="Пароль"
                  autoComplete="current-password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage className="pb-1 leading-none text-red-600" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="mt-2 w-full"
          disabled={form.formState.isSubmitting}
        >
          Продолжить
          {form.formState.isSubmitting ? (
            <Spinner className="ml-1 animate-spin-slow" />
          ) : (
            <ArrowRight className="ml-1" />
          )}
        </Button>
      </form>
    </Form>
  )
}

export default AuthForm
