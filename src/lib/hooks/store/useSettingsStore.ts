import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { useCurrentQuarter } from '@/lib/hooks/useCurrentQuarter'

type Range = {
  from: number
  to: number
}

export type Settings = {
  sort: 'asc' | 'score-up' | 'score-down'
  ranges: {
    good: Range
    average: Range
    bad: Range
  }
  updateRanges: (ranges: Settings['ranges']) => void
  updateSort: (sort: 'score-down' | 'score-up' | 'asc') => void
  currentQuarter: string
  setCurrentQuarter: (quarter: string) => void
}

function validateSettings(ranges: Settings['ranges']): boolean {
  if (ranges.bad.from !== 0) {
    return false
  }

  if (ranges.good.to !== 100) {
    return false
  }

  if (
    ranges.average.from <= ranges.good.to ||
    ranges.bad.from <= ranges.average.to
  ) {
    return false
  }

  return !(
    ranges.bad.from <= ranges.average.from ||
    ranges.average.from <= ranges.good.from
  )
}

const useSettingsStore = create<Settings>()(
  persist(
    devtools((set) => ({
      sort: 'score-down',
      ranges: {
        good: { from: 85, to: 100 },
        average: { from: 65, to: 84 },
        bad: { from: 0, to: 64 },
      },
      currentQuarter: useCurrentQuarter().toString(),
      updateRanges: (ranges) => {
        if (validateSettings(ranges)) {
          set((state) => ({ ...state, ranges }))
        }
      },
      updateSort: (sort: 'score-down' | 'score-up' | 'asc') => {
        set((state) => ({ ...state, sort }))
      },
      setCurrentQuarter: (quarter: string) => {
        set((state) => ({ ...state, currentQuarter: quarter }))
      },
    })),
    {
      name: 'settings',
      version: 1,
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export default useSettingsStore
