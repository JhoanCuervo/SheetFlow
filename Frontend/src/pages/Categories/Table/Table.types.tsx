export interface CategoryTable {
  id: string | number;
  name: string;
  description: string;
  status: boolean;
  color: string;
}

export interface CategorySearchProps {
  value: string;
  onChange: (value: string) => void;
  visible: number;
  total: number;
}
