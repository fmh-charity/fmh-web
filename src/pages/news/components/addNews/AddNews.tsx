import React, { useCallback } from "react";
import format from "date-fns/format";
import { useSelector } from "react-redux";
import { selectUserInfo } from "src/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useAddNewsMutation } from "src/services/api/newsApi";
import { categories } from "src/common/categories";
import styles from "./AddNews.module.less";

export interface NewsPost {
  createDate: number;
  creatorId: number;
  creatorName: string;
  description: string | undefined;
  newsCategoryId: number;
  publishDate: number;
  publishEnabled: boolean | undefined;
  title: string | undefined;
}

const AddNews = () => {
  const navigateion = useNavigate();
  const userInfo = useSelector(selectUserInfo);
  const categoryRef = React.createRef<HTMLSelectElement>();
  const dateRef = React.createRef<HTMLInputElement>();
  const timeRef = React.createRef<HTMLInputElement>();
  const titleRef = React.createRef<HTMLInputElement>();
  const descriptionRef = React.createRef<HTMLTextAreaElement>();
  const checkActiveRef = React.createRef<HTMLInputElement>();
  const [addNews] = useAddNewsMutation();

  const getPublishDate = (): number => {
    if (dateRef.current?.value && timeRef.current?.value) {
      const date: Date = new Date(dateRef.current?.value);
      const s = timeRef.current.value.split(":");
      if (s[0] && s[1]) {
        date.setHours(parseInt(s[0], 10));
        date.setMinutes(parseInt(s[1], 10));

        return date.getTime();
      }
    }
    return 0;
  };

  const submitNews = useCallback(() => {
    const newsPost: NewsPost = {
      createDate: Date.now(),
      description: descriptionRef.current?.value,
      newsCategoryId: categoryRef.current?.value
        ? parseInt(categoryRef.current?.value, 10)
        : 0,
      publishEnabled: checkActiveRef.current?.checked,
      title: titleRef.current?.value,
      creatorId: userInfo.id,
      creatorName: `${userInfo.firstName} ${userInfo.lastName} ${userInfo.middleName}`,
      publishDate: getPublishDate(),
    };

    addNews(newsPost);
    navigateion("/news");
  }, []);

  return (
    <div className={styles.add_news__conatainer}>
      <header className={styles.header_news}>
        <div className={styles.header_title}>Создание новости</div>
      </header>
      <div className={styles.news_form}>
        <div className={styles.news_row}>
          <select className={styles.news_category} ref={categoryRef}>
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
            />
          </div>
          <div className={styles.news_time}>
            <input type="time" ref={timeRef} />
          </div>
        </div>
        <input
          className={styles.news_category}
          type="text"
          placeholder="Заголовок"
          ref={titleRef}
          minLength={3}
        />
        <textarea
          className={styles.news_description}
          placeholder="Описание"
          ref={descriptionRef}
          minLength={5}
        />
        <div className={styles.news_activity}>
          <span>Не активна</span>
          <input
            type="checkbox"
            className={styles.news_cb}
            ref={checkActiveRef}
          />
        </div>
        <div className={styles.news_controls}>
          <button
            type="button"
            className={`${styles.news_add__button} ${styles.news_add__button_save}`}
            onClick={submitNews}
          >
            СОХРАНИТЬ
          </button>
          <button
            type="button"
            className={styles.news_add__button}
            onClick={() => navigateion("/news")}
          >
            ОТМЕНИТЬ
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNews;
