import React from "react";

type Authorization = string | null;

const MainPage = () => {
  const auth: Authorization = JSON.parse(localStorage.getItem("authorization"));
  const rq = fetch("http://localhost:8080/fmh/claims", {
    headers: { authorization: auth?.accessToken },
  }).then((res) => res.json());

  return <div>{JSON.stringify(rq)}</div>;
};

export default MainPage;
