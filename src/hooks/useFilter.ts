import { SortOrder } from "components/Table/type";
import { useCallback, useState } from "react";

export interface FilterState {
  term: string
  gender: "male" | "female" | ""
  sortOrder: SortOrder
  sortBy: string
  page: number
}

/**
 * hooks to handle filter state,
 * use for updating and resetting filter state
 */
const useFilter = () => {
  const [filter, setFilter] = useState<FilterState>({
    term: "",
    gender: "",
    sortOrder: "",
    sortBy: "",
    page: 1,
  })

  const updateFilter = useCallback((setter: keyof typeof filter, value: any) => {
    setFilter(prevState => ({
      ...prevState,
      [setter]: value,
    }))
  }, []);

  const resetFilter = () => {
    setFilter({
      term: "",
      gender: "",
      sortOrder: "",
      sortBy: "",
      page: 1
    })
  }

  return { filter, updateFilter, resetFilter }
}

export default useFilter;