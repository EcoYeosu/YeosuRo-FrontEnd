import React, { ReactNode } from "react";

type TagProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};

const Tag: React.FC<TagProps> = ({ children, onClick, className }) => {
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center px-3 py-1 rounded-full
       bg-blue-100 text-blue-800 font-semibold cursor-pointer
        hover:bg-blue-200 active:bg-blue-300 ${className}`}
    >
      {children}
    </div>
  );
};

export default Tag;
