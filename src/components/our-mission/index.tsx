import React from "react";
import clsx from "clsx";

import styles from "./index.module.less";
import { Icon } from "../icon";

import type { IAuthor, IPhrase } from "./mock-data";

import { phrases } from "./mock-data";


const Author = ({
   author
   }: {
     author: IAuthor
   }) => {

  const { name, gender } = author;
  const isMan = gender === "male";

  return (
    <div className={ styles.card__author }>
      {
      isMan ?
      <img  src="/images/mission_author-man.png" alt="author-man" />
      :
      <img  src="/images/mission_author-woman.png" alt="author-woman" />
      }
      <span>
        { name }
      </span>
    </div>

  );
};

const MissionCard =({
  content,
  currentOpenedCardId,
  isMobile,
  toggleCardOnHover,
  toggleCard,
}:{
    content:IPhrase,
    currentOpenedCardId: string | null,
    isMobile:boolean,
    toggleCardOnHover: (id:string | null) => void,
    toggleCard: (event:React.MouseEvent<HTMLButtonElement>, id:string | null) => void,
}) => {

    const { id,title,body } = content;
    const isCardOpen = id === currentOpenedCardId;
    const headerStyle = isCardOpen ? styles["card__header_opened-card"] : styles["card__header_closed-card"];

   return (
        <div className={ styles.card }
          onMouseEnter={() => toggleCardOnHover(id)}
          onMouseLeave={() => toggleCardOnHover(null)}
        >
          <header className={ clsx(styles.card__header, headerStyle) }>
                <div className={ styles.card__headerContent }>
                  <h4>{ title.phrase }</h4>
                  { title.author && <Author author={ title.author } /> }
                </div>
                 {
                 isMobile &&
                  <button
                  className={ styles["card__toggle-btn"] }
                  type="button"
                  onClick={(event) => toggleCard(event,id)}>
                     { isCardOpen ? <Icon.Up16 /> : <Icon.Down16 /> }
                  </button>
                  }
          </header>
          {
          isCardOpen &&
          <p className={ styles.card__phrase }>
                { body.phrase }
          </p>
          }
        </div>
    );
};

const MissionCardsList = () => {
  const [ currentOpenedCardId, setCurrentOpenedCardId ] = React.useState<string | null>(null);
  const [ isMobile, setIsMobile ] = React.useState(document.documentElement.clientWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(document.documentElement.clientWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleCardOnHover = (id:string | null) => {
    if (!isMobile) {
      setCurrentOpenedCardId(id);
    }
  };

  const toggleCard = (event: React.MouseEvent<HTMLButtonElement>,id:string | null) =>{
   event.preventDefault();
    if(isMobile){
    setCurrentOpenedCardId(currentOpenedCardId === id ? null : id);
    }
  };

    return (
        <div className={ styles.mission__cards }>
         {
            phrases.map((phrase) => {
             return (
                <MissionCard
                key={ phrase.id }
                content={ phrase }
                currentOpenedCardId={ currentOpenedCardId }
                isMobile={ isMobile }
                toggleCardOnHover={ toggleCardOnHover }
                toggleCard={ toggleCard }
            />
             );
            })
         }
        </div>
    );
};

export const OurMission = () => {

    return(
        <div className={ styles.mission }>
          <img className={ styles.mission__image } src="/images/mission.png" alt="doctors" />
          <h2 className={ styles.mission__title }>Главное - жить любя</h2>
          <MissionCardsList/>
        </div>
    );
};
