import { useState, useCallback } from 'react';

const useToast = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const onToastOpenHandler = useCallback((msg: string) => {
    setMessage(msg);
    setIsOpen(true);
  }, []);

  const onToastCloseHandler = useCallback(() => {
    return setIsOpen(false);
  }, []);

  return {
    isOpen,
    message,
    onToastOpenHandler,
    onToastCloseHandler,
  };
};

export default useToast;
