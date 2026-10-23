import { useId } from "react";
import { Modal as ResponsiveModal } from "react-responsive-modal";
import type { ModalProps, ModalSize } from "./Modal.types";
import Lineicons from "@lineiconshq/react-lineicons";
import { XmarkStroke } from "@lineiconshq/free-icons";

const SIZE_CLASSES: Record<ModalSize, string> = {
  xs: "max-w-sm",
  sm: "max-w-md",
  md: "max-w-xl",
  lg: "max-w-3xl",
};

/**
 * Panel base. Anula el margen, padding y max-width que trae la librería
 * (1.2rem / 800px) para que el diseño lo controle Tailwind.
 */
const PANEL_CLASSES = [
  "relative m-0 flex w-full max-h-[calc(100dvh-2rem)] flex-col overflow-hidden",
  "rounded-2xl border border-line bg-void p-0 text-start",
  "shadow-2xl shadow-black/20 outline-none",
].join(" ");

const CLOSE_BUTTON_CLASSES = [
  "-mt-1 -mr-1 inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center",
  "rounded-xl text-muted transition hover:bg-black/5 hover:text-black",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
].join(" ");

const Modal = ({
  open,
  onClose,
  title,
  description,
  icon,
  size = "md",
  className = "",
  children,
}: ModalProps) => {
  const titleId = useId();
  const descriptionId = useId();

  return (
    <ResponsiveModal
      open={open}
      onClose={onClose}
      blockScroll
      reserveScrollBarGap
      showCloseIcon={false}
      animationDuration={200}
      ariaLabelledby={titleId}
      ariaDescribedby={description ? descriptionId : undefined}
      classNames={{
        overlay: "bg-black/45 backdrop-blur-[2px]",
        // Centrado con flex: el truco `center` de la librería exige
        // `display:inline-block`, incompatible con el panel flex.
        modalContainer: "flex items-center justify-center p-4 sm:p-6",
        modal: `${PANEL_CLASSES} ${SIZE_CLASSES[size]} ${className}`,
      }}
    >
      <div className="flex shrink-0 items-start gap-3 border-b border-line px-5 py-4 sm:px-6">
        {icon && (
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
            {icon}
          </span>
        )}

        <div className="min-w-0 flex-1">
          <h2 id={titleId} className="text-lg font-bold tracking-tight">
            {title}
          </h2>
          {description && (
            <p id={descriptionId} className="mt-0.5 text-sm text-muted">
              {description}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className={CLOSE_BUTTON_CLASSES}
        >
          <Lineicons
            icon={XmarkStroke}
            size={20}
            strokeWidth={1.8}
            aria-hidden="true"
            focusable="false"
            className="shrink-0"
          />
        </button>
      </div>

      <div className="thin-scroll min-h-0 flex-1 overflow-y-auto px-5 py-5 text-sm sm:px-6">
        {children}
      </div>
    </ResponsiveModal>
  );
}

export default Modal;