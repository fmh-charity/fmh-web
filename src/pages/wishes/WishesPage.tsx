import React, { useState } from "react";
import Loader from "src/components/loader/Loader";
import {
  useAddWishesMutation,
  useGetWishesQuery,
} from "src/services/api/wishesApi";
import FilterIcon from "src/assets/icons/filter.svg";
import AddIcon from "src/assets/icons/add.svg";
import SortIcon from "src/assets/icons/sort.svg";
import ModalComponent from "src/components/modalComponent/ModalComponent";
import Card from "src/components/card/Card";
import { format } from "date-fns";
import { useGetPatientByIdFromCache } from "src/hooks/useGetPatientByIdFromCache";
import { useGetUserByIdFromCache } from "src/hooks/useGetUserByIdFromCache";
import { useNavigate } from "react-router-dom";
import FormWishes from "./components/formWishes/FormWishes";
import styles from "./WishesPage.module.less";

export interface IWishes {
  createDate: number;
  creatorId: number;
  description: string;
  executorId: number;
  factExecuteDate: number | null;
  id: number;
  patientId: number;
  planExecuteDate: number;
  status: string;
  title: string;
}

export const UserName = ({ id }: { id: number }) => {
  const executor = useGetUserByIdFromCache(id);
  return (
    <span>
      {`${executor?.lastName} ${executor?.firstName} ${executor?.middleName}`}
    </span>
  );
};

export const PatientName = ({ id }: { id: number }) => {
  const patient = useGetPatientByIdFromCache(id);
  return (
    <span>
      {`${patient?.lastName} ${patient?.firstName} ${patient?.middleName}`}
    </span>
  );
};

const WishesNode = ({ data }: { data: IWishes[] }) => {
  const navigate = useNavigate();

  return data!.length > 0 ? (
    <div className={styles.wishes_page__container}>
      {data?.map((wish) => (
        <Card
          key={wish.id}
          title={{ key: "Тема", value: wish.title }}
          callback={() => navigate(`/wishes/view/${wish.id}`)}
          rows={[
            {
              key: "Пациент",
              value: <PatientName id={wish.patientId} />,
            },
            {
              key: "Исполнитель",
              value: <UserName id={wish.executorId} />,
            },
            {
              key: "Плановая дата",
              value: format(wish.planExecuteDate, "dd.MM.yyyy"),
            },
          ]}
        />
      ))}
    </div>
  ) : (
    <h1>Заявок на данный момент нет</h1>
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
