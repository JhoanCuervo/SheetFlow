import DataTable from "../../../components/Table/Table";
import type { GasStatus } from "../../../service/GAS";
import type { Category } from "../Categories.types";
import { getCategoryColumns } from "./Table.columns";
import { useCategorySearch } from "./Table.hooks";
import CategorySearch from "./Table.search";

const Table = ({
  data,
  status,
  onEdit,
  onDisable,
}: {
  data: Category[];
  status: GasStatus;
  onEdit?: (category: Category) => void;
  onDisable?: (category: Category) => void;
}) => {
  const { query, setQuery, results, isFiltering } = useCategorySearch(data);

  const emptyMessage = isFiltering
    ? `No hay categorías que coincidan con "${query}"`
    : "No hay categorías registradas";

  return (
    <DataTable
      emptyMessage={emptyMessage}
      columns={getCategoryColumns(onEdit, onDisable)}
      data={results}
      keyField="id"
      ariaLabel="Categorías"
      progressPending={status === "loading"}
      subHeader={
        status === "ready" ? (
          <CategorySearch
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
