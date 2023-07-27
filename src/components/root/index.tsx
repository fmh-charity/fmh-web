import { Outlet } from "react-router-dom";
import { Sidebar } from "../menu";
import { Header } from "../header";
import styles from "./index.module.less";

export const Root: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.body}>
        <Header />
        <div className={styles.content}>
          <div className={styles.outlet}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
