import { useCallback, useEffect, useState } from "react";
import type { GasStatus } from "../../service/GAS";
import GAS from "../../service/GAS";
import type { Category } from "./Categories.types";

export const useCategories = () => {
  const [data, setData] = useState<Category[]>([]);
  const [status, setStatus] = useState<GasStatus>("loading");

  const loadCategories = useCallback(async () => {
    const info = await GAS<Category[]>("getCategoriesTable");
    setData(info.data ?? []);
    setStatus(info.status);
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return { data, status, reload: loadCategories };
};
