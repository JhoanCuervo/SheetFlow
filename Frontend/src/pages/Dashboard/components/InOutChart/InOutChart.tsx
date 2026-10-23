import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import {
  createColoredBar,
  CHART_TICK,
  CHART_TOOLTIP_STYLE,
  type ChartPoint,
} from "../../service/charts";
import { formatNumber } from "../../../../service/format";
import InOutChartSkeleton from "./InOutChart.skeleton";
import { useEffect, useState } from "react";
import type { GasStatus } from "../../../../service/GAS";
import GAS from "../../../../service/GAS";

const ColoredBar = createColoredBar([5, 5, 0, 0]);

/** Gráfica de barras con el total de entradas y salidas. */
const InOutChart = () => {
  const [data, setData] = useState<ChartPoint[]>([]);
  const [status, setStatus] = useState<GasStatus>("loading");
  useEffect(() => {
    const searchData = async () => {
      const info = await GAS<ChartPoint[]>("getInOut");
      setData(info.data ?? []);
      setStatus(info.status);
    };
    searchData();
  }, []);

  return (
    <>
      <h2 className="text-sm font-semibold">Entradas y salidas</h2>

      <p className="mt-1 text-xs text-muted">Total de unidades registradas</p>

      {status === "loading" ? (
        <InOutChartSkeleton height={256} />
      ) : status === "error" ? (
        <p className="mt-5 text-sm text-muted">
          No se pudieron cargar los datos.
        </p>
      ) : (
        <div className="mt-5 h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 28, right: 12, left: 12, bottom: 4 }}
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
                dy={8}
              />

              <YAxis hide domain={[0, (max: number) => max * 1.18]} />

              <Tooltip
                cursor={{ fill: "currentColor", fillOpacity: 0.05 }}
                formatter={(value) => [formatNumber(Number(value)), "Unidades"]}
                contentStyle={CHART_TOOLTIP_STYLE}
              />

              <Bar
                dataKey="total"
                shape={ColoredBar}
                maxBarSize={76}
                isAnimationActive={false}
              >
                <LabelList
                  dataKey="total"
                  position="top"
                  formatter={(value) => formatNumber(Number(value))}
                  fill="currentColor"
                  fontSize={12}
                  fontWeight={600}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default InOutChart;
