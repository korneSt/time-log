import { FC } from "react";
import "./Select.css";

interface SelectProps {
  label: string;
  name: string;
  options: string[];
}

const Select: FC<SelectProps> = ({ label, name, options }) => {
  return (
    <div className="select-container">
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
