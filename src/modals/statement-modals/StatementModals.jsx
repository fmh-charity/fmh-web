import React, { useState } from "react";
import StatementHead from "../../statementPage/statement-head/StatementHead";
import styles from "./styles.module.css";
import edit_icon from "../../assets/Icons/edit_icon.svg";
import add_comment from "../../assets/Icons/add_comment.svg";
import staff from "../../assets/Icons/staff.svg";
import arrow_left from "../../assets/Icons/arrow_left.svg";
import status_processing from "../../assets/Icons/status_processing.svg";
import StatementComment from "../../statementPage/statement-comment/ui/StatementComment";
import CreateCommentForm from "../../statementPage/statement-comment-form/ui/CreateCommentForm";
import Modal from "../modal/Modal";

import useRepository from "../edit-statement-modals/repository";
import useCommentRepository from "../../statementPage/statement-comment-form/repository";

import StaffWindow from "./StaffWindow";
import StatusWindow from "./StatusWindow";

const StatementModals = ({ claim, closeModal }) => {
  const [staffOpen, setStaffOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  const [, methods] = useRepository();
  const [{ openEdit }, commentMethods] = useCommentRepository();

  const toggleStaff = () => {
    setStaffOpen(!staffOpen);
  };

  const toggleStatus = () => {
    setStatusOpen(!statusOpen);
  };

  return (
    claim && (
      <section className={styles.section}>
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
            <StatementComment claimId={claim.id} />
            <div className={styles.add_comment}>
              <div className={styles.input_comment}>Добавить комментарий</div>
              <img
                src={add_comment}
                alt=""
                className={styles.add_comment_btn}
                onClick={() => commentMethods.openCommentModal()}
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
        {openEdit && (
          <Modal>
            <CreateCommentForm claimId={claim.id} />
          </Modal>
        )}
      </section>
    )
  );
};

export default StatementModals;
