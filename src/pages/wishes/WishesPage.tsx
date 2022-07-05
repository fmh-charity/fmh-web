import React, { useState } from "react";
import WishesCard from "src/pages/wishes/components/wishesCard/WishesCard";
import Loader from "src/components/loader/Loader";
import {
  useAddWishesMutation,
  useGetWishesQuery,
} from "src/services/api/wishesApi";
import FilterIcon from "src/assets/icons/filter.svg";
import AddIcon from "src/assets/icons/add.svg";
import SortIcon from "src/assets/icons/sort.svg";
import ModalComponent from "src/components/modalComponent/ModalComponent";
import { useGetPatientsQuery } from "src/services/api/patientApi";
import styles from "./WishesPage.module.less";
import FormWishes from "./components/formWishes/FormWishes";

export interface IWishes {
  createDate: number;
  creatorId: number;
  description: string;
  executorId: number;
  factExecuteDate: number | null;
  id: number;
  executorName: string;
  patientId: number;
  planExecuteDate: number;
  status: string;
  title: string;
}

const WishesNode = ({ data }: { data: IWishes[] }) => {
  useGetPatientsQuery();

  return data!.length > 0 ? (
    <div className={styles.wishes_page__container}>
      {data?.map((wishes) => (
        <WishesCard
          key={wishes.id}
          id={wishes.id}
          patientId={wishes.patientId}
          title={wishes.title}
          planExecuteDate={wishes.planExecuteDate}
          executorName={wishes.executorName}
        />
      ))}
    </div>
  ) : (
    <h1>Просьб на данный момент нет</h1>
  );
};

const WishesPage = () => {
  const { isLoading, data: wishes } = useGetWishesQuery();
  const [visibleAddWishes, setVisibleAddWishes] = useState(false);
  const [addWishes] = useAddWishesMutation();
  const newWishes: IWishes = {
    createDate: Date.now(),
    creatorId: 0,
    patientId: 1,
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
    setVisibleAddWishes(!visibleAddWishes);
  };

  return (
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
      <ModalComponent visible={visibleAddWishes} setVisible={changeVisible}>
        <FormWishes
          wishes={newWishes}
          titlePage="Создание просьбы"
          submit={addWishes}
          cancelButton={changeVisible}
        />
      </ModalComponent>
    </div>
  );
};

export default WishesPage;
