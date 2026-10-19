import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../../components/Sidebar/Sidebar";
import MobileHeader from "../../components/MobileHeader/MobileHeader";

/** Estructura base: menú, cabecera móvil y contenido de la ruta. */
export default function MainLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleSidebar = (status:boolean) => setMenuOpen(status)

  return (
    <div className="min-h-screen bg-void text-black">

      <Sidebar open={menuOpen} onClose={() => toggleSidebar(false)} activeId="dashboard" />
      <MobileHeader open={menuOpen} onOpen={() => toggleSidebar(true)}/>

      <div className="flex min-h-screen flex-col lg:pl-64">
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
