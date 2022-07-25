import React, { FC, useContext, useEffect } from "react";
import format from "date-fns/format";
import deleteIcon from "src/assets/icons/delete.png";
import EditIcon from "src/assets/icons/edit_icon.svg";
import { categories } from "src/common/categories";
import { INews } from "src/model/INews";
import {
  useDeleteNewsMutation,
  useEditNewsMutation,
  useGetNewsByIdQuery,
} from "src/services/api/newsApi";
import Modal, {ModalContext} from "src/components/modal/Modal";
import FormNews from "src/pages/news/components/formNews/FormNews";
import styles from "./NewsCard.module.less";

const EditComp = ({ newsId }: { newsId: number }) => {
  const { data } = useGetNewsByIdQuery(newsId);
  const [edit] = useEditNewsMutation();

  return <FormNews news={data} title="Изменить новость" submit={edit} />;
};

const EditIconComp = () => {
  const changeVisible = useContext(ModalContext);

  return <EditIcon onClick={() => changeVisible?.()} />;
};

const News: FC<INews> = ({
  id,
  title,
  description,
  newsCategoryId,
  publishDate,
  createDate,
}) => {
  const [delNewsMutation] = useDeleteNewsMutation();
  const delNews = () => {
    const del = confirm("Вы уверены что хотите удалить новость?");
    if (del) {
      delNewsMutation(id);
    }
  };

  return (
    <div className={styles.news_card}>
      <div className={styles.news_card_head}>
        <div>{categories[newsCategoryId - 1]?.img}</div>
        <div className={styles.news_card_head_title}>{title}</div>
        <div className={styles.news_card_head_date}>
          Публикация: {format(publishDate, "dd.MM.yyyy")}
        </div>
        <div className={styles.news_card_head_date}>|</div>
        <div className={styles.news_card_head_date}>
          Создание: {format(createDate, "dd.MM.yyyy")}
        </div>
      </div>
      <div className={styles.news_card_content}>
        <span>{description}</span>
      </div>
      <div className={styles.news_card_footer}>
        <Modal modal={<EditComp newsId={id} />}>
          <EditIconComp />
        </Modal>
        <img
          src={deleteIcon}
          alt="delete cion"
          onClick={() => delNews()}
          role="presentation"
        />
      </div>
    </div>
  );
};

export default News;
