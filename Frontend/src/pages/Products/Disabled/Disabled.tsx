import { useState } from "react";
import Button from "../../../components/Button/Button";
import Modal from "../../../components/Modal/Modal";
import type { Product } from "../Products.types";
import { useDisabledProduct } from "./Disabled.hooks";

interface DisabledProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
}

const Disabled = ({ open, onClose, product }: DisabledProps) => {
  const [loading, setLoading] = useState(false);
  const isActive = product?.status ?? true;
  const action = isActive ? "Deshabilitar" : "Habilitar";

  const disable = async () => {
    if (!product) return;

    setLoading(true);

    try {
      const info = await useDisabledProduct(product.id);
      console.log("🚀 ~ disable ~ info:", info);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`${action} producto`}
      size="xs"
    >
      <p>¿Seguro que quieres {action.toLowerCase()}?</p>
      <Button
        type="button"
        onClick={disable}
        loading={loading}
        className="mt-4 w-full sm:w-auto"
      >
        {action}
      </Button>
    </Modal>
  );
};

export default Disabled;
