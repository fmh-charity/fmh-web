import { useRouteLoaderData } from "react-router-dom";
import { Menu } from "../menu";
import { footerMenu, menu } from "../menu/menuItems";
import styles from "./index.module.less";
import type { UserInfoDto } from "../../api/model";
import { getRoleByRank } from "../../common/roles";

export const MenuMobile = ({ close }: { close: () => void }) => {
  const data = useRouteLoaderData("app") as UserInfoDto;

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div className={styles.overlay} onClick={close}></div>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <img src="/images/avatar_mock.png" alt="avatar" />
          <div>
            <div className={styles.name}>
              {data?.firstName} {data?.lastName}
            </div>
            <div className={styles.roles}>
              {data?.roles ? (
                <div>{getRoleByRank(data?.roles)?.roleName}</div>
              ) : null}
            </div>
          </div>
        </div>
        <div className={styles.separator} />
        <Menu items={menu} close={close} />
        <Menu items={footerMenu} close={close} />
      </div>
    </>
  );
};
