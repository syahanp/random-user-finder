import api from "./api"
import { APIResponse, RequestParam } from "./type"

export const getUsers = (param: RequestParam): APIResponse => {
  return api.get('/', param)
}