import React from "react";
import PaginateComponent from "src/components/paginateComponent/PaginateComponent";
import { useGetClaimsQuery } from "src/services/api/claimsApi";
import ClaimsNode from "src/pages/claims/components/claimNode/ClaimNode";
import NewsNode from "src/pages/news/components/newsNode/NewsNode";
import { useGetNewsQuery } from "src/services/api/newsApi";
import style from "./MainPage.module.less";

const MainPage = () => (
  <div className={style.main_page__main_container}>
    <PaginateComponent useQuery={useGetNewsQuery} CardNode={NewsNode} />
    <PaginateComponent useQuery={useGetClaimsQuery} CardNode={ClaimsNode} />
  </div>
);

export default MainPage;
