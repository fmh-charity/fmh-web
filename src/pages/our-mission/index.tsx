import React, { useRef } from "react";
import clsx from "clsx";

import styles from "./index.module.less";
import { Icon } from "../../components/icon";

import type { IAuthor, IPhrase, ITitlePhrase } from "./mock-data";

import { phrases } from "./mock-data";
import { useResize } from "../../common/hooks";

const CardAuthor = ({ author }: { author: IAuthor }) => {
  const { name, gender } = author;
  const isMan = gender === "male";

  return (
    <div className={styles.card__author}>
      {isMan ? (
        <img src="/images/mission_author-man.png" alt="author-man" />
      ) : (
        <img src="/images/mission_author-woman.png" alt="author-woman" />
      )}
      <span>{name}</span>
    </div>
  );
};

const CardHeader = ({
  title,
  id,
  isCardOpen,
  isMobile,
  toggleCard,
}: {
  title: ITitlePhrase;
  id: string;
  isCardOpen: boolean;
  isMobile: boolean;
  toggleCard: (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string | null
  ) => void;
}) => {
  const headerStateStyles = isCardOpen
    ? styles["card__header_opened-card"]
    : styles["card__header_closed-card"];

  return (
    <header className={clsx(styles.card__header, headerStateStyles)}>
      <div className={styles.card__headerContent}>
        <h4>{title.phrase}</h4>
        {title.author && <CardAuthor author={title.author} />}
      </div>
      {isMobile && (
        <button
          className={styles["card__toggle-btn"]}
          type="button"
          onClick={(event) => toggleCard(event, id)}
        >
          {isCardOpen ? <Icon.Up16 /> : <Icon.Down16 />}
        </button>
      )}
    </header>
  );
};

const CardDescription = ({ phrase }: { phrase: string }) => {
  return <p className={styles.card__phrase}>{phrase} </p>;
};

const MissionCard = ({
  content,
  currentOpenedCardId,
  isMobile,
  toggleCard,
}: {
  content: IPhrase;
  currentOpenedCardId: string | null;
  isMobile: boolean;
  toggleCard: (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string | null
  ) => void;
}) => {
  const { id, title, body } = content;
  const isCardOpen = id === currentOpenedCardId;
  const ref = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (ref.current && isCardOpen) {
      ref.current.scrollIntoView({ block: "nearest" });
    }
  }, [isCardOpen]);

  return (
    <div className={styles.card} ref={ref}>
      <CardHeader
        title={title}
        id={id}
        isCardOpen={isCardOpen}
        isMobile={isMobile}
        toggleCard={toggleCard}
      />
      {(!isMobile || isCardOpen) && <CardDescription phrase={body.phrase} />}
    </div>
  );
};

const MissionCardsList = () => {
  const [currentOpenedCardId, setCurrentOpenedCardId] = React.useState<
    string | null
  >(null);
  const isMobile = useResize();
  const toggleCard = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string | null
  ) => {
    event.preventDefault();
    if (isMobile) {
      setCurrentOpenedCardId(currentOpenedCardId === id ? null : id);
    }
  };

  return (
    <div className={styles.mission__cards}>
      {phrases.map((phrase) => {
        return (
          <MissionCard
            key={phrase.id}
            content={phrase}
            currentOpenedCardId={currentOpenedCardId}
            isMobile={isMobile}
            toggleCard={toggleCard}
          />
        );
      })}
    </div>
  );
};

export const OurMission = () => {
  return (
    <div className={styles.mission}>
      <img
        className={styles.mission__image}
        src="/images/mission.png"
        alt="doctors"
      />
      <h2 className={styles.mission__title}>Главное - жить любя</h2>
      <MissionCardsList />
    </div>
  );
};
