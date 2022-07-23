import React, { ReactElement, useState } from "react";
import Loader from "src/components/loader/Loader";
import {
  useAddWishesMutation,
  useGetWishesQuery,
} from "src/services/api/wishesApi";
import FilterIcon from "src/assets/icons/filter.svg";
import AddIcon from "src/assets/icons/add.svg";
import SortIcon from "src/assets/icons/sort.svg";
import WishesNode from "src/pages/wishes/components/wishesNode/WishesNode";
import Modal from "src/components/modal/Modal";
import FormWishes from "./components/formWishes/FormWishes";
import styles from "./WishesPage.module.less";

const WishesPage = () => {
  const { isLoading, data: wishes } = useGetWishesQuery();
  const [addWishes] = useAddWishesMutation();

  const formWish = ({
    changeVisible,
  }: {
    changeVisible: () => void;
  }): ReactElement => (
    <FormWishes
      propWish={null}
      titlePage="Создание просьбы"
      submit={addWishes}
      cancelButton={changeVisible}
    />
  );

  return (
    <Modal modal={formWish}>
      {({ changeVisible }) => (
        <div>
          <header className={styles.wishes_page__wishes}>
            <div className={styles.wishes_page__header_title}>Просьбы</div>
            <div className={styles.wishes_page__header_icons}>
              <button type="button" onClick={changeVisible}>
                <AddIcon />
              </button>
              <FilterIcon />
              <SortIcon />
            </div>
          </header>
          {isLoading ? <Loader /> : <WishesNode data={wishes || []} />}
        </div>
      )}
    </Modal>
  );
};

export default WishesPage;
