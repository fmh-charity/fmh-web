import React from "react";
import Card from "src/components/card/Card";
import Loader from "src/components/loader/Loader";
import useFetching from "src/hooks/useFetching";

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
  const { isLoading, error, items } = useFetching<IClaims>(
    "Claims",
    "/fmh/claims"
  );

  return (
    <div>
      {error ? `<h1>${error}</h1>` : <h1>Claims</h1>}
      {isLoading ? (
        <Loader />
      ) : (
        items.map((claim) => (
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
