import React from "react";
import MissionCard from "src/pages/mission/missionCard/MissionCard";
import { cards } from "src/pages/mission/cards";
import styles from "./MissionPage.module.less";

const MissionPage = () => (
  <div className={styles.missions_root}>
    <header className={styles.missions_header}>
      <div className={styles.header_title}>Главное - жить любя</div>
    </header>
    <div className={styles.missions_cards_wrapper}>
      {cards.map((card) => (
        <MissionCard key={card.title} card={card} />
      ))}
    </div>
  </div>
);

export default MissionPage;
