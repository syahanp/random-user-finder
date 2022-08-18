import { useQuery } from "@tanstack/react-query"
import { getUsers } from "./query"
import { RequestParam } from "./type"

export const useGetUsers = (param?: RequestParam) => {
  const params: RequestParam = {
    ...param,
    results: 5,
    pageSize: 5,
  }

  return useQuery(['users', params], () => getUsers(params), {
    keepPreviousData: true
  })
}