import type { CategoryValueChartProps } from "./CategoryValueChart.types";
import type { ChartPoint } from "../../service/charts";
import { useGasRequest } from "../../service/useGasRequest";

/** Prepara los datos del valor de inventario por categoría. */
const useCategoryValueChart = () => {
  const { data: categoryValueData, status } = useGasRequest<
    CategoryValueChartProps[],
    ChartPoint[]
  >("getCategoryValue", [], (response) =>
    response.map(({ category, value, color }) => ({
      name: category,
      total: value,
      color,
    })),
  );

  return { categoryValueData, status };
};

export default useCategoryValueChart;
