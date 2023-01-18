import { useState } from "react";

type setterType = (a: string[]) => void;
type resetType = () => void;
type messagesType = string[];

export const useValidation = (
  initialState: messagesType
): [setterType, resetType, messagesType] => {
  const [errors, setErrors] = useState(initialState);
  const reset = () => {
    setErrors([]);
  };
  const setter = (array: string[]) => {
    setErrors(array);
  };

  return [setter, reset, errors];
};
