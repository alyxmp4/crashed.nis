import { useQuery } from '@tanstack/react-query'
import { http } from '@/shared/http'
import { AdditionalUserInfo } from '@/shared/types'

export type ContingentInfo = {
  firstName: string
  lastName: string
} & AdditionalUserInfo

export const useContingent = () => {
  return useQuery<ContingentInfo>({
    queryKey: ['contingent'],
    queryFn: async () =>
      await http.get<ContingentInfo>('/api/contingent').then((res) => res.data),
    staleTime: 1000 * 60 * 60 * 24,
    refetchInterval: false,
  })
}
