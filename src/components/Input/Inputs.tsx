import { FC } from "react";
import "./Input.css";

interface InputProps {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
}

const Input: FC<InputProps> = ({ label, type, name, placeholder }) => {
  return (
    <div className="input-container">
      <label htmlFor={name}>{label}</label>
      <input id={name} type={type} name={name} placeholder={placeholder} />
    </div>
  );
};

export default Input;
