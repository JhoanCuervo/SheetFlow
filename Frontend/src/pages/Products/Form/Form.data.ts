import type { Product } from "../Products.types";
import type { categiresFormProps, formProps } from "./Form.types";

export const initialData: formProps = {
  name: "",
  description: "",
  categoria: "",
  unit: "",
  purchasePrice: 0,
  sellingprice: 0,
  stockMin: 0,
  status: true,
};

export const productToFormData = (
  product: Product,
  categories: categiresFormProps[],
): formProps => ({
  id: product.id,
  name: product.name,
  description: product.description,
  categoria:
    categories.find((category) => category.name === product.categoryName)?.id ??
    "",
  unit: product.unit ?? "",
  purchasePrice: product.purchasePrice,
  sellingprice: product.sellingprice,
  stockMin: product.stockMin,
  status: product.status,
});

export const units = ["unidad", "par", "paquete", "caja", "metro"] as const;
