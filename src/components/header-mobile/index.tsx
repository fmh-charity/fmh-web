import { Link, useNavigate, useRoutes } from "react-router-dom";
import { Icon } from "../icon";
import styles from "./index.module.less";
import { headerRoutes } from "../header";
import { useCallback, useState } from "react";
import { MenuMobile } from "../menu-mobile";
import clsx from "clsx";
import { PopupMenu } from "../popup-menu/popup-menu";

const menuItems = [
  {
    label: (
      <>
        <Icon.Change16 />
        <Link to="/logout" className={clsx(styles.link)}>
          <p>Выйти</p>
        </Link>
      </>
    ),
    onClick: () => {},
  },
];

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
      <div className={styles.routes}>{routes}</div>
      <PopupMenu
        items={menuItems}
        trigger={
          <div className={clsx("menu-item", styles.menuIcon)}>
            {<Icon.ActionDefault24White />}
          </div>
        }
      />
      {open && <MenuMobile close={close} />}
    </div>
  );
};
