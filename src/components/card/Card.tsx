import React, { FC, useState } from "react";
import styles from "./styles.module.less";

export interface ICard {
  title: string;
  planExecuteDate: string;
  executorName: string;
}

const Card: FC<ICard> = ({ title, planExecuteDate, executorName }) => {
  const [openModal, setOpenModal] = useState(false);
  const arrow = "../../assets/icons/arrow.svg";

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <p className={styles.text}>Тема</p>
        <p className={styles.text}>{title}</p>
      </div>
      <div>
        date={planExecuteDate}
        personName={executorName}
        dateNotation=&quotПлановая дата&quot
        personNotation=&quotИсполнитель&quot
      </div>
      <button
        type="button"
        className={styles.button}
        onClick={() => setOpenModal(!openModal)}
      >
        <img src={arrow} alt="arrow" />
      </button>
      {/* {openModal && (
        <Modal visible={openModal} setVisible={() => setOpenModal(!openModal)}>
          <h1>MODAL</h1>
        </Modal>
      )} */}
    </section>
  );
};

export default Card;
