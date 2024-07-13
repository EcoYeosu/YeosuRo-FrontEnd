import React, { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  size?: "small" | "medium" | "large";
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  size = "medium",
  className,
}) => {
  let sizeClass = "";

  switch (size) {
    case "small":
      sizeClass = "px-2 py-1 text-sm";
      break;
    case "large":
      sizeClass = "px-6 py-3 text-lg";
      break;
    case "medium":
    default:
      sizeClass = "px-4 py-2 text-base";
  }

  return (
    <button
      onClick={onClick}
      className={`bg-blue-500 text-white
       font-semibold rounded-lg
        shadow-md hover:bg-blue-700 transition duration-300 active:bg-blue-900 ${sizeClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
