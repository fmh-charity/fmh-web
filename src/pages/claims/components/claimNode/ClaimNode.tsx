import { IClaims } from "src/model/IClaim";
import Card from "src/components/card/Card";
import ViewClaims from "src/pages/claims/components/viewClaimCard/ViewClaims";
import { format } from "date-fns";
import React from "react";
import styles from "./ClaimNode.module.less";

const ClaimsNode = ({ data }: { data: IClaims[] }) =>
  data!.length > 0 ? (
    <div className={styles.claims_page__container}>
      {data?.map((claim) => (
        <Card
          key={claim.id}
          id={claim.id}
          title={{ key: "Тема", value: claim.title }}
          View={ViewClaims}
          rows={[
            { key: "Исполнитель", value: claim.executorName || "Не назначен" },
            {
              key: "Плановая дата",
              value: format(claim.planExecuteDate, "dd.MM.yyyy"),
            },
          ]}
        />
      ))}
    </div>
  ) : (
    <h1>Заявок на данный момент нет</h1>
  );

export default ClaimsNode;
