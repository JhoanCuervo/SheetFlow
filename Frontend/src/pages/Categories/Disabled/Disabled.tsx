import { useState } from "react";
import Button from "../../../components/Button/Button";
import Modal from "../../../components/Modal/Modal";
import type { Category } from "../Categories.types";
import { useDisabledCategory } from "./Disabled.hooks";

interface DisabledProps {
  open: boolean;
  onClose: () => void;
  category: Category | null;
}

const Disabled = ({ open, onClose, category }: DisabledProps) => {
  const [loading, setLoading] = useState(false);
  const isActive = category?.status ?? true;
  const action = isActive ? "Deshabilitar" : "Habilitar";

  const disable = async () => {
    if (!category) return;

    setLoading(true);

    try {
      const info = await useDisabledCategory(category.id);
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
      title={`${action} categoría`}
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
