import React, { useState } from "react";
import StatementHead from "../statement-head/StatementHead";
import styles from "./styles.module.css";
import arrow from "../../assets/Icons/arrow.svg";
import Modal from "../../modals/modal/Modal";
import StatementModals from "../../modals/statement-modals/StatementModals";

const Statement = ({ claim }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      {claim && (
        <section className={styles.section}>
          <div className={styles.wrapper}>
            <p className={styles.text}>Тема</p>
            <p className={styles.text}>{claim.title}</p>
          </div>
          <StatementHead
            claim={claim}
            date={claim.planExecuteDate}
            personName={claim.executorName}
            dateNotation="Плановая дата"
            personNotation="Исполнитель"
          />
          <button className={styles.button} onClick={handleModal}>
            <img src={arrow} alt="" />
          </button>
          {openModal && (
            <Modal closeModal={handleModal}>
              <StatementModals closeModal={handleModal} claim={claim} />
            </Modal>
          )}
        </section>
      )}
    </>
  );
};

export default Statement;
