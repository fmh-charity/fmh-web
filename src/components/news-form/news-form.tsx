import { useFetcher, useNavigate, useSubmit } from "react-router-dom";
import type { NewsDto } from "../../api/model";
import { Input } from "../input";
import { Button } from "../button";
import styles from "./news-form.module.less";
import type { FormEventHandler} from "react";
import { useState } from "react";
import { TextArea } from "../textarea";

interface NewsFormProps {
  buttonText: string;
  data?: NewsDto;
}

export const NewsForm = ({
  buttonText,
  data,
}: NewsFormProps) => {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const submit = useSubmit();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const errors = {
      title: "",
      description: "",
      newsCategoryId: "",
    };
    for (const [name,value] of data) {
      if (name === "title" && !value) errors.title = "Заполните поле";
      if (name === "description" && !value) errors.description = "Заполните поле";
      if (name === "newsCategoryId" && !value) errors.newsCategoryId = "Заполните поле";
    }
    setErrors(errors);
    if (Object.values(errors).some(Boolean)) return;
    submit(e.currentTarget);
  };
  return (
    <fetcher.Form className={styles.newsForm} onSubmit={onSubmit} method="POST">
      <div className={styles.row}>
        <div className={styles.left}>
          <span className={styles.title}>Тема*</span>
        </div>
        <div className={styles.right}>
          <Input type="text" name="title" label="Тема" error={errors.title || ""} defaultValue={data?.title || ""} />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.left}>
          <span className={styles.title}>Описание*</span>
        </div>
        <div className={styles.right}>
          <TextArea name="description" label="Описание" error={errors.description || ""} defaultValue={data?.description || ""} />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.left}>
          <span className={styles.title}>Категория*</span>
        </div>
        <div className={styles.right}>
          <Input type="text" name="newsCategoryId" label="Категория" error={errors.newsCategoryId || ""} defaultValue={String(data?.newsCategoryId || "")} />
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <Button type="button" intent="secondary" disabled={fetcher.state === "submitting"} onClick={() => navigate("/news")}>
          Отмена
        </Button>
        <Button type="submit" intent="primary" disabled={fetcher.state === "submitting"}>
          {buttonText}
        </Button>
      </div>
      <input type="hidden" name="id" defaultValue={data?.id} />
    </fetcher.Form>
  );
};
