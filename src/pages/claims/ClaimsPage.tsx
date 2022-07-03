import React from "react";
import ClaimsCard from "src/pages/claims/components/claimsCard/ClaimsCard";
import Loader from "src/components/loader/Loader";
import { useGetClaimsQuery } from "src/services/api/claimsApi";
import { Link } from "react-router-dom";
import FilterIcon from "src/assets/icons/filter.svg";
import AddIcon from "src/assets/icons/add.svg";
import SortIcon from "src/assets/icons/sort.svg";
import styles from "./ClaimsPage.module.less";

export interface IClaims {
  createDate: number;
  creatorId: number;
  creatorName: string;
  description: string;
  executorId: number;
  executorName: string;
  factExecuteDate: number | null;
  id: number;
  planExecuteDate: number;
  status: string;
  title: string;
}

const ClaimsNode = ({ data }: { data: IClaims[] }) =>
  data!.length > 0 ? (
    <div className={styles.claims_page__container}>
      {data?.map((claim) => (
        <ClaimsCard
          key={claim.id}
          id={claim.id}
          title={claim.title}
          planExecuteDate={claim.planExecuteDate}
          executorName={claim.executorName}
        />
      ))}
    </div>
  ) : (
    <h1>Заявок на данный момент нет</h1>
  );

const ClaimsPage = () => {
  const { isLoading, data: claims } = useGetClaimsQuery();

  return (
    <div>
      <header className={styles.claims_page__claims}>
        <div className={styles.claims_page__header_title}>Заявки</div>
        <div className={styles.claims_page__header_icons}>
          <Link to="/claims/add">
            <AddIcon />
          </Link>
          <FilterIcon />
          <SortIcon />
        </div>
      </header>
      {isLoading ? <Loader /> : <ClaimsNode data={claims || []} />}
    </div>
  );
};

export default ClaimsPage;
