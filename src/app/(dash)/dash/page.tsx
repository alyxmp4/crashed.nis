'use client'

import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useJournal } from '@/lib/hooks/useJournal'
import JournalNotFound from '@/widgets/journal/JournalNotFound'
import useSettingsStore from '@/lib/hooks/store/useSettingsStore'
import { Skeleton } from '@/components/ui/skeleton'
import JournalList from '@/widgets/journal/Journal'

const NUMERALS = {
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
}

const Page = () => {
  const [current, setCurrent] = useSettingsStore((state) => [
    state.currentQuarter,
    state.setCurrentQuarter,
  ])
  const { data: journal, isError, isLoading } = useJournal()

  if (isLoading)
    return (
      <div className="w-full">
        <Skeleton className="mb-2 h-10 w-full" />
        <Skeleton className="mb-1 h-28 w-full" />
        <Skeleton className="mb-1 h-28 w-full" />
        <Skeleton className="mb-1 h-28 w-full" />
        <Skeleton className="mb-1 h-28 w-full" />
      </div>
    )

  if (isError) {
    return <JournalNotFound />
  }

  return (
    <>
      {journal && journal?.length > 0 && !isError && (
        <Tabs
          value={current}
          className="w-full"
          onValueChange={(value) => setCurrent(value)}
        >
          <TabsList className="mb-2 flex w-full select-none flex-row">
            {journal!.map((journal, index) => (
              <TabsTrigger
                value={journal.number.toString()}
                className="grow"
                key={`tab-trigger-${index}`}
              >
                {NUMERALS[journal.number]}
              </TabsTrigger>
            ))}
          </TabsList>
          {journal!.map((journal, index) => (
            <TabsContent
              key={`tab-content-${index}`}
              value={journal.number.toString()}
            >
              <JournalList journal={journal} />
            </TabsContent>
          ))}
        </Tabs>
      )}
    </>
  )
}

export default Page
