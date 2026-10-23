export interface Product {
  id: string | number;
  name: string;
  description: string;
  unit: string;
  stockCurrent: number;
  stockMin: number;
  purchasePrice: number;
  categoryName: string;
  sellingprice: number;
  status: boolean;
}

