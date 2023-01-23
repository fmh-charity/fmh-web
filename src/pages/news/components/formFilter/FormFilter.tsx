import React, { useContext, useState } from "react";
import { useAppDispatch } from "src/app/hooks";
import { ModalContext } from "src/components/modal/Modal";
import { filterNews } from "src/features/sort/sortSlice";
import { categories } from "src/common/categories";
import styles from "../formNews/FormNews.module.less";

export const FormFilter = ({ title }: { title: string }) => {
  const dispatch = useAppDispatch();
  const changeVisible = useContext(ModalContext);
  const [dateRange, setDateRange] = useState({});
  const [newsCategoryId, setNewsCategoryId] = useState(0);

  const dateFromRef = React.useRef<HTMLInputElement | null>(null);
  const dateToRef = React.useRef<HTMLInputElement | null>(null);

  const handleChangeCategory = (e: any) => {
    setNewsCategoryId(e.target.value);
    dispatch(filterNews({ ...dateRange, newsCategoryId }));
  };

  const handleChangeDate = (e: any) => {
    const { value, name } = e.target;
    setDateRange({ ...dateRange, [name]: changeDateFormat(value) });
  };

  const changeDateFormat = (formDate: string) => {
    const date = new Date(formDate);
    return (
      `${date.getMonth() + 1}/`.padStart(3, "0") +
      `${date.getDate()}/`.padStart(3, "0") +
      `${date.getFullYear()}`.slice(2, 4)
    );
  };

  const handleSubmit = () => {
    dispatch(
      filterNews({
        ...dateRange,
        newsCategoryId,
      })
    );
  };

  return (
    <div className={styles.form_news__container}>
      <header className={styles.header_news}>
        <div className={styles.header_title}>{title}</div>
      </header>
      <div className={styles.news_form}>
        <div className={styles.news_date}>
          <input
            name="dateFrom"
            type="date"
            ref={dateFromRef}
            placeholder="Дата от"
            onChange={(e) => handleChangeDate(e)}
          />
        </div>
        <div className={styles.news_date}>
          <input
            name="dateTo"
            type="date"
            placeholder="Дата до"
            ref={dateToRef}
            onChange={(e) => handleChangeDate(e)}
          />
        </div>
        <select
          className={styles.news_category}
          name=""
          id=""
          value={newsCategoryId}
          onChange={(e) => handleChangeCategory(e)}
        >
          {[
            { title: "Категория", img: "" },
            { title: "Все", img: "" },
            ...categories,
          ].map((category, index) => (
            <option key={category.title} value={index + 1} hidden={!index}>
              {category.title}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.news_controls}>
        <button
          type="submit"
          className={`${styles.news_add__button} ${styles.news_add__button_save}`}
          onClick={() => handleSubmit()}
        >
          Фильтр
        </button>
        <button
          className={styles.news_add__button}
          type="button"
          onClick={() => changeVisible?.()}
        >
          Отмена
        </button>
      </div>
    </div>
  );
};
