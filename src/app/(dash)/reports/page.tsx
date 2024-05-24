'use client'

import React, { useState } from 'react'
import { useReports } from '@/lib/hooks/useReports'
import ReportCardError from '@/widgets/reports/ReportCardError'
import ReportsLoading from '@/widgets/reports/ReportsLoading'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { ReportCard } from '@/shared/types'
import ReportTable from '@/widgets/reports/ReportTable'

const Page = () => {
  const { data, isLoading, isError } = useReports()

  const [selectedSchoolYear, setSelectedSchoolYear] =
    useState<ReportCard[number]>()

  if (isError) return <ReportCardError />
  if (isLoading) return <ReportsLoading />
  if (!data) return null

  if (!selectedSchoolYear) {
    const defaultSchoolYear = data.find((report) => report.schoolYear.isCurrent)
    if (defaultSchoolYear) setSelectedSchoolYear(defaultSchoolYear)
  }
  return (
    <div className="sm:mb-[3.5rem]">
      <Select
        value={selectedSchoolYear?.schoolYear.id}
        onValueChange={(value) =>
          setSelectedSchoolYear(
            data.find((report) => report.schoolYear.id === value),
          )
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Выберите учебный год" />
        </SelectTrigger>
        <SelectContent>
          {data.map((report) => (
            <SelectItem
              value={report.schoolYear.id}
              key={`school-year-${report.schoolYear.id}`}
            >
              {report.schoolYear.name.ru}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <ReportTable reportCard={selectedSchoolYear} />
    </div>
  )
}

export default Page
