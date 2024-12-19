import React from "react";
import "./TextArea.css";

interface TextAreaProps {
  label: string;
  name: string;
  placeholder?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ label, name, placeholder }) => {
  return (
    <div className="textarea-container">
      <label htmlFor={name}>{label}</label>
      <textarea id={name} name={name} placeholder={placeholder}></textarea>
    </div>
  );
};

export default TextArea;
