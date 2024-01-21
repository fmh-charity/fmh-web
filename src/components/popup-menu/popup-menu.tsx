import Popup from "reactjs-popup";
import clsx from "clsx";
import styles from "./popup-menu.module.less";
import { useRef } from "react";
import { Icon } from "../icon";
import "reactjs-popup/dist/index.css";

interface PopupMenuItem {
  label: string | React.ReactElement
  onClick: () => void
}

interface PopupMenuProps {
  items: PopupMenuItem[]
  trigger?: React.ReactElement
}

export const PopupMenu = ({ items, trigger }: PopupMenuProps) => {
  const ref = useRef<any>();
  const onItemClick = (item: PopupMenuItem) => {
    item.onClick();
    ref.current.close();
  };

  return (
    <Popup
      className={styles.root}
      ref={ref}
      trigger={<div className="menu-item">{trigger || <Icon.ActionDefault24 />}</div>}
      position="bottom right"
      on="click"
      closeOnDocumentClick
      mouseLeaveDelay={300}
      mouseEnterDelay={0}
      contentStyle={{ padding: "0px", border: "none" }}
      arrow={false}
    >
      <div className={clsx("menu", styles.menu)}>
        {items?.map((item, i) => <button className={clsx("menu-item", styles.menuItem)} key={i} onClick={() => onItemClick(item)}>{item.label}</button>)}
      </div>
    </Popup>
  );
};
