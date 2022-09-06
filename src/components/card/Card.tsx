import React, { ReactElement, ReactNode, useContext } from "react";
import Arrow from "src/assets/icons/arrow.svg";
import ViewClaims from "src/pages/claims/components/viewClaimCard/ViewClaims";
import ViewWihes from "src/pages/wishes/components/viewWishesCard/ViewWihes";
import Modal, { ModalContext } from "src/components/modal/Modal";
import styles from "./Card.module.less";

const ViewComp = () => {
  const changeVisible = useContext(ModalContext);
  return (
    <button
      type="button"
      className={styles.card__button}
      onClick={() => changeVisible?.()}
    >
      <Arrow />
    </button>
  );
};

const Card = ({
  id,
  title,
  rows,
  View,
}: {
  id: number;
  title: { key: string; value: string };
  rows: { key: string; value: string | ReactNode }[];
  View: typeof ViewClaims | typeof ViewWihes;
}) => {
  return (
    <section className={styles.card__container}>
      <div className={styles.card__head}>
        <span>{title.key}</span>
        <span title={title.value}>{title.value}</span>
      </div>
      {rows.map((row) => (
        <div key={row.key} className={styles.card__row}>
          <span>{row.key}</span>
          <span>{row.value}</span>
        </div>
      ))}
      <Modal modal={<View id={id} />}>
        <ViewComp />
      </Modal>
    </section>
  );
};

export default Card;
