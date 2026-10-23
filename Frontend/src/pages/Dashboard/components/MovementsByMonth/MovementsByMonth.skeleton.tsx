const LINE_PATH =
  "M 0 74 L 14 54 L 28 62 L 42 32 L 57 46 L 71 20 L 85 40 L 100 28";

interface MovementsByMonthSkeletonProps {
  height: number;
}

/** Placeholder con una línea mientras carga la gráfica. */
const MovementsByMonthSkeleton = ({ height }: MovementsByMonthSkeletonProps) => (
  <div
    className="mt-5 w-full animate-pulse px-2"
    style={{ height }}
    aria-hidden="true"
  >
    <svg
      className="h-full w-full text-black/10"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        d={LINE_PATH}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  </div>
);

export default MovementsByMonthSkeleton;
