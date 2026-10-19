import type { IconData } from "@lineiconshq/react-lineicons/dist/LineIcon";

export type StatCardId =
  | "activeProductsCount"
  | "outOfStockProductsCount"
  | "lowStockProductsCount"
  | "inventoryValue";

export interface ProductStats {
  activeProductsCount: number;
  outOfStockProductsCount: number;
  lowStockProductsCount: number;
  inventoryValue: number;
}

export type StatCardTone = "success" | "danger" | "warning" | "accent";

export interface StatCard {
  id: StatCardId;
  label: string;
  value: string;
  icon: IconData;
  tone: StatCardTone;
}

export type StatCardMeta = Omit<StatCard, "value">;
