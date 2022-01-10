import React from "react";
import styles from "./styles.module.css";

const ModalOverlay = ({ closeModal }) => {
  return <section className={styles.body} onClick={() => closeModal()}></section>;
};
export default ModalOverlay;
