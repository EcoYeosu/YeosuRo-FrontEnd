import { ChangeEvent, useState } from "react";

export const useInput = (initialValue: { [key: string]: any }) => {
  const [values, setValues] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return { values, handleChange };
};