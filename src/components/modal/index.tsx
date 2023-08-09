/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import styles from "./index.module.less";

export const Modal = ({
    title,
    toggleModal,
  }: {
    title: string;
    toggleModal: () => void;
  }) => {
    const modalRef = React.useRef<HTMLDivElement>(null);

    const handleWindowClick = (event: React.MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        toggleModal();
      }
    };

    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      <div className={styles.modal} onClick={handleWindowClick}>
        <div className={styles.modal__window} ref={modalRef}>
          <button className={styles["modal__close-button"]} onClick={toggleModal}>
            &#10005;
          </button>
          <span>{title}</span>
        </div>
      </div>
    );
  };
