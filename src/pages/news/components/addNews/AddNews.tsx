import React from "react";
import Button from "src/components/ui/button/Button";
import styles from "./AddNews.module.less";

const AddNews = () => (
  <div className={styles.add_news__conatainer}>
    <header className={styles.header_news}>
      <div className={styles.header_title}>Создание новости</div>
    </header>
    <div className={styles.news_form}>
      <div className={styles.news_row}>
        <select className={styles.news_category}>
          <option value="option">option</option>
        </select>
        <div className={styles.news_date}>
          <input type="date" />
        </div>
        <div className={styles.news_time}>
          <input type="time" />
        </div>
      </div>
      <input type="text" className={styles.news_name} placeholder="name" />
      <textarea className={styles.news_description} />
      <div className={styles.news_activity}>
        <span>Не активна</span>
        <input type="checkbox" className={styles.news_cb} />
      </div>
      <div className={styles.news_controls}>
        <Button onClick={() => console.log("click")}>button</Button>
        <Button onClick={() => console.log("click")}>button</Button>
      </div>
    </div>
  </div>
);

export default AddNews;
