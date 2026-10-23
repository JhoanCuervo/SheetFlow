export interface ProductTable {
  id: string | number;
  name: string;
  stockCurrent: number;
  stockMin: number;
  purchasePrice: number;
  categoryName: string;
  sellingprice: number;
}


export interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
  visible: number;
  total: number;
}