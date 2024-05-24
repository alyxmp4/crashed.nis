import React, { FC } from 'react'
import ResponsiveModal from '@/components/ui/responsive-modal'
import { Button } from '@/components/ui/button'
import JournalCard from './JournalCard'
import JournalRubric from '@/widgets/journal/JournalRubric'

type JournalElementProps = {
  subject: string
  subjectId: string
  currentScore: number
  mark?: number
  quarter: string
}

const JournalElement: FC<JournalElementProps> = ({
  subject,
  mark,
  subjectId,
  quarter,
  currentScore,
}) => {
  return (
    <ResponsiveModal
      trigger={
        <div>
          <JournalCard
            subject={subject}
            mark={mark}
            currentScore={currentScore}
          />
        </div>
      }
      close={<Button variant="outline">Закрыть</Button>}
      title={
        <span className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
          {subject}
        </span>
      }
      description={<span>Подробная информация за {quarter} четверть</span>}
    >
      <JournalRubric subject={subjectId} quarter={Number(quarter)} />
    </ResponsiveModal>
  )
}

export default JournalElement
