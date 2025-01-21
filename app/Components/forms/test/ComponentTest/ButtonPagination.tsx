// ButtonComponent.tsx
import React from "react";

type ButtonProps = {
  variant: "outline" | "filled";
  className: string;
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
};

const Button = ({ variant, className, onClick, disabled, children }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${className} ${variant === "outline" ? "border" : "bg-primary text-white"}`}
    >
      {children}
    </button>
  );
};

export default Button;
