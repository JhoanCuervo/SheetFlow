import { useEffect, useState } from "react";
import type { categiresFormProps } from "./Form/Form.types";
import type { GasStatus } from "../../service/GAS";
import GAS from "../../service/GAS";

export const useCategories = () => {
  const [data, setData] = useState<categiresFormProps[]>([]);
  const [status, setStatus] = useState<GasStatus>("loading");

  useEffect(() => {
    const getCategories = async () => {
      const info = await GAS<categiresFormProps[]>("getCategoriesForm");
      setData(info.data ?? []);
      setStatus(info.status);
    };
    getCategories();
  }, []);

  return { data, status };
};
