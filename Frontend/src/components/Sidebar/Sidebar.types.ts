import type { IconData } from "@lineiconshq/react-lineicons/dist/LineIcon";
type NavItemId = "dashboard" | "products";

export interface NavItem {
  id: NavItemId;
  label: string;
  icon: IconData;
}

export interface SidebarProps {
  open: boolean;
  onClose: () => void;
  setName: (name: string) => void;
}

export interface OnClickProps {
  (name: string, targetRoute: NavItemId): void;
}
