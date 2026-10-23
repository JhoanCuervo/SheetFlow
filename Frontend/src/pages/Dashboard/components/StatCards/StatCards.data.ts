import {
  CheckCircle1Stroke,
  Gauge1Stroke,
  Wallet1Stroke,
  XmarkCircleStroke,
} from "@lineiconshq/free-icons";
import type { StatCardMeta } from "./StatCards.types";

const STAT_CARDS_META: StatCardMeta[] = [
  {
    id: "activeProductsCount",
    label: "Productos activos",
    icon: CheckCircle1Stroke,
    tone: "success",
  },
  {
    id: "outOfStockProductsCount",
    label: "Productos sin stock",
    icon: XmarkCircleStroke,
    tone: "danger",
  },
  {
    id: "lowStockProductsCount",
    label: "Productos con stock bajo",
    icon: Gauge1Stroke,
    tone: "warning",
  },
  {
    id: "inventoryValue",
    label: "Valor estimado del inventario",
    icon: Wallet1Stroke,
    tone: "accent",
  },
];

export default STAT_CARDS_META;
