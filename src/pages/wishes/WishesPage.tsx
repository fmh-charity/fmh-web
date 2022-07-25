import React, { ReactElement, useContext } from "react";
import Loader from "src/components/loader/Loader";
import {
  useAddWishesMutation,
  useGetWishesQuery,
} from "src/services/api/wishesApi";
import FilterIcon from "src/assets/icons/filter.svg";
import AddIcon from "src/assets/icons/add.svg";
import SortIcon from "src/assets/icons/sort.svg";
import WishesNode from "src/pages/wishes/components/wishesNode/WishesNode";
import Modal, { ModalContext } from "src/components/modal/Modal";
import FormWishes from "./components/formWishes/FormWishes";
import styles from "./WishesPage.module.less";

const BodyWish = (): ReactElement => {
  const { isLoading, data: wishes } = useGetWishesQuery();
  const changeVisibleContext = useContext(ModalContext);

  return (
    <div>
      <header className={styles.wishes_page__wishes}>
        <div className={styles.wishes_page__header_title}>Просьбы</div>
        <div className={styles.wishes_page__header_icons}>
          <button type="button" onClick={() => changeVisibleContext?.()}>
            <AddIcon />
          </button>
          <FilterIcon />
          <SortIcon />
        </div>
      </header>
      {isLoading ? <Loader /> : <WishesNode data={wishes || []} />}
    </div>
  );
};

const FormWish = (): ReactElement => {
  const changeVisibleContext = useContext(ModalContext);
  const [addWishes] = useAddWishesMutation();

  return (
    <FormWishes
      propWish={null}
      titlePage="Создание просьбы"
      submit={addWishes}
      cancelButton={changeVisibleContext}
    />
  );
};

const WishesPage = () => {
  return (
    <Modal modal={<FormWish />}>
      <BodyWish />
    </Modal>
  );
};

export default WishesPage;
