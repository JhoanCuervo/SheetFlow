import type { ReactNode } from "react";

export type ModalSize = "xs" | "sm" | "md" | "lg";
export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;              
  description?: string;
  icon?: React.ReactNode;
  size?: ModalSize;           
  children: ReactNode;
  className?: string;
}