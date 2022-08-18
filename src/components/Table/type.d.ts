export type SortOrder = 'ascend' | 'descend' | ''

export interface SortColumn {
  by: string
  order: SortOrder
}

export interface ColumnDefs {
  accessor: string
  label: string
  sortable?: boolean
  cellRenderer?: (data: any) => void
}

export type UseTableRenderer = (
  value: { data: any[], columns: ColumnDefs[] }, 
) => {
  headers: ColumnDefs[],
  rows: any[],
  sortColumn: SortColumn,
  handleHeaderClick: (header: ColumnDefs) => void,
  updateSort: (sort: SortColumn) => void
}