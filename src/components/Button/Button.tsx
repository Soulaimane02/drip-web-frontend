import React from "react";
import "./Button.css"

interface ButtonProps {
    text: string;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) =>{
    return (
        <div>
            <button onClick={onClick}>{text}</button>
        </div>
    )
};

export default Button;