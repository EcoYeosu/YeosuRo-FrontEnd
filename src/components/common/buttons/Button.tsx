import React, { ReactNode } from "react";

type ButtonProps = {
  value: string;
  onClick?: () => void;
  size?: "small" | "medium" | "large";
  className?: string;
  color?:string
};

const Button: React.FC<ButtonProps> = ({
  value,
  onClick,
  size = "medium",
  className,
  color
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
       font-semibold active:bg-blue-900] ${sizeClass} ${className}`}
       style={{ borderRadius:'4px', color:`#${color ? color : 'ffffff'}`}}>
      {value}
    </button>
  );
};

export default Button;
