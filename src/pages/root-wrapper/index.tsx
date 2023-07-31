import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/menu";
import { Header } from "../../components/header";
import styles from "./index.module.less";

export const RoorWrapper = () => {
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
