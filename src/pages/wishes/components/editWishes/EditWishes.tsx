import React from "react";
import StatusIcon from "src/assets/icons/status_processing.svg";
import StaffIcon from "src/assets/icons/staff.svg";
import EditIcon from "src/assets/icons/edit_icon.svg";
import ArrowLeftIcon from "src/assets/icons/arrow_left.svg";
import { Link } from "react-router-dom";
import styles from "./ViewWishes.module.less";

const EditWishes = () => (
  <div className={styles.edit_wishes__container}>
    <header className={styles.edit_wishes__page_header}>
      <div className={styles.edit_wishes__header_title}>Заявки</div>
    </header>
    <div className={styles.edit_wishes__wrapper}>
      <div className={styles.edit_wishes__header}>
        <span>Тема</span>
        <span>Тут будет тема</span>
      </div>
      <div className={styles.edit_wishes__wrapper_content}>
        <div className={`${styles.edit_wishes__row} ${styles.two_columns}`}>
          <span className={styles.underline}>Исполнитель</span>
          <span>Исполнитель</span>
        </div>
        <div className={`${styles.edit_wishes__row} ${styles.two_columns}`}>
          <span className={styles.underline}>Плановая дата</span>
          <span>Плановая дата</span>
        </div>
        <div className={`${styles.edit_wishes__row} ${styles.just_center}`}>
          Статус (в работе)
        </div>
        <div className={`${styles.edit_wishes__description}`}>Oписание</div>
        <div className={`${styles.edit_wishes__row} ${styles.two_columns}`}>
          <span className={styles.underline}>Aвтор</span>
          <span>ФИО</span>
        </div>
        <div className={`${styles.edit_wishes__row} ${styles.two_columns}`}>
          <span className={styles.underline}>Создана</span>
          <span>23.12.2222</span>
        </div>
        <div className={styles.edit_wishes__comments}>Коменты</div>
      </div>
      <div className={styles.edit_wishes__icons}>
        <Link to="/wishes">
          <ArrowLeftIcon />
        </Link>
        <StaffIcon />
        <StatusIcon />
        <EditIcon />
      </div>
    </div>
  </div>
);

export default EditWishes;
