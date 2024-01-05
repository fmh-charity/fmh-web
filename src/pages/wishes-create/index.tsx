import { useLoaderData } from "react-router-dom";
import type {
  PatientByStatusRs,
  UserShortInfoDto,
  WishDto,
} from "../../api/model";
import { WishesFormCreate } from "../../components/wishes-form-create";
import styles from "./index.module.less";
import { Card } from "../../components/card";
import { useOpenModal } from "../../hooks/useOpenModal";
import { CreateWishSuccessful } from "../../modals/create-wish-successful/create-wish-successful";

export const WishesCreate = () => {
  const { wish, patients, users } = useLoaderData() as {
    wish: { body: WishDto };
    patients: { body: PatientByStatusRs[] };
    users: { body: UserShortInfoDto[] };
  };
  const openModal = useOpenModal();

  return (
    <section className={styles.root}>
      <Card title="Новая просьба">
        <div className={styles.formContainer}>
          <WishesFormCreate
            wish={wish.body}
            patients={patients.body}
            users={users.body}
          />
          <button onClick={() => openModal(CreateWishSuccessful, {})}>aasdf</button>
        </div>
      </Card>
    </section>
  );
};
