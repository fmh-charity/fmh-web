import { useCallback, useState } from "react";
import { object, string, number, setLocale } from "yup";
import ru from "src/hooks/useValidation/localeRu";
import { INews } from "src/model/INews";

type setterType = (a: INews) => Promise<boolean>;
// type resetType = () => void;
type messagesType = string[];

export const useValidation = (): [setterType, messagesType] => {
  setLocale(ru);

  const newSchema = object().shape({
    title: string().required().min(2).max(50).label("Заголовок"),
    description: string().required().min(20).max(250).label("Описание"),
    newsCategoryId: string().required().label("Категорию"),
    publishDate: number().required().typeError("Дата публикации не выбрана"),
  });

  const [messages, setMessages] = useState([]);
  const validate = useCallback(
    async (data: INews) => {
      let response = false;
      await newSchema
        .validate(
          {
            title: data.title,
            description: data.description,
            newsCategoryId: data.newsCategoryId,
            publishDate: data.publishDate,
          },
          { abortEarly: false }
        )
        .then(() => {
          response = true;
        })
        .catch((e) => {
          setMessages(e.errors);
          response = false;
        });
      return response;
    },
    [newSchema]
  );

  return [validate, messages];
};
