/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import clsx from "clsx";
import styles from "./index.module.less";

export const Modal = ({
    title,
    subtitle,
    toggleModal,
    isSuccess,
  }: {
    title: string;
    subtitle?:string
    toggleModal: () => void;
    isSuccess:boolean
  }) => {
    const modalRef = React.useRef<HTMLDivElement>(null);
    const styleTitleModal = isSuccess ? "" : styles.modal__title_error ;

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
          <div className={styles.modal__content}>
            <h4 className={clsx(styles.modal__title,styleTitleModal)}>{title}</h4>
          {subtitle && <span className={styles.modal__subtile}>{subtitle}</span>}
          </div>

        </div>
      </div>
    );
  };
