const LOCALE = "es-CO";

const countFormat = new Intl.NumberFormat(LOCALE);

const compactCurrencyFormat = new Intl.NumberFormat(LOCALE, {
  notation: "compact",
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 1,
});

const fullCurrencyFormat = new Intl.NumberFormat(LOCALE, {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

/** Número entero con separador de miles (ej. "1.234"). */
export const formatNumber = (value: number): string => countFormat.format(value);

/** Moneda COP compacta (ej. "$1,2 M"). */
export const formatCompactCurrency = (value: number): string =>
  compactCurrencyFormat.format(value);

/** Moneda COP exacta (ej. "$1.234.567"). */
export const formatFullCurrency = (value: number): string =>
  fullCurrencyFormat.format(value);
