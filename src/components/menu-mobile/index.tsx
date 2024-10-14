import { NavLink, useRouteLoaderData } from "react-router-dom";
import { Menu } from "../menu";
import { footerMenu, menu } from "../menu/menuItems";
import styles from "./index.module.less";
import type { UserInfoDto } from "../../api/model";
import { getRoleByRank } from "../../common/roles";
import { Icon } from "../icon";

export const MenuMobile = ({ close }: { close: () => void }) => {
  const data = useRouteLoaderData("app") as UserInfoDto;

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div className={styles.overlay} onClick={close} />
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <NavLink to="/profile" onClick={close} className={styles.profile}>
            <img src="/images/avatar_mock.png" alt="avatar" width='40px'/>
            <div className={styles.rows}>
              <div className={styles.name}>
                {data?.firstName} {data?.lastName}
              </div>
              <div className={styles.roles}>
                {data?.roles ? (
                  <div className={styles.columns}>
                    {getRoleByRank(data?.roles)?.roleName}{" "}
                    <Icon.Right24 width={10} />
                  </div>
                ) : null}
              </div>
            </div>
          </NavLink>
        </div>
        <div className={styles.separator} />
        <div className={styles.body}>
          <Menu items={menu} close={close} />
          <Menu items={footerMenu} close={close} />
        </div>
      </div>
    </>
  );
};
