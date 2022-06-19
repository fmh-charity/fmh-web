import React, { FC } from "react";
import format from "date-fns/format";
import fromUnixTime from "date-fns/fromUnixTime";
import iconId1 from "src/assets/categoryIcons/iconId1.png";
import iconId2 from "src/assets/categoryIcons/iconId2.png";
import iconId3 from "src/assets/categoryIcons/iconId3.png";
import iconId4 from "src/assets/categoryIcons/iconId4.png";
import iconId5 from "src/assets/categoryIcons/iconId5.png";
import iconId6 from "src/assets/categoryIcons/iconId6.png";
import iconId7 from "src/assets/categoryIcons/iconId7.png";
import iconId8 from "src/assets/categoryIcons/iconId8.png";
import deleteIcon from "src/assets/icons/delete.png";
import EditIcon from "src/assets/icons/edit_icon.svg";
import styles from "./NewsCard.module.less";
import { INews } from "../../NewsPage";

const iconMap = [
  <img src={iconId1} alt="test" />,
  <img src={iconId2} alt="test" />,
  <img src={iconId3} alt="test" />,
  <img src={iconId4} alt="test" />,
  <img src={iconId5} alt="test" />,
  <img src={iconId6} alt="test" />,
  <img src={iconId7} alt="test" />,
  <img src={iconId8} alt="test" />,
];

const News: FC<INews> = ({
  title,
  description,
  newsCategoryId,
  publishDate,
}) => (
  <div className={styles.news_card}>
    <div className={styles.news_card_head}>
      <div>{iconMap[newsCategoryId - 1]}</div>
      <div className={styles.news_card_head_title}>{title}</div>
      <div className={styles.news_card_head_date}>
        {format(fromUnixTime(publishDate), "dd.MM.yyyy")}
      </div>
    </div>
    <div className={styles.news_card_content}>
      <span>{description}</span>
    </div>
    <div className={styles.news_card_footer}>
      <EditIcon />
      <img src={deleteIcon} alt="delete cion" />
    </div>
  </div>
);

export default News;
