import type { NavItem } from "./Sidebar.types";

import { BoxClosedStroke, DashboardSquare1Stroke } from "@lineiconshq/free-icons";

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
];

export default NAV_ITEMS;