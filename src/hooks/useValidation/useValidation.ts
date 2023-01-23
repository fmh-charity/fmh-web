import { useState } from "react";
import { setLocale } from "yup";
import ru from "src/hooks/useValidation/localeRu";
import { INews } from "src/model/INews";

interface LoginValidation {
  userName: string;
  password: string;
}

type setterType = (
  value: INews | LoginValidation,
  name: any
) => Promise<boolean>;
type resetType = () => void;
type messagesType = string[];

export const useValidation = (): [setterType, messagesType, resetType] => {
  setLocale(ru);

  // const newSchema = object().shape({
  //   title: string().required().min(2).max(50).label("Заголовок"),
  //   description: string().required().min(20).max(250).label("Описание"),
  //   newsCategoryId: string().required().label("Категорию"),
  //   publishDate: number().required().typeError("Дата публикации не выбрана"),
  // });

  const reset = () => {
    setMessages([]);
  };

  const [messages, setMessages] = useState([]);

  const validate = async (data: any, scheme: any) => {
    reset();
    let response = false;
    await scheme
      .validate(data, { abortEarly: false })
      .then(() => {
        response = true;
      })
      .catch((e: any) => {
        setMessages(e.errors);
        response = false;
      });
    return response;
  };

  return [validate, messages, reset];
};
