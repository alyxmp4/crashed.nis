import { useQuery } from '@tanstack/react-query'
import { http } from '@/shared/http'
import { Journal } from '@/shared/types'

export const useJournal = () => {
  return useQuery<Journal>({
    queryKey: ['journal'],
    queryFn: async () =>
      await http.get<Journal>('/api/journal').then((res) => res.data),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
  })
}
