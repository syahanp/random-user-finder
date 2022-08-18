import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { serializeParam } from './utils'

const http: AxiosInstance = axios.create({
  baseURL: 'https://randomuser.me/api',
})

const get = (
  endpoint: string,
  queryParam?: Record<string, any>,
  config?: AxiosRequestConfig
) => {
  let url = endpoint

  /**
   * append query param to url when `queryParam` is present
   */
  if (queryParam && Object.keys(queryParam).length > 0) {
    url = url + '?' + serializeParam(queryParam)
  }

  return http.get(url, config)
}

const api = { get }

export default api
