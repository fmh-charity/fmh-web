import React, { ReactElement } from "react";
import Loader from "src/components/loader/Loader";
import {
  useAddClaimsMutation,
  useGetClaimsQuery,
} from "src/services/api/claimsApi";
import FilterIcon from "src/assets/icons/filter.svg";
import AddIcon from "src/assets/icons/add.svg";
import SortIcon from "src/assets/icons/sort.svg";
import ClaimsNode from "src/pages/claims/components/claimNode/ClaimNode";
import Modal from "src/components/modal/Modal";
import styles from "./ClaimsPage.module.less";
import FormClaims from "./components/formClaims/FormClaims";

const ClaimsPage = () => {
  const { isLoading, data: claims } = useGetClaimsQuery();
  const [addClaim] = useAddClaimsMutation();

  const formClaim = ({
    changeVisible,
  }: {
    changeVisible: () => void;
  }): ReactElement => (
    <FormClaims
      claims={null}
      titlePage="Создание заявки"
      submit={addClaim}
      cancelButton={changeVisible}
    />
  );

  return (
    <Modal modal={formClaim}>
      {({ changeVisible }) => (
        <div>
          <header className={styles.claims_page__claims}>
            <div className={styles.claims_page__header_title}>Заявки</div>
            <div className={styles.claims_page__header_icons}>
              <button type="button" onClick={changeVisible}>
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
          {isLoading ? <Loader /> : <ClaimsNode data={claims || []} />}
        </div>
      )}
    </Modal>
  );
};

export default ClaimsPage;
