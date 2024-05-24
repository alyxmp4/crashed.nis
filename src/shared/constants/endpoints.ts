import { CityAbbr, CityFullName } from '@/shared/constants/cities'

const MICROS_ENDPOINTS = {
  schedule: (cityFullName: CityFullName) =>
    `https://schedule.micros.nis.edu.kz/${cityFullName}/`,
  jce: (cityAbbr: CityAbbr) => `https://sms.${cityAbbr}.nis.edu.kz/jce/Api`,
  identity: 'https://identity.micros.nis.edu.kz',
  contingent: 'https://contingent.micros.nis.edu.kz',
  reportCard: 'https://reportcard.micros.nis.edu.kz',
}

export const GET_SCHEDULE = (city: CityFullName) =>
  MICROS_ENDPOINTS.schedule(city) + 'v1/Schedule/GetMySchedule'
export const LOGIN = MICROS_ENDPOINTS.identity + '/v1/Users/Authenticate'
export const USER_INFO = MICROS_ENDPOINTS.contingent + '/Api/AdditionalUserInfo'
export const REFRESH_TOKEN =
  MICROS_ENDPOINTS.identity + '/v1/Users/ReissueTokens'
export const REPORT_CARD =
  MICROS_ENDPOINTS.reportCard + '/v1/ReportCard/GetAllReportCardsAsync'
export const GET_JOURNAL = (city: CityAbbr) =>
  MICROS_ENDPOINTS.jce(city) + '/Api/GetSubjectsAndPeriods'
export const GET_DIARY_RUBRIC = (city: CityAbbr) =>
  MICROS_ENDPOINTS.jce(city) + '/Api/GetDataBySectionAndByPeriod'
