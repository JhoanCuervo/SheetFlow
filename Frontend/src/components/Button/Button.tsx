import { Spinner3Stroke } from "@lineiconshq/free-icons";
import Lineicons from "@lineiconshq/react-lineicons";
import type { ButtonProps } from "./Button.type";

const Button = ({
  onClick,
  className,
  type,
  loading = false,
  children,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      aria-busy={loading}
      className={`inline-flex h-10 shrink-0 cursor-pointer items-center gap-2 rounded-xl bg-accent px-4 text-sm font-semibold text-white transition hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {loading ? (
        <Lineicons
          icon={Spinner3Stroke}
          size={18}
          strokeWidth={1.8}
          aria-hidden="true"
          focusable="false"
          className="shrink-0 animate-spin"
        />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
