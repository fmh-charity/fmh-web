import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Card from "src/components/card/Card";
import { IClaims } from "src/components/claims/Claims";
import Loader from "src/components/loader/Loader";
import AP from "src/config/ApplicationProperties";

interface Authorization {
  accessToken: string;
  refreshToken: string;
}

const MainPage = () => {
  const navigate = useNavigate();
  const response: string | null = localStorage.getItem("authorization");
  const auth: Authorization = response !== null ? JSON.parse(response) : "";
  const [claims, setClaims] = useState<IClaims[]>([]);
  const { isLoading, error } = useQuery("claims", () =>
    fetch(`${AP.PROTOCOL}://${AP.HOST}/fmh/claims`, {
      headers: { authorization: auth.accessToken },
    }).then(async (res) => {
      if (res.status === 401) {
        navigate("/login");
      } else if (!res.ok) {
        throw new Error(res.statusText);
      }
      setClaims(await res.json());
    })
  );

  return (
    <div>
      {error ? `<h1>${error}</h1>` : <h1>Claims</h1>}
      {isLoading ? (
        <Loader />
      ) : (
        claims.map((claim) => <Card key={claim.id} title={claim.title} planExecuteDate={claim.planExecuteDate} executorName={claim.executorName} />)
      )}
    </div>
  );
};

export default MainPage;
