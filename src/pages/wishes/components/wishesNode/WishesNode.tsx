import Card from "src/components/card/Card";
import { format } from "date-fns";
import React from "react";
import { IWishPagination } from "src/model/IWish";
import ViewWishes from "src/pages/wishes/components/viewWishesCard/ViewWihes";
import { PatientName, UserName } from "src/utils/GetNames";
import styles from "./WishesNode.module.less";

const WishesNode = ({ data }: { data: IWishPagination }) =>
  data!.pages > 0 ? (
    <div className={styles.wishes_page__container}>
      {data.elements?.map((wish) => (
        <Card
          key={wish.id}
          id={wish.id}
          title={{ key: "Тема", value: wish.title }}
          View={ViewWishes}
          rows={[
            {
              key: "Пациент",
              value: <PatientName id={wish.patientId} />,
            },
            {
              key: "Исполнитель",
              value: wish.executorId ? (
                <UserName id={wish.executorId} />
              ) : (
                "Не назначен"
              ),
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

export default WishesNode;
