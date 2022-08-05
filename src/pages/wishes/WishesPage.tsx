import React, { useContext } from "react";
import {
  useAddWishesMutation,
  useGetWishesQuery,
} from "src/services/api/wishesApi";
import FilterIcon from "src/assets/icons/filter.svg";
import AddIcon from "src/assets/icons/add.svg";
import SortIcon from "src/assets/icons/sort.svg";
import WishesNode from "src/pages/wishes/components/wishesNode/WishesNode";
import Modal, { ModalContext } from "src/components/modal/Modal";
import PaginateComponent from "src/components/paginateComponent/PaginateComponent";
import FormWishes from "./components/formWishes/FormWishes";
import styles from "./WishesPage.module.less";

const WishesPageComp = () => {
  const changeVisible = useContext(ModalContext);
  return (
    <div className={styles.wishes_page__wrapper}>
      <header className={styles.wishes_page__wishes}>
        <div className={styles.wishes_page__header_title}>Просьбы</div>
        <div className={styles.wishes_page__header_icons}>
          <button type="button" onClick={() => changeVisible?.()}>
            <AddIcon />
          </button>
          <button type="button" onClick={() => console.log("Сортировка")}>
            <SortIcon />
          </button>
          <button type="button" onClick={() => console.log("Фильтр")}>
            <FilterIcon />
          </button>
        </div>
      </header>
      <PaginateComponent useQuery={useGetWishesQuery} CardNode={WishesNode} />
    </div>
  );
};

const FormWishesComp = () => {
  const [addWishes] = useAddWishesMutation();
  const changeVisible = useContext(ModalContext);
  return (
    <FormWishes
      propWish={null}
      titlePage="Создание просьбы"
      submit={addWishes}
      cancelButton={() => changeVisible?.()}
    />
  );
};

const WishesPage = () => (
  <Modal modal={<FormWishesComp />}>
    <WishesPageComp />
  </Modal>
);

export default WishesPage;
