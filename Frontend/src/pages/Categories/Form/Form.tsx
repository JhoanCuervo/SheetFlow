import { useState, type ChangeEvent, type SubmitEvent } from "react";
import Button from "../../../components/Button/Button";
import { initialData } from "./Form.data";
import { useEditCategory, useSetCategory } from "./Form.hooks";
import type { FormProps, formProps } from "./Form.types";

const FIELD_CLASSES =
  "h-10 w-full rounded-xl border border-line bg-void px-3 text-sm outline-none transition placeholder:text-muted/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const LABEL_CLASSES = "flex flex-col gap-1.5 text-sm font-semibold";

const Form = ({ initialData: dataInit, onSaved }: FormProps) => {
  const [data, setData] = useState<formProps>(dataInit ?? initialData);
  const [saving, setSaving] = useState(false);
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const save = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("guardando", data);

    setSaving(true);

    try {
      const info =
        data.id !== undefined
          ? await useEditCategory(data)
          : await useSetCategory(data);

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
          placeholder="Nombre de la categoría"
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
          placeholder="Descripción de la categoría"
          className={FIELD_CLASSES}
          value={data.description || ""}
          onChange={onChange}
        />
      </label>
      <label className={`${LABEL_CLASSES} sm:col-span-2`}>
        Color
        <span className="flex items-center gap-3">
          <input
            type="color"
            name="color"
            className="h-10 w-14 cursor-pointer rounded-xl border border-line bg-void p-1 outline-none transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            value={data.color || "#6366f1"}
            onChange={onChange}
          />
          <span className="text-sm font-normal text-muted">{data.color}</span>
        </span>
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
