import { useState, useEffect } from 'react';
import type { ProductStats, StatCard, StatCardId } from './StatCards.types';
import STAT_CARDS_META from './StatCards.data';
import GAS from '../../../../service/GAS';

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

/** Carga las métricas del dashboard y las deja listas para mostrar. */
export function useStatCards() {
  const [cards, setCards] = useState<StatCard[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      setStatus("loading");

      try {
        const stats = await GAS<ProductStats>("getProductStats");

        if (ignore) return;

        setCards(STAT_CARDS_META.map((meta) => ({
          ...meta,
          value: formatValue(meta.id, stats[meta.id]),
        })));

        setStatus("ready");
      } catch (error) {
        if (ignore) return;
        console.error(error);
        setStatus("error");
      }
    };

    fetchData();

    return () => { ignore = true; };
  }, []);

  return { cards, status };
}
