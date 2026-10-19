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
} from "../../service/charts";
import {
  formatCompactCurrency,
  formatFullCurrency,
} from "../../../../service/format";
import useCategoryValueChart from "./CategoryValueChart.hooks";
import CategoryValueChartSkeleton from "./CategoryValueChart.skeleton";

const VISIBLE_HEIGHT = 300;

const ROW_HEIGHT = 44;

const ColoredBar = createColoredBar([0, 5, 5, 0]);

/** Gráfica horizontal con el valor del inventario por categoría. */
function CategoryValueChart() {
  const { categoryValueData, status } = useCategoryValueChart();
  const data = categoryValueData.filter((point) => point.total > 0);
  const contentHeight = Math.max(VISIBLE_HEIGHT, data.length * ROW_HEIGHT);

  return (
    <>
      <h2 className="text-sm font-semibold">
        Valor de inventario por categoría
      </h2>
      <p className="mt-1 text-xs text-muted">Stock actual × precio de compra</p>

      {status === "loading" ? (
        <CategoryValueChartSkeleton height={VISIBLE_HEIGHT} />
      ) : status === "error" ? (
        <p className="mt-5 text-sm text-muted">
          No se pudieron cargar las categorías.
        </p>
      ) : data.length === 0 ? (
        <p className="mt-5 text-sm text-muted">
          No hay inventario por categoría.
        </p>
      ) : (
        <div
          className="thin-scroll mt-5 overflow-y-auto"
          style={{ maxHeight: VISIBLE_HEIGHT }}
        >
          <ResponsiveContainer width="100%" height={contentHeight}>
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 4, right: 56, bottom: 4, left: 0 }}
            >
              <CartesianGrid
                horizontal={false}
                stroke="currentColor"
                strokeOpacity={0.08}
              />

              <XAxis
                type="number"
                tickLine={false}
                axisLine={false}
                tick={CHART_TICK}
                tickFormatter={(value) => formatCompactCurrency(Number(value))}
              />

              <YAxis
                type="category"
                dataKey="name"
                interval={0}
                width={116}
                tickLine={false}
                axisLine={false}
                tick={CHART_TICK}
              />

              <Tooltip
                cursor={{ fill: "currentColor", fillOpacity: 0.05 }}
                formatter={(value) => [
                  formatFullCurrency(Number(value)),
                  "Inventario",
                ]}
                contentStyle={CHART_TOOLTIP_STYLE}
              />

              <Bar
                dataKey="total"
                shape={ColoredBar}
                maxBarSize={22}
                isAnimationActive={false}
              >
                <LabelList
                  dataKey="total"
                  position="right"
                  formatter={(value) => formatCompactCurrency(Number(value))}
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
}

export default CategoryValueChart;
