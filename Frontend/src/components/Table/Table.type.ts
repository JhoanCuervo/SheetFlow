import type { TableProps } from "react-data-table-component";

export type { TableColumn } from "react-data-table-component";

export type DataTableProps<T> = Omit<
  TableProps<T>,
  "theme" | "customStyles" | "noDataComponent"
> & {
  /** Texto cuando no hay filas. */
  emptyMessage?: string;
};