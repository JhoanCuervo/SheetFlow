import DataTable from "../../../components/Table/Table";
import type { GasStatus } from "../../../service/GAS";
import type { Product } from "../Products.types";
import { getProductColumns } from "./Table.columns";
import { useProductSearch } from "./Table.hooks";
import ProductSearch from "./Table.search";

const Table = ({
  data,
  status,
  onEdit,
  onDisable,
}: {
  data: Product[];
  status: GasStatus;
  onEdit?: (product: Product) => void;
  onDisable?: (product: Product) => void;
}) => {
  const { query, setQuery, results, isFiltering } = useProductSearch(data);

  const emptyMessage = isFiltering
    ? `No hay productos que coincidan con "${query}"`
    : "No hay productos registrados";

  return (
    <DataTable
      emptyMessage={emptyMessage}
      columns={getProductColumns(onEdit, onDisable)}
      data={results}
      keyField="id"
      ariaLabel="Productos"
      progressPending={status === "loading"}
      subHeader={
        status === "ready" ? (
          <ProductSearch
            value={query}
            onChange={setQuery}
            visible={results.length}
            total={data.length}
          />
        ) : undefined
      }
    />
  );
};

export default Table;
