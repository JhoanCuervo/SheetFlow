import Lineicons from "@lineiconshq/react-lineicons";
import { Search1Stroke, XmarkStroke } from "@lineiconshq/free-icons";
import type { CategorySearchProps } from "./Table.types";

const CategorySearch = ({
  value,
  onChange,
  visible,
  total,
}: CategorySearchProps) => {
  return (
    <div className="flex w-full flex-col gap-2 py-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:w-72">
        <Lineicons
          icon={Search1Stroke}
          size={18}
          strokeWidth={1.8}
          aria-hidden="true"
          focusable="false"
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted"
        />

        <input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Buscar categoría..."
          aria-label="Buscar categoría"
          className="h-10 w-full rounded-xl border border-line bg-void pr-9 pl-9 text-sm outline-none transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />

        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Limpiar busqueda"
            className="absolute top-1/2 right-2 grid h-7 w-7 -translate-y-1/2 cursor-pointer place-items-center rounded-lg text-muted transition hover:bg-black/5 hover:text-black"
          >
            <Lineicons
              icon={XmarkStroke}
              size={16}
              strokeWidth={1.8}
              aria-hidden="true"
              focusable="false"
            />
          </button>
        )}
      </div>

      <p className="text-xs text-muted" aria-live="polite">
        Mostrando <span className="font-semibold text-black">{visible}</span> de{" "}
        {total}
      </p>
    </div>
  );
}

export default CategorySearch;
