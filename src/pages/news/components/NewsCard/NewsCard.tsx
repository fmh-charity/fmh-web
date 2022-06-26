import React, { FC } from "react";
import format from "date-fns/format";
import fromUnixTime from "date-fns/fromUnixTime";
import deleteIcon from "src/assets/icons/delete.png";
import EditIcon from "src/assets/icons/edit_icon.svg";
import { categories } from "src/common/categories";
import { INews } from "src/pages/news/NewsPage";
import { useDeleteNewsMutation } from "src/services/api/newsApi";
import styles from "./NewsCard.module.less";

const News: FC<INews> = ({
  id,
  title,
  description,
  newsCategoryId,
  publishDate,
}) => {
  const [delNewsMutation] = useDeleteNewsMutation();

  return (
    <div className={styles.news_card}>
      <div className={styles.news_card_head}>
        <div>{categories[newsCategoryId - 1]?.img}</div>
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
        <img
          src={deleteIcon}
          alt="delete cion"
          onClick={() => delNewsMutation(id)}
          role="presentation"
        />
      </div>
    </div>
  );
};

export default News;
