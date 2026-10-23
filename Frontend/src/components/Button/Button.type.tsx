import type { MouseEventHandler, ReactNode } from "react";

export interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  children: ReactNode;
}