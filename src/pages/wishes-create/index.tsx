import { Link, useLoaderData } from "react-router-dom";
import type {
  PatientByStatusRs,
  UserShortInfoDto,
  WishDto,
} from "../../api/model";
import { WishesFormCreate } from "../../components/wishes-form-create";
import styles from "./index.module.less";

export const WishesCreate = () => {
  const { wish, patients, users } = useLoaderData() as {
    wish: { body: WishDto };
    patients: { body: PatientByStatusRs[] };
    users: { body: UserShortInfoDto[] };
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <span>Новая просьба</span>
      </div>
      <div className={styles.form}>
        <WishesFormCreate
          wish={wish.body}
          patients={patients.body}
          users={users.body}
        />
      </div>
    </div>
  );
};
