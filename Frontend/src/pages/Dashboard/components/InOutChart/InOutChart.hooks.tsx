import type { InOutChartProps } from "./InOutChart.types";
import type { ChartPoint } from "../../service/charts";
import { useGasRequest } from "../../service/useGasRequest";
import { INOUT_SERIES } from "./InOutChart.data";

/** Prepara las entradas y salidas para la gráfica. */
const useInOutChart = () => {
  const { data: inOutChartData, status } = useGasRequest<
    InOutChartProps,
    ChartPoint[]
  >("getInOut", [], ({ entries, exits }) =>
    INOUT_SERIES.map(({ key, name, color }) => ({
      name,
      total: key === "entries" ? entries : exits,
      color,
    })),
  );

  return { inOutChartData, status };
};

export default useInOutChart;
