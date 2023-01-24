import React, { FC, useContext, useState } from "react";
import format from "date-fns/format";
import DeleteIcon from "src/assets/icons/Delete.svg";
import EditIcon from "src/assets/icons/edit_icon.svg";
import { categories } from "src/common/categories";
import { INews } from "src/model/INews";
import {
  useDeleteNewsMutation,
  useEditNewsMutation,
  useGetNewsByIdQuery,
} from "src/services/api/newsApi";
import Modal, { ModalContext } from "src/components/modal/Modal";
import FormNews from "src/pages/news/components/formNews/FormNews";
import ConfirmComponent from "src/components/confirmComponent/ConfirmComponent";
import styles from "./NewsCard.module.less";
import ArrowUpIcon from "src/assets/icons/arrow_up.svg";

const EditComp = ({ newsId }: { newsId: number }) => {
  const { data } = useGetNewsByIdQuery(newsId);
  const [edit] = useEditNewsMutation();

  return <FormNews news={data} title="Изменить новость" submit={edit} />;
};

const DeleteComp = ({ newsId }: { newsId: number }) => {
  const changeVisible = useContext(ModalContext);
  const [delNewsMutation] = useDeleteNewsMutation();
  const delNews = (del: boolean) => {
    if (del) {
      delNewsMutation(newsId);
    } else {
      changeVisible?.();
    }
  };

  return <ConfirmComponent callbackConfirm={delNews} text="Удалить новость?" />;
};

const EditIconComp = () => {
  const changeVisible = useContext(ModalContext);
  return <EditIcon onClick={() => changeVisible?.()} />;
};

const DeleteIconComp = () => {
  const changeVisible = useContext(ModalContext);
  return <DeleteIcon onClick={() => changeVisible?.()} />;
};

const News: FC<INews> = ({
  id,
  title,
  description,
  newsCategoryId,
  publishDate,
  createDate,
}) => {
  const [toogleArrow, setToogle] = useState(false);
  return (
    <div className={styles.news_card}>
      <div className={styles.news_card_head}>
        <div>{categories[newsCategoryId - 1]?.img}</div>
        <div className={styles.news_card_head_title}>{title}</div>
        <div className={styles.news_card_head_date}>
          {format(publishDate, "dd.MM.yyyy")}
        </div>
        <div>
          <button type="button" onClick={() => console.log("Раскрытие списка")}>
            <ArrowUpIcon />
          </button></div>
        {/* <div className={styles.news_card_head_date}>|</div>
      <div className={styles.news_card_head_date}>
        Создание: {format(createDate, "dd.MM.yyyy")}
      </div> */}
      </div>
      <div className={styles.news_card_content}>
        <span>{description}</span>
      </div>
      <div className={styles.news_card_footer}>
        <Modal modal={<EditComp newsId={id} />}>
          <EditIconComp />
        </Modal>
        <Modal modal={<DeleteComp newsId={id} />}>
          <DeleteIconComp />
        </Modal>
      </div>
    </div>
  )
};

export default News;
