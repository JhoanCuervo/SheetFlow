const ROW_WIDTHS = [58, 82, 44, 70, 36];

interface CategoryValueChartSkeletonProps {
  height: number;
}

/** Placeholder que imita las barras mientras carga la gráfica. */
const CategoryValueChartSkeleton = ({
  height,
}: CategoryValueChartSkeletonProps) => (
  <div
    className="mt-5 flex flex-col justify-around"
    style={{ height }}
    aria-hidden="true"
  >
    {ROW_WIDTHS.map((width, index) => (
      <div key={index} className="flex items-center gap-3">
        <div className="h-4 w-[116px] shrink-0 animate-pulse rounded bg-black/5" />
        <div
          className="h-4 animate-pulse rounded bg-black/5"
          style={{ width: `${width}%` }}
        />
      </div>
    ))}
  </div>
);

export default CategoryValueChartSkeleton;
