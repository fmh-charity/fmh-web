import React, { useRef, useState } from "react";
import clsx from "clsx";
import styles from "./index.module.less";

export type TabType = {
  id: number;
  title: string;
  counter: number;
  onClick: () => any;
};

export const Tab: React.FC<{
  tab: TabType;
  selected: number;
  onClick: () => any;
}> = ({ tab, selected, onClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <button
      className={clsx({
        [styles.button]: true,
        [styles.active]: tab.id === selected,
      })}
      onClick={() => {
        tab.onClick();
        onClick();
        if (ref.current) ref.current.scrollIntoView({ block: "nearest" });
      }}
    >
      <div className={styles.tab} ref={ref}>
        <div className={styles.title}>{tab.title}</div>
        <div className={styles.counter}>{tab.counter}</div>
      </div>
    </button>
  );
};

export const Tabs: React.FC<{ tabs: TabType[] }> = ({ tabs }) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0].id);

  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          tab={tab}
          selected={selectedTab}
          onClick={() => setSelectedTab(tab.id)}
        />
      ))}
    </div>
  );
};
