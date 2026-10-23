const BAR_HEIGHTS = [72, 46];

interface InOutChartSkeletonProps {
  height: number;
}

/** Placeholder con dos barras mientras cargan los datos. */
const InOutChartSkeleton = ({ height }: InOutChartSkeletonProps) => (
  <div
    className="mt-5 flex items-end justify-around gap-8 px-2"
    style={{ height }}
    aria-hidden="true"
  >
    {BAR_HEIGHTS.map((barHeight, index) => (
      <div
        key={index}
        className="w-16 max-w-[40%] animate-pulse rounded-t-md bg-black/5"
        style={{ height: `${barHeight}%` }}
      />
    ))}
  </div>
);

export default InOutChartSkeleton;
