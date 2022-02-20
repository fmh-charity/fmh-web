import React, { useEffect } from "react";
import styles from "./styles.module.css";
import cn from "classnames";

import useRepository from "../repository";
import useEditRepository from "../../modals/edit-statement-modals/repository";

import Statement from "../statement/Statement";
import Modal from "../../modals/modal/Modal";
import CreateStatement from "../../modals/edit-statement-modals/ui/CreateStatement";

import filter from "../../assets/Icons/filter.png";
import info from "../../assets/Icons/infon.png";
import add_comment from "../../assets/Icons/add_comment.svg";
import roll_up from "../../assets/Icons/roll_up.svg";
import Filter from "../../modals/statement-modals/filter/Filter";

const StatementPage = (props) => {
  const [{ openFilterModal, claims }, methods] = useRepository();
  const [{ openEdit }, editMethods] = useEditRepository();

  useEffect(() => {
    methods.getClaims();
  }, []);

  return (
    <section className={styles.main}>
      <div className={styles.head}>
        <h1 className={styles.header}>Заявки</h1>
        <div className={styles.block}>
          {/* 
           <img src={info} alt="" className={styles.icon} /> 
           */}
          <img
            src={filter}
            alt=""
            title="Фильтр"
            className={cn(styles.icon, props.filter)}
            onClick={() => methods.openFilterModal()}
          />
          <img
            src={add_comment}
            alt=""
            className={styles.icon}
            title="Создать заявку"
            onClick={() => editMethods.openModal()}
          />
          <img src={roll_up} alt="" className={cn(styles.icon_rollUp, props.rollup)} />
        </div>
      </div>
      <section className={styles.body}>
        <p className={styles.all_statement} onClick={() => methods.getClaims()}>
          все заявки
        </p>
        <div className={styles.wrapper}>
          {claims && claims.map((claim) => <Statement key={claim.id} claim={claim} />)}
        </div>
      </section>
      {openEdit && (
        <Modal closeModal={editMethods.closeModal}>
          <CreateStatement />
        </Modal>
      )}
      {openFilterModal && (
        <Modal closeModal={methods.closeModal}>
          <Filter />
        </Modal>
      )}
    </section>
  );
};
export default StatementPage;
