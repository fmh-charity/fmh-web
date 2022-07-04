import React, { ReactNode } from "react";
import styles from "./ModalComponent.module.less";

const ModalComponent = ({
  children,
  visible,
  setVisible,
}: {
  children: ReactNode;
  visible: boolean;
  setVisible: () => void;
}) => {
  const rootClasses = [styles.myModal];

  if (visible) {
    rootClasses.push(styles.active);
  }

  return (
    <div
      role="presentation"
      className={rootClasses.join(" ")}
      onClick={setVisible}
    >
      <div
        role="presentation"
        className={styles.myModalContent}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalComponent;
