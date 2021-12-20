import React, { useState } from "react";
import StatementHead from "../../statement-head/StatementHead";
import styles from "./styles.module.css";
import edit_icon from "../../assets/Icons/edit_icon.svg";
import add_comment from "../../assets/Icons/add_comment.svg";
import staff from "../../assets/Icons/staff.svg";
import arrow_left from "../../assets/Icons/arrow_left.svg";
import status_processing from "../../assets/Icons/status_processing.svg";
import StatementComment from "../../statement-comment/StatementComment";
import CreateCommentForm from "../../statement-commentForms/ui/CreateCommentForm";
import Modal from '../modal/Modal';


const StatementModals = ({ onClick }) => {
  const [openComment, setOpenComment] = useState(false);

  const toggleCreateComment = () => {
    setOpenComment(!openComment);
  };

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <p className={styles.text}>Тема</p>
        <p className={styles.text}>субботник</p>
      </div>
      <StatementHead />
      <span className={styles.status}>В работе</span>
      <div className={styles.block}>
        Нужно собрать коллектив в переговорной. Обсудим подготовку к новогодним праздникам.
      </div>
      <StatementHead />
      <div className={styles.wrap}>
        <div className={styles.inner}>
          <StatementComment />
          <div className={styles.add_comment}>
            <input
              className={styles.input_comment}
              type="text"
              placeholder="Добавить комментарий"
            />
            <img
              src={add_comment}
              alt=""
              style={{ cursor: "pointer" }}
              onClick={toggleCreateComment}
            />
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <img src={arrow_left} alt="" className={styles.icon} onClick={onClick} />
        <img src={staff} alt="" className={styles.icon} />
        <img src={status_processing} alt="" className={styles.icon} />
        <img src={edit_icon} alt="" className={styles.icon} />
      </div>
      {openComment && 
        <Modal>
            <CreateCommentForm cancelComment={toggleCreateComment} />
        </Modal>
      }
    </section>
  );
};

export default StatementModals;
