import React, { useEffect } from "react";
import styles from "./styles.module.css";
import cn from "classnames";

import useRepository from "../repository";
import useEditRepo from "../../modals/edit-statement-modals/repository";

import Statement from "../statement/Statement";
import Modal from "../../modals/modal/Modal";
import CreateStatement from "../../modals/edit-statement-modals/ui/CreateStatement";

import filter from "../../assets/Icons/filter.png";
import infon from "../../assets/Icons/infon.png";
import add_comment from "../../assets/Icons/add_comment.svg";
import roll_up from "../../assets/Icons/roll_up.svg";

const StatementPage = (props) => {
  const [{ claims }, methods] = useRepository();
  const [{ openEdit }, editMethods] = useEditRepo();

  useEffect(() => {
    methods.getClaims();
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.head}>
        <h1 className={styles.header}>Заявки</h1>
        <div className={styles.block}>
          <img src={infon} alt="" className={styles.icon} />
          <img src={filter} alt="" className={cn(styles.icon, props.filter)} />
          <img
            src={add_comment}
            alt=""
            className={styles.icon}
            onClick={() => editMethods.openModal()}
          />
          <img src={roll_up} alt="" className={cn(styles.icon_rollUp, props.rollup)} />
        </div>
      </div>
      <section className={styles.body}>
        <p className={styles.all_statement}>все заявки</p>
        <div className={styles.wrapper}>
          {claims && claims.map((claim) => <Statement key={claim.id} claim={claim} />)}
        </div>
      </section>
      {openEdit && (
        <Modal closeModal={editMethods.closeModal}>
          <CreateStatement isOpen={openEdit} closeModal={editMethods.closeModal} />
        </Modal>
      )}
    </main>
  );
};
export default StatementPage;
