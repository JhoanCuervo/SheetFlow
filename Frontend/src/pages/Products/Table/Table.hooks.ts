import { useMemo, useState } from "react";
import type { Product } from "../Products.types";
import normalizeSearch from "../../../service/normalizeSearch";

export const useProductSearch = (products: Product[]) => {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const term = normalizeSearch(query);
    if (!term) return products;
    return products.filter((product) => normalizeSearch(product.name).includes(term));
  }, [products, query]);

  return {
    query,
    setQuery,
    results,
    isFiltering: normalizeSearch(query).length > 0,
  };
};