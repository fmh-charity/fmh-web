import React from "react";
import Card from "src/components/card/Card";
import Loader from "src/components/loader/Loader";
import { useGetClaimsQuery } from "src/services/api/claimsApi";

export interface IClaims {
  createDate: string;
  creatorId: number;
  creatorName: string;
  description: string;
  executorId: number;
  executorName: string;
  factExecuteDate: string;
  id: number;
  planExecuteDate: string;
  status: string;
  title: string;
}

const ClaimsPage = () => {
  const { isLoading, data } = useGetClaimsQuery();

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        data?.map((claim) => (
          <Card
            key={claim.id}
            title={claim.title}
            planExecuteDate={claim.planExecuteDate}
            executorName={claim.executorName}
          />
        ))
      )}
    </div>
  );
};

export default ClaimsPage;
