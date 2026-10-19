import { Rectangle } from "recharts";
import type { BarShapeProps } from "recharts";


export interface ChartValue {
  name: string;
  total: number;
}

export interface ChartPoint extends ChartValue {
  color: string;
}

export const CHART_TICK = { fill: "currentColor", fontSize: 12 };

export const CHART_TOOLTIP_STYLE = {
  borderRadius: 10,
  border: "1px solid var(--color-line)",
  background: "var(--color-void)",
  fontSize: 12,
};

export type BarRadius = [number, number, number, number];

/**
 * Crea la barra con el color que trae cada punto.
 * @param radius - Radios de las esquinas.
 */
export const createColoredBar =
  (radius: BarRadius) =>
  (props: BarShapeProps) => (
    <Rectangle {...props} fill={props.payload?.color} radius={radius} />
  );
