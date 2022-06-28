import { format } from "date-fns";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categories } from "src/common/categories";
import { selectUserInfo } from "src/features/auth/authSlice";
import { INews } from "src/pages/news/NewsPage";
import styles from "./FormNews.module.less";

const FormNews = ({
  news,
  title,
  submit,
}: {
  news: INews;
  title: string;
  submit: (formData: INews) => void;
}) => {
  const navigation = useNavigate();
  const categoryRef = React.createRef<HTMLSelectElement>();
  const dateRef = React.createRef<HTMLInputElement>();
  const timeRef = React.createRef<HTMLInputElement>();
  const titleRef = React.createRef<HTMLInputElement>();
  const descriptionRef = React.createRef<HTMLTextAreaElement>();
  const checkActiveRef = React.createRef<HTMLInputElement>();
  const userInfo = useSelector(selectUserInfo);

  const getRefValue = (ref: any, value: any) =>
    ref.current ? ref.current.value : value;

  const getRefChecked = (ref: any, value: any) =>
    ref.current ? ref.current.checked : value;

  const getDate = (): number => {
    if (dateRef.current && timeRef.current) {
      const date = new Date(
        `${dateRef.current.value} ${timeRef.current.value}`
      );
      console.log(date.toString());
      return date.getTime();
    }
    return Date.now();
  };

  const submitValue = () => {
    submit({
      createDate: news ? news.createDate : Date.now(),
      description: getRefValue(descriptionRef, ""),
      newsCategoryId: getRefValue(categoryRef, 0),
      publishEnabled: getRefChecked(checkActiveRef, false),
      title: getRefValue(titleRef, ""),
      creatorId: userInfo.id,
      creatorName: `${userInfo.firstName} ${userInfo.lastName} ${userInfo.middleName}`,
      publishDate: getDate(),
      id: news ? news.id : 0,
    });
    navigation("/news");
  };

  return (
    <div className={styles.add_news__conatainer}>
      <header className={styles.header_news}>
        <div className={styles.header_title}>{title}</div>
      </header>
      <div className={styles.news_form}>
        <div className={styles.news_row}>
          <select
            className={styles.news_category}
            ref={categoryRef}
            defaultValue={news ? news.newsCategoryId : 0}
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
          defaultValue={news ? news.title : ""}
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
            defaultChecked={news ? news.publishEnabled : false}
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
            onClick={() => navigation("/news")}
          >
            ОТМЕНИТЬ
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormNews;
