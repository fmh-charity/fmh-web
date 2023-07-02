import { Outlet } from "react-router-dom";
import { Sidebar } from "../menu";
import { Header } from "../header";
import styles from "./index.module.less";

export const Root: React.FC = () => {
  return (
    <>
      <Sidebar />
      <Header />
      <div className={styles.root}>
        <div className={styles.wrapper}>
          <div className={styles.outlet}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
