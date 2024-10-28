import { useLoaderData } from "react-router-dom";
import type {
  UserInfoDto,
} from "../../api/model";
import styles from "./index.module.less";
import { Card } from "../../components/card";
import { UsersFormCreate } from "../../components/users-form-create";

export const UsersCreate = () => {
  const { user } = useLoaderData() as {
    user: { body: UserInfoDto };
  };

  return (
    <section className={styles.root}>
      <Card title="Новый пользователь">
        <div className={styles.formContainer}>
          <UsersFormCreate
            intent="CREATE"
            user={user.body}
          />
        </div>
      </Card>
    </section>
  );
};
