import { ChangeEventHandler } from "react";
import "./Input.css";

export type InputProps = {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
  placeholder: string;
};

const Input: React.FC<InputProps> = ({ onChange, placeholder, value }) => (
  <input
    type="text"
    placeholder={placeholder}
    onChange={onChange}
    value={value}
  />
);

export default Input;
