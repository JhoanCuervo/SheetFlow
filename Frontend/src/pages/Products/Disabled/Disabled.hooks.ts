import GAS from "../../../service/GAS";
import type { Product } from "../Products.types";

export const useDisabledProduct = async (id: Product["id"]) => {
  const info = GAS<Product, Product["id"]>("setDisabledProduct", id);
  return info;
};
