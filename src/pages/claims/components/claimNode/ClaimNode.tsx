import { IClaim, IClaimPagination } from "src/model/IClaim";
import Card from "src/components/card/Card";
import ViewClaims from "src/pages/claims/components/viewClaimCard/ViewClaims";
import { format } from "date-fns";
import React from "react";
import styles from "./ClaimNode.module.less";

const ClaimsNode = ({ data }: { data: IClaim[] }) =>
  data.length > 0 ? (
    <div>
      <div className={styles.claims_page__header}>Заявки</div>
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
  ) : (
    <h1>Заявок на данный момент нет</h1>
  );

export default ClaimsNode;
