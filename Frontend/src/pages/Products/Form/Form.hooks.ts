import GAS from "../../../service/GAS";
import type { Product } from "../Products.types";
import type { formProps } from "./Form.types";

export const useSetProduct = async (data: formProps) => {
  const dataAllProducts = GAS<Product, formProps>("setNewProduct", data);
  return dataAllProducts;
};

export const useEditProduct = async (data: formProps) => {
  const dataAllProducts = GAS<Product, formProps>("setEditProduct", data);
  return dataAllProducts;
};

