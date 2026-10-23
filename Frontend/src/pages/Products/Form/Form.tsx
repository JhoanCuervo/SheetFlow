import { useState, type ChangeEvent, type SubmitEvent } from "react";
import Button from "../../../components/Button/Button";
import { initialData, units } from "./Form.data";
import { useEditProduct, useSetProduct } from "./Form.hooks";
import type { FormProps, formProps } from "./Form.types";

const FIELD_CLASSES =
  "h-10 w-full rounded-xl border border-line bg-void px-3 text-sm outline-none transition placeholder:text-muted/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const LABEL_CLASSES = "flex flex-col gap-1.5 text-sm font-semibold";

const Form = ({
  categories,
  status,
  initialData: dataInit,
  onSaved,
}: FormProps) => {
  const [data, setData] = useState<formProps>(dataInit ?? initialData);
  const [saving, setSaving] = useState(false);
  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = event.target;

    setData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? 0 : Number(value)) : value,
    }));
  };

  const save = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("guardando", data);

    setSaving(true);

    try {
      const info =
        data.id !== undefined
          ? await useEditProduct(data)
          : await useSetProduct(data);

      console.log("🚀 ~ save ~ info:", info);

      if (info.status === "ready") onSaved?.();
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="grid gap-4 sm:grid-cols-2" onSubmit={save}>
      <label className={`${LABEL_CLASSES} sm:col-span-2`}>
        Nombre
        <input
          type="text"
          name="name"
          placeholder="Nombre del producto"
          className={FIELD_CLASSES}
          value={data.name || ""}
          onChange={onChange}
        />
      </label>
      <label className={`${LABEL_CLASSES} sm:col-span-2`}>
        Descripción
        <input
          type="text"
          name="description"
          placeholder="Descripción del producto"
          className={FIELD_CLASSES}
          value={data.description || ""}
          onChange={onChange}
        />
      </label>
      <label className={LABEL_CLASSES}>
        Categoría
        <select
          name="categoryID"
          className={FIELD_CLASSES}
          value={data.categoria || ""}
          onChange={onChange}
        >
          <option value="" disabled>
            Selecciona una categoría
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      <label className={LABEL_CLASSES}>
        Unidad
        <select
          name="unit"
          className={FIELD_CLASSES}
          value={data.unit || ""}
          onChange={onChange}
        >
          <option value="" disabled>
            Selecciona una unidad
          </option>
          {units.map((unit, index) => (
            <option key={index} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </label>
      <label className={LABEL_CLASSES}>
        Precio de compra
        <input
          type="number"
          name="purchasePrice"
          step="0.01"
          placeholder="0.00"
          className={FIELD_CLASSES}
          value={data.purchasePrice || ""}
          onChange={onChange}
        />
      </label>
      <label className={LABEL_CLASSES}>
        Precio de venta
        <input
          type="number"
          name="sellingprice"
          step="0.01"
          placeholder="0.00"
          className={FIELD_CLASSES}
          value={data.sellingprice || ""}
          onChange={onChange}
        />
      </label>
      <label className={LABEL_CLASSES}>
        Stock mínimo
        <input
          type="number"
          name="stockMin"
          step="1"
          placeholder="0"
          className={FIELD_CLASSES}
          value={data.stockMin || ""}
          onChange={onChange}
        />
      </label>
      <Button
        type="submit"
        loading={saving}
        className="w-auto justify-self-center sm:col-span-2"
      >
        {dataInit ? "Editar" : "Guardar"}
      </Button>
    </form>
  );
};

export default Form;
