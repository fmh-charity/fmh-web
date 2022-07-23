import React, { ReactElement, useState } from "react";
import styles from "./ModalComponent.module.less";

const Modal = ({
  children,
  modal,
}: {
  children: ({ changeVisible }: { changeVisible: () => void }) => ReactElement;
  modal: ({ changeVisible }: { changeVisible: () => void }) => ReactElement;
}) => {
  const [visibleAddComment, setVisibleAddComment] = useState(false);
  const changeVisible = () => {
    setVisibleAddComment((currentState) => !currentState);
  };

  const rootClasses = [styles.myModal];

  if (visibleAddComment) {
    rootClasses.push(styles.active);
  }

  return (
    <>
      {children({
        changeVisible,
      })}
      <div
        role="presentation"
        className={rootClasses.join(" ")}
        onClick={changeVisible}
      >
        <div
          role="presentation"
          className={styles.myModalContent}
          onClick={(e) => e.stopPropagation()}
        >
          {visibleAddComment ? modal({ changeVisible }) : null}
        </div>
      </div>
    </>
  );
};

export default Modal;
