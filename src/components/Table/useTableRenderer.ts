import { useCallback, useEffect, useState } from "react";
import { ColumnDefs, SortColumn, UseTableRenderer } from "./type";

const useTableRenderer: UseTableRenderer = ({ data, columns }) => {
  const [headerResult, setHeaderResult] = useState<ColumnDefs[]>([])
  const [rows, setRows] = useState<any[]>([])
  const [sortColumn, setSortColumn] = useState<SortColumn>({
    by: "",
    order: "",
  })

  /**
   * handle when user click column header
   */
  const handleHeaderClick = (header: ColumnDefs) => {
    const accessor = header.accessor
    const isSortable = header.sortable
    const sameAccessor = sortColumn.by === accessor

    if (!isSortable) return

    if (sameAccessor && sortColumn.order === "ascend") {
      return setSortColumn({ by: accessor, order: "descend" })
    }

    if (sameAccessor && sortColumn.order === "descend") {
      return setSortColumn({ by: "", order: "" })
    }

    return setSortColumn({ by: accessor, order: "ascend" })
  }

  /**
   * update sort state
   */
  const updateSort = useCallback((sort: SortColumn) => {
    setSortColumn(sort)
  }, []);

  const resolveCellValue = (value: any) => {
    const valueIsObject = typeof value === 'object'
    
    if (valueIsObject) return ''
    
    return value
  }

  /**
   * Begin generate table column and cell after DOM ready
   */
  useEffect(() => {
    const headers = columns.map((column) => ({
      ...column,
      sortable: column.sortable ?? true,
    }))

    setHeaderResult(headers)

    const sortedRows = data.map(item => {
      return headers.map(header => ({
        accessor: header.accessor,
        sortable: header.sortable ?? true,
        value: resolveCellValue(item[header.accessor]),
        ...(header.cellRenderer && {CellRenderer: header.cellRenderer(item)})
      }))
    })

    setRows(sortedRows)

  }, [columns, data])

  return {
    headers: headerResult,
    rows,
    handleHeaderClick,
    updateSort,
    sortColumn
  }
}

export default useTableRenderer;