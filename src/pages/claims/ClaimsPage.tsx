import React, { useContext } from "react";
import Loader from "src/components/loader/Loader";
import {
  useAddClaimsMutation,
  useGetClaimsQuery,
} from "src/services/api/claimsApi";
import FilterIcon from "src/assets/icons/filter.svg";
import AddIcon from "src/assets/icons/add.svg";
import SortIcon from "src/assets/icons/sort.svg";
import ClaimsNode from "src/pages/claims/components/claimNode/ClaimNode";
import Modal, { ModalContext } from "src/components/modal/Modal";
import PaginateComponent from "src/components/paginateComponent/PaginateComponent";
import styles from "./ClaimsPage.module.less";
import FormClaims from "./components/formClaims/FormClaims";

const ClaimsPageComp = () => {
  const changeVisible = useContext(ModalContext);
  return (
    <div className={styles.claims_page__wrapper}>
      <header className={styles.claims_page__claims}>
        <div className={styles.claims_page__header_title}>Заявки</div>
        <div className={styles.claims_page__header_icons}>
          <button type="button" onClick={() => changeVisible?.()}>
            <AddIcon />
          </button>
          <button type="button" onClick={() => console.log("Фильтр")}>
            <FilterIcon />
          </button>
          <button type="button" onClick={() => console.log("Сортировка")}>
            <SortIcon />
          </button>
        </div>
      </header>
      <PaginateComponent useQuery={useGetClaimsQuery} CardNode={ClaimsNode} />
    </div>
  );
};

const FormClaimsComp = () => {
  const [addClaim] = useAddClaimsMutation();
  const changeVisible = useContext(ModalContext);
  return (
    <FormClaims
      claims={null}
      titlePage="Создание заявки"
      submit={addClaim}
      cancelButton={() => changeVisible?.()}
    />
  );
};

const ClaimsPage = () => (
  <Modal modal={<FormClaimsComp />}>
    <ClaimsPageComp />
  </Modal>
);

export default ClaimsPage;
