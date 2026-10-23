import {
  Ban2Stroke,
  CheckCircle1Stroke,
  Pencil1Stroke,
} from "@lineiconshq/free-icons";
import Lineicons from "@lineiconshq/react-lineicons";
import type { TableColumn } from "../../../components/Table/Table.type";
import { formatFullCurrency, formatNumber } from "../../../service/format";
import type { Product } from "../Products.types";

export const getProductColumns = (
  onEdit?: (product: Product) => void,
  onDisable?: (product: Product) => void,
): TableColumn<Product>[] => [
  {
    id: "name",
    name: "Producto",
    selector: (product) => product.name,
    sortable: true,
    grow: 2,
    minWidth: "180px",
    cell: (product) => (
      <div className="py-1">
        <p className="font-semibold">{product.name}</p>
        <p className="text-xs text-muted">#{String(product.id)}</p>
      </div>
    ),
  },
  {
    id: "categoryName",
    name: "Categoria",
    selector: (product) => product.categoryName,
    sortable: true,
    right: true,
    minWidth: "90px",
    cell: (product) => product.categoryName,
  },
  {
    id: "purchasePrice",
    name: "Precio compra",
    selector: (product) => product.purchasePrice,
    sortable: true,
    right: true,
    minWidth: "140px",
    cell: (product) => formatFullCurrency(product.purchasePrice),
  },
  {
    id: "sellingprice",
    name: "Precio venta",
    selector: (product) => product.sellingprice,
    sortable: true,
    right: true,
    minWidth: "140px",
    cell: (product) => formatFullCurrency(product.sellingprice),
  },
  {
    id: "stockCurrent",
    name: "Stock",
    selector: (product) => product.stockCurrent,
    sortable: true,
    right: true,
    minWidth: "90px",
    cell: (product) => formatNumber(product.stockCurrent),
  },
  {
    id: "stockMin",
    name: "Stock mín.",
    selector: (product) => product.stockMin,
    sortable: true,
    right: true,
    minWidth: "110px",
    cell: (product) => formatNumber(product.stockMin),
  },
  {
    id: "value",
    name: "Valor",
    selector: (product) => product.stockCurrent * product.purchasePrice,
    sortable: true,
    right: true,
    minWidth: "140px",
    cell: (product) =>
      formatFullCurrency(product.stockCurrent * product.purchasePrice),
  },
  {
    id: "status",
    name: "Estado",
    selector: (product) => product.status,
    sortable: true,
    right: true,
    minWidth: "100px",
    cell: (product) => (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
          product.status
            ? "bg-emerald-500/10 text-emerald-600"
            : "bg-red-500/10 text-red-500"
        }`}
      >
        {product.status ? "Activo" : "Inactivo"}
      </span>
    ),
  },
  {
    id: "actions",
    name: "",
    right: true,
    minWidth: "96px",
    cell: (product) => (
      <div className="flex items-center justify-end gap-1">
        <button
          type="button"
          onClick={() => onEdit?.(product)}
          aria-label={`Editar ${product.name}`}
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
          onClick={() => onDisable?.(product)}
          aria-label={`${product.status ? "Deshabilitar" : "Habilitar"} ${product.name}`}
          className={`inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-muted transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
            product.status
              ? "hover:bg-red-500/10 hover:text-red-500"
              : "hover:bg-emerald-500/10 hover:text-emerald-600"
          }`}
        >
          <Lineicons
            icon={product.status ? Ban2Stroke : CheckCircle1Stroke}
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
