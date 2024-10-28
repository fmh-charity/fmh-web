import { useLoaderData } from "react-router-dom";
import type {
  PatientDto,
  UserInfoDto,
} from "../../api/model";
import styles from "./index.module.less";
import { Card } from "../../components/card";
import { UsersFormCreate } from "../../components/users-form-create";

export const UsersUpdate = () => {
  const { user } = useLoaderData() as {
    user: { body: UserInfoDto };
  };

  return (
    <section className={styles.root}>
      <Card title="Редактировать пользователя">
        <div className={styles.formContainer}>
          <UsersFormCreate
            intent="EDIT"
            user={user.body}
          />
        </div>
      </Card>
    </section>
  );
};
