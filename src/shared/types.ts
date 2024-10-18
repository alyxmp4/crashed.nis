export type LoginHttpResponse = {
  accessToken: string
  refreshToken: string
  applications: {
    gid: string
    organizationGid: string
    name: string
    serviceUrl: string
    url: string
    type: number
  }[]
}

export type Userinfo = {
  UserType: number
  PersonGid: string
  WorkingTel: string | null
  MobileTel: string | null
  HomeTel: string | null
  HomeAddress: string | null
  Email: string
  Birthday: string
  Gender: number
  ShortName: string
  FullName: string
  ThirdName: string
  SecondName: string
  FirstName: string
  Iin: string
  DateSynchronic: string
  PhotoUrl: string | null
  Klass: string | null
  School: string | null
  Logins: string[]
  Accesses: {
    ApplicationId: string
    RoleIds: string[]
    ApplicationType: number
    Disabled: boolean
  }[]
}

export type AdditionalUserInfo = {
  success: boolean
  data: {
    PhotoUrl: string
    Klass: string
    School: {
      Gid: string
      Name: {
        kk: string
        ru: string
        en: string
      }
    }
    Children: never
  }
}

export type Schedule = {
  scheduleDays: {
    lessons: {
      number: number
      subjectName: {
        kk: string
        ru: string
        en: string
      }
      teacher: string
      classroom: string | never
      isReplacement: boolean
    }[]
    date: string
    scheduleNotWorkingDay: {
      isNotWorkingDay: boolean
      isWeekend: boolean
      isHoliday: boolean
      calendarEventName: {
        kk: string
        ru: string
        en: string
      }
    }
  }[]
}

export type Journal = [
  {
    number: 1
    subjects: {
      id: string
      name: {
        kk: string
        ru: string
        en: string
      }
      currScore: number
      mark?: number
    }[]
  },
  {
    number: 2
    subjects: {
      id: string
      name: {
        kk: string
        ru: string
        en: string
      }
      currScore: number
      mark?: number
    }[]
  },
  {
    number: 3
    subjects: {
      id: string
      name: {
        kk: string
        ru: string
        en: string
      }
      currScore: number
      mark?: number
    }[]
  },
  {
    number: 4
    subjects: {
      id: string
      name: {
        kk: string
        ru: string
        en: string
      }
      currScore: number
      mark?: number
    }[]
  },
]

export type Rubric = {
  id: string
  title: {
    kk: string
    ru: string
    en: string
  }
  mark: string
  maxMark: string
  description: {
    kk: string
    ru: string
    en: string
  }
  details: {
    name: string
    bad: string
    normal: string
    good: string
    badChecked: boolean
    normalChecked: boolean
    goodChecked: boolean
  }[]
}

export type RubricInfo = {
  sumChapterCriteria: Rubric[]
  sumQuarterCriteria: Rubric[]
}

export type ReportCard = {
  schoolYear: {
    isCurrent: boolean
    id: string
    name: {
      kk: string
      ru: string
      en: string
    }
  }
  reportCard: {
    person: {
      id: string
    }
    subject: {
      id: string
      name: {
        kk: string
        ru: string
        en: string
      }
    }
    firstPeriod?: {
      kk: string
      ru: string
      en: string
    } | null
    secondPeriod?: {
      kk: string
      ru: string
      en: string
    } | null
    thirdPeriod?: {
      kk: string
      ru: string
      en: string
    } | null
    fourthPeriod?: {
      kk: string
      ru: string
      en: string
    } | null
    firstHalfYearMark?: {
      kk: string
      ru: string
      en: string
    } | null
    secondHalfYearMark?: {
      kk: string
      ru: string
      en: string
    } | null
    yearMark?: {
      kk: string
      ru: string
      en: string
    } | null
    examMark?: {
      kk: string
      ru: string
      en: string
    } | null
    resultMark?: {
      kk: string
      ru: string
      en: string
    } | null
  }[]
}[]

export type Reports = ReportCard[]
