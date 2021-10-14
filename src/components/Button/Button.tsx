import React from "react";
import { PropsWithChildren } from "react";

import styles from "./Button.module.scss";

export type ButtonProps = PropsWithChildren<{
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  className?: string;
}>;

const Button: React.FC<ButtonProps> = ({
  onClick = () => {},
  children,
  disabled = false,
  className = styles.btn,
}) => (
  <button onClick={onClick} disabled={disabled} className={className}>
    {children}
  </button>
);

export default React.memo(Button);
