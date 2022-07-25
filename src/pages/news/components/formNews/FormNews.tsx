import { format } from "date-fns";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { categories } from "src/common/categories";
import { selectUserInfo } from "src/features/auth/authSlice";
import { INews } from "src/model/INews";
import { getRefDate, getRefChecked, getRefValue } from "src/utils/GetRef";
import { ModalContext } from "src/components/modal/Modal";
import styles from "./FormNews.module.less";

const FormNews = ({
  news,
  title,
  submit,
}: {
  news: INews | undefined;
  title: string;
  submit: (formData: INews) => void;
}) => {
  const changeVisible = useContext(ModalContext);
  const categoryRef = React.createRef<HTMLSelectElement>();
  const dateRef = React.createRef<HTMLInputElement>();
  const timeRef = React.createRef<HTMLInputElement>();
  const titleRef = React.createRef<HTMLInputElement>();
  const descriptionRef = React.createRef<HTMLTextAreaElement>();
  const checkActiveRef = React.createRef<HTMLInputElement>();
  const userInfo = useSelector(selectUserInfo);

  const submitValue = () => {
    submit({
      createDate: news?.createDate || Date.now(),
      description: getRefValue(descriptionRef, ""),
      newsCategoryId: getRefValue(categoryRef, 0),
      publishEnabled: getRefChecked(checkActiveRef, false),
      title: getRefValue(titleRef, ""),
      creatorId: userInfo.id,
      creatorName: `${userInfo.firstName} ${userInfo.lastName} ${userInfo.middleName}`,
      publishDate: getRefDate(dateRef, timeRef),
      id: news?.id || 0,
    });
    changeVisible?.();
  };

  return (
    <div className={styles.form_news__container}>
      <header className={styles.header_news}>
        <div className={styles.header_title}>{title}</div>
      </header>
      <div className={styles.news_form}>
        <div className={styles.news_row}>
          <select
            className={styles.news_category}
            ref={categoryRef}
            defaultValue={news?.newsCategoryId || 0}
          >
            {categories.map((category, index) => (
              <option key={category.title} value={index + 1}>
                {category.title}
              </option>
            ))}
          </select>
          <div className={styles.news_date}>
            <input
              type="date"
              ref={dateRef}
              min={format(new Date(), "yyyy-MM-dd")}
              defaultValue={
                news
                  ? format(news.publishDate, "yyyy-MM-dd")
                  : format(Date.now(), "yyyy-MM-dd")
              }
            />
          </div>
          <div className={styles.news_time}>
            <input
              type="time"
              ref={timeRef}
              defaultValue={
                news
                  ? format(news.publishDate, "HH:mm")
                  : format(Date.now(), "HH:mm")
              }
            />
          </div>
        </div>
        <input
          className={styles.news_category}
          type="text"
          placeholder="Заголовок"
          ref={titleRef}
          defaultValue={news?.title || ""}
          minLength={3}
        />
        <textarea
          className={styles.news_description}
          placeholder="Описание"
          ref={descriptionRef}
          defaultValue={news ? news.description : ""}
          minLength={5}
        />
        <div className={styles.news_activity}>
          <span>Не активна</span>
          <input
            type="checkbox"
            className={styles.news_cb}
            defaultChecked={news?.publishEnabled || false}
            ref={checkActiveRef}
          />
        </div>
        <div className={styles.news_controls}>
          <button
            type="button"
            className={`${styles.news_add__button} ${styles.news_add__button_save}`}
            onClick={() => submitValue()}
          >
            СОХРАНИТЬ
          </button>
          <button
            type="button"
            className={styles.news_add__button}
            onClick={() => changeVisible?.()}
          >
            ОТМЕНИТЬ
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormNews;
