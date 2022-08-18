import React from "react"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid"

interface Props {
  accessor: string
  sortColumn: {
    by: string
    order: "ascend" | "descend" | ""
  }
  sortable?: boolean
}

const Sort: React.FC<Props> = ({ accessor, sortColumn, sortable = true }) => {
  const isActiveSort = sortColumn.by === accessor
  const isDescendant = sortColumn.order === "descend"
  const isAscendant = sortColumn.order === "ascend"

  if (!sortable) return null

  return (
    <div className="flex flex-col">
      <ChevronUpIcon
        data-testid={`${accessor}-asc-sort`}
        className={`w-5 h-5 -mb-1 ${
          isActiveSort && isAscendant ? "text-blue-400" : "text-gray-400"
        }`}
      />
      <ChevronDownIcon
        data-testid={`${accessor}-desc-sort`}
        className={`w-5 h-5 -mt-1 ${
          isActiveSort && isDescendant ? "text-blue-400" : "text-gray-400"
        }`}
      />
    </div>
  )
}

export default Sort
