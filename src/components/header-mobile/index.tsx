import { useRoutes } from "react-router-dom";
import { Icon } from "../icon";
import styles from "./index.module.less";
import { headerRoutes } from "../header";
import { useState } from "react";
import { MenuMobile } from "../menu-mobile";

export const HeaderMobile = () => {
  const [open, setOpen] = useState(false);
  const routes = useRoutes(headerRoutes);
  return (
    <div className={styles.header}>
      <button onClick={() => setOpen((c) => !c)}>
        <Icon.Menu24 />
      </button>
      <div className={styles.routes}>{routes}</div>
      <button>
        <Icon.Notificatons24 />
      </button>
      {open && <MenuMobile close={() => setOpen(false)} />}
    </div>
  );
};
