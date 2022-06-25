import React from "react";
import styles from "./AddNews.module.less";

const categories = [
  "Объявления",
  "День рождения",
  "Зарплата",
  "Профсоюз",
  "Праздник",
  "Массаж",
  "Благодарность",
  "Нужна помощь",
];

const AddNews = () => (
  <div className={styles.add_news__conatainer}>
    <header className={styles.header_news}>
      <div className={styles.header_title}>Создание новости</div>
    </header>
    <div className={styles.news_form}>
      <div className={styles.news_row}>
        <select className={styles.news_category}>
          {categories.map((category, index) => (
            <option key={category} value={index + 1}>
              {category}
            </option>
          ))}
        </select>
        <div className={styles.news_date}>
          <input type="date" />
        </div>
        <div className={styles.news_time}>
          <input type="time" />
        </div>
      </div>
      <textarea className={styles.news_description} placeholder="Описание" />
      <div className={styles.news_activity}>
        <span>Не активна</span>
        <input type="checkbox" className={styles.news_cb} />
      </div>
      <div className={styles.news_controls}>
        <button
          type="button"
          className={`${styles.news_add__button} ${styles.news_add__button_save}`}
          onClick={() => console.log("click")}
        >
          СОХРАНИТЬ
        </button>
        <button
          type="button"
          className={styles.news_add__button}
          onClick={() => console.log("click")}
        >
          ОТМЕНИТЬ
        </button>
      </div>
    </div>
  </div>
);

export default AddNews;
