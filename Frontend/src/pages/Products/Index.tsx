import { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
// import { useGetAllProducts } from "./Products.hooks";
import Table from "./Table/Table";
import Lineicons from "@lineiconshq/react-lineicons";
import { PlusStroke } from "@lineiconshq/free-icons";
import Button from "../../components/Button/Button";
import Form from "./Form/Form";
import { productToFormData } from "./Form/Form.data";
import Disabled from "./Disabled/Disabled";
import GAS, { type GasStatus } from "../../service/GAS";
import type { Product } from "./Products.types";
import { useCategories } from "./Products.hooks";

const Products = () => {


  const [open, setOpen] = useState(false);
  const [disabling, setDisabling] = useState<Product | null>(null);
  const [editing, setEditing] = useState<Product | null>(null);
  const { data: categories, status: categoriesStatus } = useCategories();

  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<GasStatus>("loading");

  const openNew = () => {
    setEditing(null);
    setOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditing(product);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setEditing(null);
  };

  const loadProducts = async () => {
    const info = await GAS<Product[]>("getProductsTable");
    setProducts(info.data ?? []);
    setStatus(info.status);
  };

  useEffect(() => {
    loadProducts();
  }, []);


  if (status === "error") {
    return (
      <p className="mt-4 rounded-2xl border border-line bg-void p-4 text-sm text-red-500">
        No se pudieron cargar los productos.
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
          Agregar producto
        </Button>
        <Table
          data={products}
          status={status}
          onEdit={openEdit}
          onDisable={setDisabling}
        />
        <Modal
          open={open}
          onClose={closeModal}
          title={editing ? "Editar producto" : "Nuevo producto"}
          description={
            editing
              ? "Modifica los datos del producto seleccionado."
              : "Completa los datos para agregarlo al inventario."
          }
          size="md"
        >
          <Form
            key={editing ? String(editing.id) : "new"}
            categories={categories}
            status={categoriesStatus}
            initialData={
              editing ? productToFormData(editing, categories) : undefined
            }
            onSaved={() => {
              closeModal();
              loadProducts();
            }}
          />
        </Modal>
        <Disabled
          open={!!disabling}
          onClose={() => setDisabling(null)}
          product={disabling}
        />
      </div>
    </>
  );
};
export default Products;
