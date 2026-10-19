
import type { IconData } from "@lineiconshq/react-lineicons/dist/LineIcon";
type NavItemId = "dashboard" | "reports";

export interface NavItem {
  id: NavItemId;
  label: string;
  icon: IconData;
}

export interface SidebarProps {
  open: boolean;
  onClose: () => void;
  activeId: NavItemId;
}