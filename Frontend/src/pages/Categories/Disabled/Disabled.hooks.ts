import GAS from "../../../service/GAS";
import type { Category } from "../Categories.types";

export const useDisabledCategory = async (id: Category["id"]) => {
  const info = GAS<Category, Category["id"]>("setDisabledCategory", id);
  return info;
};
