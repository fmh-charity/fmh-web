import { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./styles.module.css";

import ModalOverlay from "../modalOverlay/ModalOverlay";

const modalRoot = document.getElementById("modals");

const Modal = ({ children, closeModal }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return document.removeEventListener("keydown", handleEsc);
  }, [closeModal]);

  return ReactDOM.createPortal(
    <section className={styles.modal}>
      <ModalOverlay closeModal={closeModal} />
      <section className={styles.body}>{children}</section>
    </section>,
    modalRoot,
  );
};

export default Modal;
