import React, { FC } from 'react'
import { useRubric } from '@/lib/hooks/useRubric'
import { Rubric } from '@/shared/types'
import { Progress } from '@/components/ui/progress'
import { LinkBreak, Spinner } from '@phosphor-icons/react'

type JournalRubricProps = {
  subject: string
  quarter: number
}

const getColor = (mark: number): string => {
  if (mark < 65) return '#ff3a27'
  if (mark < 85) return '#fca40c'
  return '#1bd90d'
}

const calculateRubricScore = (rubrics: Rubric[]) => {
  const totalMark = rubrics.reduce((acc, rubric) => acc + ~~rubric.mark, 0)
  const totalMaxMark = rubrics.reduce(
    (acc, rubric) => acc + ~~rubric.maxMark,
    0,
  )

  if (totalMaxMark === 0) {
    return { score: 0, totalMark, totalMaxMark }
  }

  const score = parseFloat(((totalMark / totalMaxMark) * 0.5 * 100).toFixed(2))
  return { score, totalMark, totalMaxMark }
}

const JournalRubric: FC<JournalRubricProps> = ({ subject, quarter }) => {
  const { data, isLoading, isError } = useRubric(subject, quarter)

  if (isLoading)
    return (
      <div className="h-48 w-full">
        <div className="relative top-1/2 mx-auto h-fit w-fit -translate-y-1/2 transform">
          <Spinner
            size={28}
            className="animate-spin-slow text-muted-foreground"
          />
        </div>
      </div>
    )

  if (isError) {
    return (
      <div className="h-64 w-full">
        <div className="items center relative top-1/2 mx-auto h-fit w-fit -translate-y-1/2 transform text-center">
          <LinkBreak size={72} className="mx-auto text-red-600" />
          <h2 className="scroll-m-20 text-2xl font-semibold sm:text-3xl">
            Неизвестная ошибка
          </h2>
          <p className="mt-1 text-[14px] leading-5 text-muted-foreground sm:text-[17px]">
            Не удалось получить подробные данные о предмете. Вероятно, СУШ
            вашего филиала НИШ сейчас не работает.
          </p>
        </div>
      </div>
    )
  }

  if (!data) return null

  const { sumChapterCriteria = [], sumQuarterCriteria = [] } = data

  const { totalMark, totalMaxMark, score } =
    calculateRubricScore(sumChapterCriteria)
  const {
    totalMark: quarterTotalMark,
    totalMaxMark: quarterTotalMaxMark,
    score: quarterScore,
  } = calculateRubricScore(sumQuarterCriteria)

  return (
    <div>
      <p className="mb-1 text-muted-foreground">
        {Number.parseFloat((score + quarterScore).toFixed(2))}%
      </p>
      <Progress
        value={score + quarterScore}
        className="mb-4 h-1"
        color={getColor(score + quarterScore)}
      />

      <div className="mb-3">
        <div className="mb-2 flex flex-row justify-between text-muted-foreground">
          <p>СОР</p>
          <p>
            <span className="mx-2">
              {totalMark}/{totalMaxMark}
            </span>
            {'—'}
            <span className="ml-2">{score}%</span>
          </p>
        </div>
        <div className="flex flex-col">
          {sumChapterCriteria.map((rubric, index) => (
            <div
              className="mb-1 flex flex-row justify-between"
              key={`rubric-chapter-${rubric.id}-${index}`}
            >
              <p className="w-[80%]">{rubric.title.ru}</p>
              <p>
                {rubric.mark}/{rubric.maxMark}
              </p>
            </div>
          ))}
        </div>
      </div>
      {sumQuarterCriteria.length > 0 && (
        <div>
          <div className="mb-2 flex flex-row justify-between text-muted-foreground">
            <p>СОЧ</p>
            <p>
              <span className="mx-2">
                {quarterTotalMark}/{quarterTotalMaxMark}
              </span>
              {'—'}
              <span className="ml-2">{quarterScore}%</span>
            </p>
          </div>
          <div className="flex flex-col">
            {sumQuarterCriteria.map((rubric, index) => (
              <div
                className="mb-1 flex flex-row justify-between"
                key={`rubric-quarter-${rubric.id}-${index}`}
              >
                <p className="w-[80%]">{rubric.title.ru}</p>
                <p>
                  {rubric.mark}/{rubric.maxMark}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default JournalRubric
