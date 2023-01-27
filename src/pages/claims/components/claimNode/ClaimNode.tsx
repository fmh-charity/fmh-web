import { useState } from "react";
import { IClaim, IClaimPagination } from "src/model/IClaim";
import Card from "src/components/card/Card";
import ViewClaims from "src/pages/claims/components/viewClaimCard/ViewClaims";
import { format } from "date-fns";
import React from "react";
import styles from "./ClaimNode.module.less";
import InfoIcon from "src/assets/icons/info.svg";
import ArrowUpIcon from "src/assets/icons/arrow_up.svg";
import ArrowDown from "src/assets/icons/arrow-down.svg";
import AddIcon from "src/assets/icons/add.svg";

const ClaimsNode = ({ data }: { data: IClaim[] }) => {
  const [toogleArrow, setToogle] = useState(false);
  const handleToogle = () => {
    setToogle(!toogleArrow)
  }
  return (data.length > 0 ? (
    <div>
      <div className={styles.claims_page__header_container}>
        <div className={styles.claims_page__header}>Заявки</div>
        <div className={styles.claims_page__header_icons}>
          <button className={styles.claims_page__header_icon} type="button" onClick={() => console.log("Информация")}>
            <InfoIcon />
          </button>
          <button className={styles.claims_page__header_icon} type="button" onClick={() => console.log("Раскрытие списка")}>
            <AddIcon />
          </button>
          {toogleArrow ? <button type="button" onClick={handleToogle}>
            <ArrowDown />
          </button> :
            <button type="button" onClick={handleToogle}>
              <ArrowUpIcon />
            </button>
          }
        </div>
      </div>
      <div className={toogleArrow ? styles.news_claims_close : styles.news_claims_open}>
        <div className={styles.news_claims__description}>ВСЕ ЗАЯВКИ</div>
        <div className={styles.claims_page__container}>
          {data?.map((claim) => (
            <Card
              key={claim.id}
              id={claim.id}
              title={{ key: "тема", value: claim.title }}
              View={ViewClaims}
              rows={[
                { key: "исполнитель", value: claim.executorName || "Не назначен" },
                {
                  key: "плановая дата",
                  value: format(claim.planExecuteDate, "dd.MM.yyyy"),
                },
              ]}
            />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <h1>Заявок на данный момент нет</h1>
  )
  )
}
export default ClaimsNode;
