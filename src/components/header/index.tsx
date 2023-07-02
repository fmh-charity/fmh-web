import { Link } from "react-router-dom";
import { Icon } from "../icon";
import styles from "./index.module.less";

export const Header = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.column}>Section</div>
        <div className={styles.column}>
          <Icon.Notificatons24 />
        </div>
        <div className={styles.column}>
          <img src="/images/avatar_mock.png" alt="avatar" />
        </div>
        <div className={styles.column}>
          <div>name</div>
          <div>roles</div>
        </div>
        <div className={styles.column}>
          <Link to="/logout" className={styles.column}>
            <Icon.User24 />
          </Link>
        </div>
      </div>
    </div>
  );
};
