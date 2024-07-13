import React, { ReactNode } from "react";

type InputProps = {
  placeholder?: string;
  size?: "small" | "medium" | "large";
  className?: string;
};

const Input: React.FC<InputProps> = ({
  placeholder,
  size = "medium",
  className,
}) => {
  let sizeClass = "";

  switch (size) {
    case "small":
      sizeClass = "px-2 py-1 text-sm";
      break;

    case "medium":
    default:
      sizeClass = "px-4 py-2 text-base";
      break;

    case "large":
      sizeClass = "px-6 py-3 text-lg";
      break;
  }

  return (
    <input
      className={`border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 ${sizeClass} ${className}`}
      placeholder={placeholder}
    />
  );
};

export default Input;
