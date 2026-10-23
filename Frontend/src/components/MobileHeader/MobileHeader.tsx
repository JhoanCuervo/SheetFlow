import { MenuHamburger1Stroke } from "@lineiconshq/free-icons"
import Lineicons from "@lineiconshq/react-lineicons"
import type { MobileHeaderProps } from "./MobileHeader.types"

/** Cabecera móvil con el botón que abre el menú. */
const MobileHeader = ({ open, onOpen }: MobileHeaderProps) => {

  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-line bg-void/80 px-4 py-3 backdrop-blur lg:hidden">
          <button
            type="button"
            onClick={onOpen}
            aria-label="Abrir menú"
            aria-expanded={open}
            aria-controls="menu-lateral"
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-line text-black/70 transition hover:bg-black/5 hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <Lineicons
              icon={MenuHamburger1Stroke}
              size={20}
              strokeWidth={1.8}
              aria-hidden="true"
              focusable="false"
            />
          </button>
          <span className="text-sm font-semibold">SheetFlow</span>
        </header>
  );
};

export default MobileHeader;