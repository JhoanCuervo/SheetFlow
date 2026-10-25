import { useMemo, useState } from "react";
import type { Category } from "../Categories.types";
import normalizeSearch from "../../../service/normalizeSearch";

export const useCategorySearch = (categories: Category[]) => {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const term = normalizeSearch(query);
    if (!term) return categories;
    return categories.filter((category) => normalizeSearch(category.name).includes(term));
  }, [categories, query]);

  return {
    query,
    setQuery,
    results,
    isFiltering: normalizeSearch(query).length > 0,
  };
};
