export interface RequestParam {
  results?: number
  page?: number
  pageSize?: number
  keyword?: string
  sortBy?: string
  sortOrder?: 'ascend' | 'descend' | ''
  gender?: 'male' | 'female' | ''
}

export interface ResponseStruct<T = any> {
  results: any[]
  info: any
}

/**
 * Wrap response structure with axios response type
 */
export type APIResponse<T = any> = Promise<AxiosResponse<ResponseStruct<T>>>