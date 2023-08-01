import { Link, useNavigate, useRoutes } from "react-router-dom";
import { Icon } from "../icon";
import styles from "./index.module.less";
import { headerRoutes } from "../header";
import { useCallback, useState } from "react";
import { MenuMobile } from "../menu-mobile";

export const HeaderMobile = () => {
  const [open, setOpen] = useState(false);
  const routes = useRoutes(headerRoutes);
  const navigate = useNavigate();
  const close = useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <div className={styles.header}>
      <button onClick={() => setOpen((c) => !c)}>
        <Icon.Menu24 />
      </button>
      <div className={styles.routes}>
        <Link to="/profile">{routes}</Link>
      </div>
      <button onClick={() => navigate("/logout")}>
        <Icon.Notificatons24 />
      </button>
      {open && <MenuMobile close={close} />}
    </div>
  );
};
