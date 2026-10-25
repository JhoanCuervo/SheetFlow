import type { Category } from "../Categories.types";
import type { formProps } from "./Form.types";

export const initialData: formProps = {
  name: "",
  description: "",
  color: "#6366f1",
  status: true,
};

export const categoryToFormData = (category: Category): formProps => ({
  id: category.id,
  name: category.name,
  description: category.description,
  color: category.color,
  status: category.status,
});
