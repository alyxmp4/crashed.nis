export type Quarter = 1 | 2 | 3 | 4

export const useCurrentQuarter = () => {
  const month = new Date().getMonth() + 1
  const day = new Date().getDate()

  if ((month === 9 && day >= 1) || month === 10 || (month === 11 && day <= 5)) {
    return 1
  } else if (
    (month === 11 && day >= 6) ||
    month === 12 ||
    (month === 1 && day <= 31)
  ) {
    return 2
  } else if (
    (month === 1 && day >= 8) ||
    month === 2 ||
    (month === 3 && day <= 20)
  ) {
    return 3
  } else if (
    (month === 3 && day >= 21) ||
    month === 4 ||
    (month === 5 && day <= 25)
  ) {
    return 4
  } else {
    return 1
  }
}
