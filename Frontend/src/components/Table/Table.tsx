// import { TABLE_STYLES, TABLE_THEME } from "./Table.styles";

import DataTable from "react-data-table-component";
import type { DataTableProps } from "./Table.type";

const DEFAULT_PAGE_SIZE_OPTIONS = [5, 10, 25, 50];
const Table = <T extends object>({
  emptyMessage = "Sin datos",
  ...rest
}: DataTableProps<T>) => {
  const options = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: false,
  };
  return (
    <DataTable<T>
      {...rest}
      pagination={true}
      paginationPerPage={10}
      paginationRowsPerPageOptions={DEFAULT_PAGE_SIZE_OPTIONS}
      paginationComponentOptions={options}
      paginationPosition="bottom"
      responsive={true}
      highlightOnHover={true}
      noDataComponent={
        <p className="px-3 py-8 text-center text-sm text-muted">
          {emptyMessage}
        </p>
      }
    />
  );
};

export default Table;
