import type { SidebarProps } from "./Sidebar.types";
import NAV_ITEMS from "./Sidebar.data";
import Lineicons from "@lineiconshq/react-lineicons";
import { XmarkStroke } from "@lineiconshq/free-icons";

/** Menú lateral: fijo en escritorio y deslizable en móvil. */
export default function Sidebar({ open, onClose, activeId }: SidebarProps) {
  return (
    <>
      <button
        type="button"
        onClick={onClose}
        tabIndex={-1}
        aria-label="Cerrar menú"
        className={`fixed inset-0 z-30 cursor-default appearance-none border-0 bg-black/60 p-0 backdrop-blur-sm transition-[opacity,visibility] duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible pointer-events-none opacity-0"
        }`}
      />

      <aside
        id="menu-lateral"
        className={`fixed inset-y-0 left-0 z-40 flex w-72 max-w-[85vw] flex-col border-r border-line bg-surface transition-[transform,visibility] duration-300 ease-out lg:w-64 lg:max-w-none lg:visible lg:translate-x-0 ${
          open ? "visible translate-x-0" : "invisible -translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 px-5 py-5">
          <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-accent text-sm font-bold text-white">
            SF
          </span>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-sm font-semibold">SheetFlow</p>
            <p className="truncate text-xs text-muted">Finanzas personales</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar menú"
            className="-mr-1 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-muted transition hover:bg-black/5 hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:hidden"
          >
            <Lineicons
              icon={XmarkStroke}
              size={24}
              strokeWidth={1.8}
              aria-hidden="true"
              focusable="false"
              className="shrink-0"
            />
          </button>
        </div>

        <nav className="thin-scroll flex-1 overflow-y-auto px-3 py-2">
          <p className="px-3 pt-3 pb-2 text-xs font-medium tracking-wider text-muted uppercase">
            General
          </p>

          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const active = item.id === activeId;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent cursor-pointer ${
                      active
                        ? "bg-black/5 text-black"
                        : "text-muted hover:bg-black/5 hover:text-black"
                    }`}
                  >
                    {active && (
                      <span className="absolute top-1/2 left-0 h-6 w-1 -translate-y-1/2 rounded-r-full bg-accent" />
                    )}
                    <Lineicons
                      icon={item.icon}
                      size={20}
                      strokeWidth={1.8}
                      aria-hidden="true"
                      focusable="false"
                      className="shrink-0"
                    />

                    <span className="truncate">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
