import {
  Ban2Stroke,
  CheckCircle1Stroke,
  Pencil1Stroke,
} from "@lineiconshq/free-icons";
import Lineicons from "@lineiconshq/react-lineicons";
import type { TableColumn } from "../../../components/Table/Table.type";
import type { Category } from "../Categories.types";

export const getCategoryColumns = (
  onEdit?: (category: Category) => void,
  onDisable?: (category: Category) => void,
): TableColumn<Category>[] => [
  {
    id: "name",
    name: "Categoría",
    selector: (category) => category.name,
    sortable: true,
    grow: 2,
    minWidth: "180px",
    cell: (category) => (
      <div className="py-1">
        <p className="font-semibold">{category.name}</p>
        <p className="text-xs text-muted">#{String(category.id)}</p>
      </div>
    ),
  },
  {
    id: "description",
    name: "Descripción",
    selector: (category) => category.description,
    sortable: true,
    grow: 2,
    minWidth: "200px",
    cell: (category) => category.description,
  },
  {
    id: "status",
    name: "Estado",
    selector: (category) => category.status,
    sortable: true,
    right: true,
    minWidth: "100px",
    cell: (category) => (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
          category.status
            ? "bg-emerald-500/10 text-emerald-600"
            : "bg-red-500/10 text-red-500"
        }`}
      >
        {category.status ? "Activo" : "Inactivo"}
      </span>
    ),
  },
  {
    id: "color",
    name: "Color",
    selector: (category) => category.color,
    sortable: true,
    right: true,
    minWidth: "110px",
    cell: (category) => (
      <span className="inline-flex items-center justify-end gap-2">
        <span
          className="h-4 w-4 shrink-0 rounded-full border border-line"
          style={{ backgroundColor: category.color }}
        />
        <span className="text-xs uppercase">{category.color}</span>
      </span>
    ),
  },
  {
    id: "actions",
    name: "",
    right: true,
    minWidth: "96px",
    cell: (category) => (
      <div className="flex items-center justify-end gap-1">
        <button
          type="button"
          onClick={() => onEdit?.(category)}
          aria-label={`Editar ${category.name}`}
          className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-muted transition hover:bg-accent/10 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <Lineicons
            icon={Pencil1Stroke}
            size={16}
            strokeWidth={1.8}
            aria-hidden="true"
            focusable="false"
            className="shrink-0"
          />
        </button>
        <button
          type="button"
          onClick={() => onDisable?.(category)}
          aria-label={`${category.status ? "Deshabilitar" : "Habilitar"} ${category.name}`}
          className={`inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-muted transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
            category.status
              ? "hover:bg-red-500/10 hover:text-red-500"
              : "hover:bg-emerald-500/10 hover:text-emerald-600"
          }`}
        >
          <Lineicons
            icon={category.status ? Ban2Stroke : CheckCircle1Stroke}
            size={16}
            strokeWidth={1.8}
            aria-hidden="true"
            focusable="false"
            className="shrink-0"
          />
        </button>
      </div>
    ),
  },
];
