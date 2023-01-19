import React, { useContext, useState } from "react";
import { useAppDispatch } from "src/app/hooks";
import { ModalContext } from "src/components/modal/Modal";
import { filterNews } from "src/features/sort/sortSlice";
import { categories } from "src/common/categories";
import styles from "../formNews/FormNews.module.less";

export const FormFilter = ({
  publishDate,
  title,
}: {
  publishDate: number;
  title: string;
}) => {
  const dispatch = useAppDispatch();
  const changeVisible = useContext(ModalContext);
  // const [dateFrom, setDateFrom] = useState("");
  // const [dateTo, setDateTo] = useState("");
  const [newsCategoryId, setNewsCategoryId] = useState(0);
  const dateFromRef = React.useRef<HTMLInputElement | null>(null);
  const dateToRef = React.useRef<HTMLInputElement | null>(null);

  const handleChange = (e: any) => {
    const dateFrom = Date.parse("2023-01-01");
    const dateTo = "2023-01-15";
    setNewsCategoryId(e.target.value);
    dispatch(filterNews({ dateTo, dateFrom, newsCategoryId }));
  };

  // const handleChange = (e: any) => {
  //   setDateFrom(e.target.value);
  //   setDateTo("2023-01-01");
  // };
  const removePlaceholder = () => {
    if (dateToRef.current) dateToRef.current.type = "date";
    if (dateFromRef.current) dateFromRef.current.type = "date";
  };

  const handleSubmit = () => {
    console.log(publishDate);
    const dateFrom = Date.parse("2023-01-01");
    const dateTo = Date.parse("2023-01-15");
    dispatch(filterNews({ dateTo, dateFrom, newsCategoryId }));
  };
  return (
    <div className={styles.form_news__container}>
      <header className={styles.header_news}>
        <div className={styles.header_title}>{title}</div>
      </header>
      <div className={styles.news_form}>
        <div className={styles.news_row}>
          <div className={styles.news_date}>
            <input
              name="from"
              type="text"
              ref={dateFromRef}
              placeholder="Дата от"
              // value={dateFrom}
              onFocus={() => removePlaceholder()}
            />
          </div>
          <div className={styles.news_date}>
            <input
              name="to"
              type="text"
              placeholder="Дата до"
              ref={dateToRef}
              onFocus={() => removePlaceholder()}
              // value={dateTo}
            />
          </div>
          <select
            className={styles.news_category}
            name=""
            id=""
            value={newsCategoryId}
            onChange={(e) => handleChange(e)}
          >
            {[
              { title: "Категория", img: "" },
              { title: "Все", img: "" },
              ...categories,
            ].map((category, index) => (
              <option key={category.title} value={index} hidden={!index}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
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
