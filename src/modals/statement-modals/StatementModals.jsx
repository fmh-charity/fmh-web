import React, { useState } from "react";
import StatementHead from "../../statementPage/statement-head/StatementHead";
import styles from "./styles.module.css";
import edit_icon from "../../assets/Icons/edit_icon.svg";
import add_comment from "../../assets/Icons/add_comment.svg";
import staff from "../../assets/Icons/staff.svg";
import arrow_left from "../../assets/Icons/arrow_left.svg";
import status_processing from "../../assets/Icons/status_processing.svg";
import StatementComment from "../../statementPage/statement-comment/StatementComment";
import CreateCommentForm from "../../statementPage/statement-commentForms/ui/CreateCommentForm";
import Modal from "../modal/Modal";

import useRepository from "../edit-statement-modals/repository";

import StaffWindow from "./StaffWindow";
import StatusWindow from "./StatusWindow";

const StatementModals = ({ claim, closeModal }) => {
  const [openComment, setOpenComment] = useState(false);
  const [staffOpen, setStaffOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  const [, methods] = useRepository();

  const toggleCreateComment = () => {
    setOpenComment(!openComment);
  };

  const toggleStaff = () => {
    setStaffOpen(!staffOpen);
  };

  const toggleStatus = () => {
    setStatusOpen(!statusOpen);
  };

  return (
    <section className={styles.section}>
      {claim ? (
        <>
          <div className={styles.wrapper}>
            <p className={styles.text}>Тема</p>
            <p className={styles.text}>{claim.title}</p>
          </div>
          <StatementHead
            date={claim.planExecuteDate}
            personName={claim.executorName}
            dateNotation="Плановая дата"
            personNotation="Исполнитель"
          />
          <span className={styles.status}>В работе</span>
          <div className={styles.block}>{claim.description}</div>
          <StatementHead
            date={claim.createDate}
            personName={claim.creatorName}
            dateNotation="Создана"
            personNotation="Автор"
          />
          <div className={styles.wrap}>
            <div className={styles.inner}>
              <StatementComment />
              <div className={styles.add_comment}>
                <div className={styles.input_comment}>Добавить комментарий</div>
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
            <img src={arrow_left} alt="" className={styles.icon} onClick={closeModal} />
            <div className={styles.staff_icon}>
              <img src={staff} alt="" className={styles.icon} onClick={toggleStaff} />
              {staffOpen && <StaffWindow />}
            </div>
            <div className={styles.status_icon}>
              <img src={status_processing} alt="" className={styles.icon} onClick={toggleStatus} />
              {statusOpen && <StatusWindow />}
            </div>
            <img
              src={edit_icon}
              alt=""
              className={styles.icon}
              onClick={() => methods.openModal(claim)}
            />
          </div>
          {openComment && (
            <Modal>
              <CreateCommentForm cancelComment={toggleCreateComment} claimId={claim.id} />
            </Modal>
          )}
        </>
      ) : (
        <div>Nothing here</div>
      )}
    </section>
  );
};

export default StatementModals;
