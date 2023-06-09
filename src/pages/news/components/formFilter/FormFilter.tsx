import React, { useContext, useState } from "react";
import { useAppDispatch } from "src/app/hooks";
import { ModalContext } from "src/components/modal/Modal";
import { filterNews } from "src/features/sort/appSlice";
import { categories } from "src/common/categories";
import styles from "../formNews/FormNews.module.less";

export const FormFilter = ({ title }: { title: string }) => {
  const dispatch = useAppDispatch();
  const changeVisible = useContext(ModalContext);
  const [dateRange, setDateRange] = useState({ dateFrom: "", dateTo: "" });
  const [newsCategoryId, setNewsCategoryId] = useState(0);

  const dateFromRef = React.useRef<HTMLInputElement | null>(null);
  const dateToRef = React.useRef<HTMLInputElement | null>(null);

  const handleChangeCategory = (e: any) => {
    setNewsCategoryId(e.target.value);
    dispatch(filterNews({ ...dateRange, newsCategoryId }));
  };

  const handleChangeDate = (e: any) => {
    const { value, name } = e.target;
    setDateRange({ ...dateRange, [name]: value });
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
      <div className={`${styles.news_form} ${styles.newsfilter_form}`}>
        <label htmlFor="dateFrom" className={styles.news_date}>
          Дата с
          <input
            name="dateFrom"
            type="date"
            ref={dateFromRef}
            onChange={(e) => handleChangeDate(e)}
            max={dateRange.dateTo ? dateRange.dateTo : undefined}
          />
        </label>
        <label className={styles.news_date} htmlFor="dateTo">
          Дата по
          <input
            name="dateTo"
            type="date"
            ref={dateToRef}
            onChange={(e) => handleChangeDate(e)}
            min={dateRange.dateFrom ? dateRange.dateFrom : undefined}
          />
        </label>
        <div className={styles.news_date}>
          Категория
          <select
            className={styles.news_category}
            name=""
            id=""
            value={newsCategoryId}
            onChange={(e) => handleChangeCategory(e)}
          >
            {[{ title: "Все", img: "" }, ...categories].map(
              (category, index) => (
                <option key={category.title} value={index}>
                  {category.title}
                </option>
              )
            )}
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
    </div>
  );
};
