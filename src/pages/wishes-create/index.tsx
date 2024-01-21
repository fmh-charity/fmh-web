import { useLoaderData } from "react-router-dom";
import type {
  PatientByStatusRs,
  UserShortInfoDto,
  WishDto,
} from "../../api/model";
import { WishesFormCreate } from "../../components/wishes-form-create";
import styles from "./index.module.less";
import { Card } from "../../components/card";

export const WishesCreate = () => {
  const { wish, patients, users } = useLoaderData() as {
    wish: { body: WishDto };
    patients: { body: PatientByStatusRs[] };
    users: { body: UserShortInfoDto[] };
  };

  return (
    <section className={styles.root}>
      <Card title="Новая просьба">
        <div className={styles.formContainer}>
          <WishesFormCreate
            wish={wish.body}
            patients={patients.body}
            users={users.body}
          />
        </div>
      </Card>
    </section>
  );
};
