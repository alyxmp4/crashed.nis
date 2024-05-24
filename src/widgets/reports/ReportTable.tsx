import React, { FC, useMemo } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import ResponsiveModal from '@/components/ui/responsive-modal'
import { Button } from '@/components/ui/button'
import { ReportCard } from '@/shared/types'
import ReportDetails from '@/widgets/reports/ReportDetails'

const ReportTable: FC<{ reportCard?: ReportCard[number] }> = ({
  reportCard,
}) => {
  if (!reportCard) return <></>

  const calculatedGPA = useMemo(() => {
    let sum = 0
    let count = 0

    reportCard.reportCard.forEach((report) => {
      const yearMark = Number(report.yearMark?.ru)
      if (!isNaN(yearMark)) {
        sum += yearMark
        count++
      }
    })

    return count !== 0 ? sum / count : 0
  }, [reportCard])

  return (
    <div>
      <Table className="mt-5 overflow-x-auto border-[1px] sm:border-0">
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[150px]">Предмет</TableHead>
            <TableHead className="min-w-[75px]">I</TableHead>
            <TableHead className="min-w-[75px]">II </TableHead>
            <TableHead className="min-w-[75px]">III</TableHead>
            <TableHead className="min-w-[75px]">IV</TableHead>
            <TableHead className="min-w-[75px]">Год</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reportCard?.reportCard.map((report) => (
            <ResponsiveModal
              trigger={
                <TableRow key={`report-${report.subject.id}`}>
                  <TableCell>
                    <span className="hover:underline">
                      {report.subject.name.ru}
                    </span>
                  </TableCell>
                  <TableCell>
                    <FormattedMark mark={report.firstPeriod?.ru} />
                  </TableCell>
                  <TableCell>
                    <FormattedMark mark={report.secondPeriod?.ru} />
                  </TableCell>
                  <TableCell>
                    <FormattedMark mark={report.thirdPeriod?.ru} />
                  </TableCell>
                  <TableCell>
                    <FormattedMark mark={report.fourthPeriod?.ru} />
                  </TableCell>
                  <TableCell>
                    <FormattedMark mark={report.yearMark?.ru} />
                  </TableCell>
                </TableRow>
              }
              title={
                <span className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
                  {report.subject.name.ru}
                </span>
              }
              description={<span>{reportCard?.schoolYear.name.ru}</span>}
              close={<Button variant="outline">Закрыть</Button>}
              key={`report-modal-${report.subject.id}`}
            >
              <ReportDetails report={report} />
            </ResponsiveModal>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Итог. GPA</TableCell>
            <TableCell>
              <span className="text-[18px] font-bold">
                {calculatedGPA ? calculatedGPA.toFixed(2) : 'Н/Д'}
              </span>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}

export const FormattedMark = ({ mark }: { mark?: string }) => {
  if (!mark) return <span className="text-muted-foreground">-</span>

  const formattedMark = Number(mark)

  if (isNaN(formattedMark)) return <span>{mark.toUpperCase()}</span>

  let textColor = 'text-red-500'
  if (formattedMark === 4) textColor = 'text-yellow-500'
  else if (formattedMark === 5) textColor = 'text-green-500'

  return (
    <span className={`text-[16px] font-extrabold ${textColor}`}>
      {formattedMark}
    </span>
  )
}

export default React.memo(ReportTable)
