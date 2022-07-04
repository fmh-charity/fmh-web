import React, { useState } from "react";
import ClaimsCard from "src/pages/claims/components/claimsCard/ClaimsCard";
import Loader from "src/components/loader/Loader";
import {
  useAddClaimsMutation,
  useGetClaimsQuery,
} from "src/services/api/claimsApi";
import FilterIcon from "src/assets/icons/filter.svg";
import AddIcon from "src/assets/icons/add.svg";
import SortIcon from "src/assets/icons/sort.svg";
import ModalComponent from "src/components/modalComponent/ModalComponent";
import styles from "./ClaimsPage.module.less";
import FormClaims from "./components/formClaims/FormClaims";

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
  const [visibleAddClaim, setVisibleAddClaim] = useState(false);
  const [addClaim] = useAddClaimsMutation();
  const newClaim: IClaims = {
    createDate: Date.now(),
    creatorId: 0,
    creatorName: "",
    description: "",
    executorId: 0,
    executorName: "",
    factExecuteDate: null,
    id: 0,
    planExecuteDate: Date.now(),
    status: "",
    title: "",
  };
  const changeVisible = () => {
    setVisibleAddClaim(!visibleAddClaim);
  };

  return (
    <div>
      <header className={styles.claims_page__claims}>
        <div className={styles.claims_page__header_title}>Заявки</div>
        <div className={styles.claims_page__header_icons}>
          <button type="button" onClick={changeVisible}>
            <AddIcon />
          </button>
          {/* <Link to="/claims/add">
            <AddIcon />
          </Link> */}
          <FilterIcon />
          <SortIcon />
        </div>
      </header>
      {isLoading ? <Loader /> : <ClaimsNode data={claims || []} />}
      <ModalComponent visible={visibleAddClaim} setVisible={changeVisible}>
        <FormClaims
          claims={newClaim}
          titlePage="Создание заявки"
          submit={addClaim}
          cancelButton={changeVisible}
        />
      </ModalComponent>
    </div>
  );
};

export default ClaimsPage;
