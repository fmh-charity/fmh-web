import React from "react";
import style from "./news.module.css";

const News = () => {
  return (
    <div className={style.news}>
      <div className={style.content}></div>
      <div className={style.description}>
        <p className={style.description_p}>
          Здесь нет <br /> ни одной новости.
        </p>
      </div>
    </div>
  );
};

export default News;
