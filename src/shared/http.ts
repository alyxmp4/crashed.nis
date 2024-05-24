import axios from 'axios'
import { LoginHttpResponse } from '@/shared/types'
import https from 'https'

const agent = new https.Agent({
  rejectUnauthorized: false,
})

const proxy = axios.create({
  httpsAgent: agent,
})

proxy.interceptors.request.use((config) => {
  config.headers['user-agent'] = 'Dart/3.1 (dart:io)'
  config.headers.cookie = 'Culture=ru-RU;'
  return config
})

export const http = axios.create({
  withCredentials: true,
  httpsAgent: agent,
})

let isRefreshing = false
let refreshQueue: (() => void)[] = []

http.interceptors.response.use(
  (res) => {
    return res
  },
  async (err) => {
    const originalConfig = err.config

    if (err.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true

      if (!isRefreshing) {
        isRefreshing = true

        try {
          await axios.request<LoginHttpResponse>({
            url: '/api/auth/refresh',
            method: 'post',
            withCredentials: true,
          })

          refreshQueue.forEach((cb) => cb())
          refreshQueue = []
          isRefreshing = false

          return http(originalConfig)
        } catch (error) {
          throw new Error('UNAUTHORIZED')
        }
      } else {
        return new Promise((resolve) => {
          refreshQueue.push(() => {
            resolve(http(originalConfig))
          })
        })
      }
    }

    return Promise.reject(err)
  },
)

export default proxy
