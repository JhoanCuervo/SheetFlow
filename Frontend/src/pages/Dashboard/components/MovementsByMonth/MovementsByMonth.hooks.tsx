import type { MovementsByMonthProps } from "./MovementsByMonth.types";
import type { ChartValue } from "../../service/charts";
import { useGasRequest } from "../../service/useGasRequest";

/** Prepara los movimientos agrupados por mes. */
const useMovementsByMonth = () => {
  const { data: categoryValueData, status } = useGasRequest<
    MovementsByMonthProps[],
    ChartValue[]
  >("getMovementsByMonth", [], (response) =>
    response.map(({ month, total }) => ({
      name:  month,
      total,
    })),
  );

  return { categoryValueData, status };
};

export default useMovementsByMonth;
