
import type { ProductStats, StatCard, StatCardId } from "./StatCards.types";
import STAT_CARDS_META from "./StatCards.data";
import GAS, { type GasStatus } from "../../../../service/GAS";
import { useEffect, useState } from "react";

const LOCALE = "es-CO";

const countFormat = new Intl.NumberFormat(LOCALE);

const valueFormat: Partial<Record<StatCardId, Intl.NumberFormat>> = {
  inventoryValue: new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency: "COP",
  }),
};

/** Aplica el formato que corresponde a cada tarjeta. */
const formatValue = (id: StatCardId, value: number) =>
  (valueFormat[id] ?? countFormat).format(value);

/** Convierte las métricas del backend en tarjetas listas para mostrar. */
const transformStatCards = (stats: ProductStats): StatCard[] =>
  STAT_CARDS_META.map((meta) => ({
    ...meta,
    value: formatValue(meta.id, stats[meta.id]),
  }));

export const useStatCards = () => {
  const [data, setData] = useState<StatCard[]>([]);
  const [status, setStatus] = useState<GasStatus>("loading");

  useEffect(() => {
    const searchData = async () => {
      const info = await GAS<ProductStats>("getProductStats");
      setData(info.data ? transformStatCards(info.data) : []);
      setStatus(info.status);
    };
    searchData();
  }, []);

  return { data, status };
};
