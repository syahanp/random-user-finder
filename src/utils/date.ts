import { format, isValid } from 'date-fns'

type Tdate = Date | number
type TformatString = string

const defaultDateFormat = 'dd-MM-yyyy kk:m'

export const formatDate = (
  date: Tdate,
  formatString: TformatString = defaultDateFormat,
  options?: {}
) => {
  const dateInput = new Date(date)

  if (isValid(dateInput)) {
    return format(dateInput, formatString, {
      ...options,
    })
  }

  return String(date)
}