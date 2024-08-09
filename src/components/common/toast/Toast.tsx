import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

interface ToastProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

const Toast = ({ message, isOpen, onClose }: ToastProps) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed top-5 left-1/2 transform bg-gray-800 text-white py-2 px-4 rounded shadow-lg z-50 animate-slide-down">
      <p>{message}</p>
    </div>,
    document.body
  );
};

export default Toast;
