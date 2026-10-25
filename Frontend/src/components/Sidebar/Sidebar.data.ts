import type { NavItem } from "./Sidebar.types";

import { BoxClosedStroke, DashboardSquare1Stroke, Layers1Stroke } from "@lineiconshq/free-icons";

const NAV_ITEMS: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: DashboardSquare1Stroke,
  },
  {
    id: "products",
    label: "Productos",
    icon: BoxClosedStroke,
  },
  {
    id: "categories",
    label: "Categorías",
    icon: Layers1Stroke,
  },
];

export default NAV_ITEMS;