import React, { useEffect } from "react"
import useTableRenderer from "./useTableRenderer"
import { ColumnDefs, SortColumn } from "./type"
import Sort from "./Sort"
import { formatDate } from "utils/date"

export interface Props {
  data: any[]
  isLoading?: boolean
  sortOrder?: SortColumn["order"]
  sortBy?: SortColumn["by"]
  /**
   * force onSort callback function to use "useCallback"
   */
  onSort: (callback: SortColumn, deps?: React.DependencyList) => void
}

const columns: ColumnDefs[] = [
  {
    accessor: "username",
    label: "Username",
    sortable: false,
    cellRenderer: data => data.login.username,
  },
  {
    accessor: "name",
    label: "Name",
    cellRenderer: data => `${data.name.first} ${data.name.last}`,
  },
  {
    accessor: "email",
    label: "Email",
  },
  {
    accessor: "gender",
    label: "Gender",
  },
  {
    accessor: "date",
    label: "Registered Date",
    cellRenderer: data => formatDate(data.registered.date),
  },
]

const Table: React.FC<Props> = ({
  isLoading,
  data,
  sortOrder,
  sortBy,
  onSort,
}) => {

  const { 
    rows, 
    headers, 
    updateSort, 
    handleHeaderClick, 
    sortColumn 
  } = useTableRenderer({ data, columns })

  /**
   * lifting sort state up
   */
  useEffect(() => {
    onSort(sortColumn)
  }, [onSort, sortColumn])

  /**
   * handle sort update when value from outside change,
   * like from reset filter button
   */
  useEffect(() => {
    updateSort({ by: sortBy ?? "", order: sortOrder ?? "" })
  }, [sortBy, sortOrder, updateSort])

  return (
    <div className="w-full h-full relative">
      
      {/* render overlay when loading data to API */}
      {isLoading && (
        <div className="absolute w-full h-full bg-white/40 transition-all" />
      )}

      <table className="table-fixed w-full">
        <thead>
          <tr>
            {headers.map(header => {
              const isSortColumn =
                header.accessor === sortColumn.by && header.sortable

              return (
                <th
                  key={header.accessor}
                  className={`py-4 px-3 bg-gray-50 border-b-2 border-b-gray-200 ${
                    isSortColumn && "bg-gray-100"
                  }`}
                  onClick={() => handleHeaderClick(header)}
                >
                  <div className="flex justify-between items-center">
                    <div className="font-bold select-none">{header.label}</div>

                    <Sort
                      accessor={header.accessor}
                      sortable={header.sortable}
                      sortColumn={sortColumn}
                    />
                  </div>
                </th>
              )
            })}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-b-gray-200">
              {row.map((cell: any, i: number) => {
                const isSortColumn =
                  sortColumn.by === cell.accessor && cell.sortable

                return (
                  <td
                    key={i}
                    className={`h-20 p-3 break-words ${
                      isSortColumn && "bg-gray-50"
                    }`}
                  >
                    {cell.CellRenderer ?? cell.value}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
