import React from "react";
import style from "./main.module.css";
const Main = () => {
  return (
    <div className={style.main}>
      <div className={style.content}></div>
      <div className={style.description}>
        <p className={style.description_p}>Здесь пока нет ни одной заявки.</p>
        <p className={style.description_p}>
          Обновите список,
          <br /> либо создайте новую.
        </p>
      </div>
    </div>
  );
};

export default Main;
