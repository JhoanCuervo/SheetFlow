import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import Table from "./Table/Table";
import Lineicons from "@lineiconshq/react-lineicons";
import { PlusStroke } from "@lineiconshq/free-icons";
import Button from "../../components/Button/Button";
import Form from "./Form/Form";
import { categoryToFormData } from "./Form/Form.data";
import Disabled from "./Disabled/Disabled";
import type { Category } from "./Categories.types";
import { useCategories } from "./Categories.hooks";

const Categories = () => {

  const [open, setOpen] = useState(false);
  const [disabling, setDisabling] = useState<Category | null>(null);
  const [editing, setEditing] = useState<Category | null>(null);
  const { data: categories, status, reload: loadCategories } = useCategories();

  const openNew = () => {
    setEditing(null);
    setOpen(true);
  };

  const openEdit = (category: Category) => {
    setEditing(category);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setEditing(null);
  };

  if (status === "error") {
    return (
      <p className="mt-4 rounded-2xl border border-line bg-void p-4 text-sm text-red-500">
        No se pudieron cargar las categorías.
      </p>
    );
  }

  return (
    <>
      <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-void p-5">
        <Button
          type="button"
          onClick={openNew}
          className="float-right mb-4"
        >
          <Lineicons
            icon={PlusStroke}
            size={18}
            strokeWidth={1.8}
            aria-hidden="true"
            focusable="false"
            className="shrink-0"
          />
          Agregar categoría
        </Button>
        <Table
          data={categories}
          status={status}
          onEdit={openEdit}
          onDisable={setDisabling}
        />
        <Modal
          open={open}
          onClose={closeModal}
          title={editing ? "Editar categoría" : "Nueva categoría"}
          description={
            editing
              ? "Modifica los datos de la categoría seleccionada."
              : "Completa los datos para agregarla al inventario."
          }
          size="md"
        >
          <Form
            key={editing ? String(editing.id) : "new"}
            initialData={
              editing ? categoryToFormData(editing) : undefined
            }
            onSaved={() => {
              closeModal();
              loadCategories();
            }}
          />
        </Modal>
        <Disabled
          open={!!disabling}
          onClose={() => setDisabling(null)}
          category={disabling}
        />
      </div>
    </>
  );
};
export default Categories;
