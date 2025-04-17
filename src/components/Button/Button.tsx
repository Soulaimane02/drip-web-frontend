import React from "react";
import "./Button.css";

interface ButtonProps {
  text?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset"; 
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  variant = 'primary',
  className = '',
  children,
  type = "button",

}) => {
  return (
    <button 
      className={`custom-button ${variant} ${className}`} 
      onClick={onClick}
      type={type}
    >
      {children ?? text}
    </button>
  );
};

export default Button;
