import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { formatNumber } from "../../../../service/format";
import {
  CHART_TICK,
  CHART_TOOLTIP_STYLE,
  type ChartValue,
} from "../../service/charts";
import MovementsByMonthSkeleton from "./MovementsByMonth.skeleton";
import { useEffect, useState } from "react";
import GAS, { type GasStatus } from "../../../../service/GAS";

const monthFormat = new Intl.DateTimeFormat("es-CO", {
  month: "short",
  year: "2-digit",
  timeZone: "UTC",
});

/**
 * Pasa un mes "YYYY-MM" a un texto corto, por ejemplo "ene 24".
 * @param month - Mes en formato YYYY-MM.
 */
const formatMonth = (month: string): string => {
  const [year, monthNumber] = month.split("-").map(Number);

  return monthFormat.format(new Date(Date.UTC(year, monthNumber - 1, 1)));
};

/** Gráfica con la cantidad de movimientos registrados por mes. */
const MovementsByMonthChart = () => {
  const [data, setData] = useState<ChartValue[]>([]);
  const [status, setStatus] = useState<GasStatus>("loading");
  useEffect(() => {
    const searchData = async () => {
      const info = await GAS<ChartValue[]>("getMovementsByMonth");
      setData(info.data ?? []);
      setStatus(info.status);
    };
    searchData();
  }, []);

  return (
    <>
      <h2 className="text-sm font-semibold">Movimientos por mes</h2>

      <p className="mt-1 text-xs text-muted">
        Cantidad de operaciones registradas cada mes
      </p>

      {status === "loading" ? (
        <MovementsByMonthSkeleton height={256} />
      ) : status === "error" ? (
        <p className="mt-5 text-sm text-muted">
          No se pudieron cargar los movimientos.
        </p>
      ) : data.length === 0 ? (
        <p className="mt-5 text-sm text-muted">
          No hay movimientos registrados.
        </p>
      ) : (
        <div className="mt-5 h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 12, right: 16, left: 0, bottom: 4 }}
            >
              <CartesianGrid
                vertical={false}
                stroke="currentColor"
                strokeOpacity={0.08}
              />

              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={CHART_TICK}
                tickFormatter={(value) => formatMonth(String(value))}
                interval="preserveStartEnd"
                minTickGap={12}
                dy={8}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={CHART_TICK}
                width={40}
                tickCount={4}
                allowDecimals={false}
                tickFormatter={(value) => formatNumber(Number(value))}
                domain={[0, (max: number) => Math.max(1, max * 1.2)]}
              />

              <Tooltip
                cursor={{
                  stroke: "currentColor",
                  strokeOpacity: 0.2,
                  strokeDasharray: "4 4",
                }}
                labelFormatter={(label) => `Mes: ${formatMonth(String(label))}`}
                formatter={(value) => [
                  formatNumber(Number(value)),
                  "Movimientos",
                ]}
                contentStyle={CHART_TOOLTIP_STYLE}
              />

              <Line
                type="monotone"
                dataKey="total"
                stroke="var(--color-accent)"
                strokeWidth={2}
                dot={{
                  r: 3,
                  fill: "var(--color-accent)",
                  stroke: "var(--color-accent)",
                }}
                activeDot={{ r: 5 }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default MovementsByMonthChart;
