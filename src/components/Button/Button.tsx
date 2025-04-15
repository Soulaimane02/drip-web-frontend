import React from "react";
import "./Button.css";

interface ButtonProps {
  text?: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  variant = 'primary',
  className = '',
  children,
}) => {
  return (
    <button 
      className={`custom-button ${variant} ${className}`} 
      onClick={onClick}
    >
      {children ?? text}
    </button>
  );
};

export default Button;
