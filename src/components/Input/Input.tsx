import { ChangeEventHandler } from "react";
import "./Input.css";

export type InputProps = {
  onChange: (newValue: string | undefined) => void;
  value?: string;
  placeholder: string;
};

const Input: React.FC<InputProps> = ({ onChange, placeholder, value }) => (
  <input
    type="text"
    placeholder={placeholder}
    onChange={() => onChange(value)}
    value={value}
  />
);

export default Input;
