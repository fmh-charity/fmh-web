import { Outlet } from "react-router-dom";
import { FooterMobile } from "../../components/footer-mobile";
import { HeaderMobile } from "../../components/header-mobile";
import styles from "./index.module.less";

export const RootWrapperMobile = () => {
  return (
    <div className={styles.wrapper}>
      <HeaderMobile />
      <div className={styles.content} id="content">
        <Outlet />
      </div>
      <FooterMobile />
    </div>
  );
};
