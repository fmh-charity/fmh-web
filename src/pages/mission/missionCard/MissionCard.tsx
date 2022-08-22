import React, { useState } from "react";
import LeafIcon from "src/assets/icons/leaf.svg";
import ArrowDownIcon from "src/assets/icons/arrow-down.svg";
import styles from "./MissionCard.module.less";

export interface IMissionCard {
  color: string;
  title: string;
  description: string;
  author?: string;
}

const MissionCard = ({ card }: { card: IMissionCard }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.mission_card__wrapper}>
      <div className={styles.mission_card__icons_wrapper}>
        <LeafIcon />
        <ArrowDownIcon onClick={() => setOpen(!open)} />
      </div>
      <div
        className={styles.mission_card__title}
        style={{ backgroundColor: card.color }}
      >
        {card.title}
      </div>
      {open && (
        <div>
          <div className={styles.mission_card__description}>
            {card.description}
          </div>
          {card.author && (
            <div className={styles.mission_card__description}>
              {card.author}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MissionCard;
