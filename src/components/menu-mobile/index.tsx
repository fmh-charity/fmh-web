import { Sidebar } from "../menu";
import styles from "./index.module.less";

export const MenuMobile = ({ close }: { close: () => void }) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className={styles.menu} onClick={close}>
      <Sidebar />
    </div>
  );
};
