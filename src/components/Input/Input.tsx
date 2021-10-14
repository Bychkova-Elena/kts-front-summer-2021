import React from "react";
import { ChangeEventHandler } from "react";

import styles from "./Input.module.scss";

export type InputProps = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  placeholder: string;
  className?: string;
};

const Input: React.FC<InputProps> = ({ onChange, placeholder, value, className = styles.Input }) => (
  <input
    type="text"
    placeholder={placeholder}
    onChange={onChange}
    value={value}
    className={ className }
  />
);

export default React.memo(Input);
