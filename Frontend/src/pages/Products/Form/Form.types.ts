import type { GasStatus } from "../../../service/GAS";

export interface formProps {
    id?: string | number;
    name: string;
    description: string;
    categoria: string;
    unit: string;
    purchasePrice:number;
    sellingprice: number;
    stockMin: number
    status: boolean;
}
export interface categiresFormProps {
    id: string;
    name: string;
}

export interface FormProps {
  categories: categiresFormProps[];
  status: GasStatus;
  initialData?: formProps;
  onSaved?: () => void;
}