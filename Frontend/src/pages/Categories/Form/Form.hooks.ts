import GAS from "../../../service/GAS";
import type { Category } from "../Categories.types";
import type { formProps } from "./Form.types";

export const useSetCategory = async (data: formProps) => {
  const dataAllCategories = GAS<Category, formProps>("setNewCategory", data);
  return dataAllCategories;
};

export const useEditCategory = async (data: formProps) => {
  const dataAllCategories = GAS<Category, formProps>("setEditCategory", data);
  return dataAllCategories;
};
