import React, { useCallback } from "react"
import Searchbar from "components/Searchbar"
import SelectGender from "components/SelectGender"
import Table from "components/Table"
import useFilter, { FilterState } from "hooks/useFilter"
import { useGetUsers } from "services/resolver"
import useDebounceValue from "hooks/useDebounceValue"
import { SortColumn } from "components/Table/type"
import Pagination from "components/Pagination"

const Home = () => {
  const { filter, updateFilter, resetFilter } = useFilter()

  // debounce anything that comes from filter state
  const filterValue = useDebounceValue<FilterState>(filter, 300)

  const {
    data: users,
    isLoading,
    isFetching,
  } = useGetUsers({
    keyword: filterValue.term,
    gender: filterValue.gender,
    sortBy: filterValue.sortBy,
    sortOrder: filterValue.sortOrder,
    page: filter.page,
  })

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilter("term", e.target.value)
  }

  const handleChangeGender = (gender: string) => {
    updateFilter("gender", gender)
  }

  const handleTableSort = useCallback(
    (sortColumn: SortColumn) => {
      updateFilter("sortBy", sortColumn.by)
      updateFilter("sortOrder", sortColumn.order)
    },
    [updateFilter]
  )

  const handlePagination = (page: number) => {
    updateFilter("page", page)
  }

  return (
    <div className="max-w-[95vw] mx-auto p-8">
      <div className="flex items-end gap-5">
        <Searchbar onChange={handleChangeSearch} value={filter.term} />
        <SelectGender onChange={handleChangeGender} value={filter.gender} />

        <button
          aria-label="reset-filter"
          className="py-3 px-5 border border-gray-400 text-gray-500"
          onClick={resetFilter}
        >
          Reset Filter
        </button>
      </div>

      <div className="h-8" />
      <div className="h-[1px] border border-gray-100" />
      <div className="h-8" />

      <Table
        data={users?.data?.results ?? []}
        isLoading={isLoading || isFetching}
        onSort={handleTableSort}
        sortOrder={filter.sortOrder}
        sortBy={filter.sortBy}
      />

      {!isLoading && <Pagination page={filter.page} onChangePage={handlePagination} />}
    </div>
  )
}

export default Home
