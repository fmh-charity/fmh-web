import { useState } from "react";
import { setLocale } from "yup";
import ru from "src/hooks/useValidation/localeRu";

type setterType = (value: string[]) => void;
type resetType = () => void;
type messagesType = string[];

export const useValidation = (): [setterType, messagesType, resetType] => {
  setLocale(ru);

  const reset = () => {
    setMessages([]);
  };

  const [messages, setMessages] = useState<string[]>([]);

  const setter: setterType = (message) => {
    setMessages(message);
  };

  return [setter, messages, reset];
};
