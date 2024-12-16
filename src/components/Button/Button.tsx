import { ButtonHTMLAttributes } from "react";
import "./Button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  className?: string;
}

const Button = ({
  label,
  onClick,
  variant = "primary",
  disabled = false,
  className = "",
  ...rest
}: ButtonProps) => {
  const finalClassName = `button ${variant} ${
    disabled ? "disabled" : ""
  } ${className}`;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={finalClassName}
      {...rest}
    >
      {label}
    </button>
  );
};

export default Button;
