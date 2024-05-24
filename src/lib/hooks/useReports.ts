import { useQuery } from '@tanstack/react-query'
import { http } from '@/shared/http'
import { ReportCard } from '@/shared/types'

export const useReports = () => {
  return useQuery<ReportCard>({
    queryKey: ['reports'],
    queryFn: async () =>
      await http.get<ReportCard>('/api/reports').then((res) => res.data),
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 5,
  })
}
