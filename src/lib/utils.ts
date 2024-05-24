import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { type CityAbbr, type CityFullName } from '@/shared/constants/cities'
import { del, get, set } from 'idb-keyval'
import {
  PersistedClient,
  Persister,
} from '@tanstack/react-query-persist-client'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getCityByJceUrl = (url: string): CityAbbr => {
  // Not a schedule URL means JCE API service
  // JCE API url always starts with https://sms.(city).nis.edu.kz/...
  // this method will return the city (NIS filial) abbreviation (like ura, atr, pvl, etc.)

  return url.split('.')[1]!
}

export const getCityByScheduleUrl = (url: string): CityFullName => {
  // Schedule URL always starts with https://schedule.micros.nis.edu.kz/(city)/...
  // this method will return the city (NIS filial) full name (like Uralsk, Astana_FMSH, Pavlodar, etc.)

  return url.split('/')[3]!
}

export function IDBQueryPersistor(idbValidKey: IDBValidKey = 'query:root') {
  return {
    persistClient: async (client: PersistedClient) => {
      await set(idbValidKey, client)
    },
    restoreClient: async () => {
      return await get<PersistedClient>(idbValidKey)
    },
    removeClient: async () => {
      await del(idbValidKey)
    },
  } as Persister
}
