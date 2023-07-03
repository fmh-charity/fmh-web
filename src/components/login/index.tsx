import { useFetcher, useLoaderData } from "react-router-dom";
import { SplitComponent, SplitLeft } from "../split-component";
import styles from "./index.module.less";
import { Input } from "../input";
import { Button } from "../button";
import { Icon } from "../icon";
import { ButtonLink } from "../button-link";

export const Login = () => {
  const redirectTo = useLoaderData() as string;
  const fetcher = useFetcher();

  return (
    <SplitComponent
      left={<SplitLeft />}
      right={
        <div className={styles.login}>
          <fetcher.Form method="POST">
            <div className={styles.welcome}>Добро пожаловать</div>
            <div className={styles.description}>
              Войдите или зарегистрируйтесь
            </div>
            <div className={styles.form}>
              <Input
                type="text"
                name="login"
                label="Логин"
                defaultValue="login1"
                error={fetcher.data?.login}
                placeholder="Email"
              />
              <Input
                type="password"
                name="password"
                label="Пароль"
                defaultValue="password1"
                error={fetcher.data?.password}
                placeholder="Пароль"
              />
            </div>
            <div className={styles.controls}>
              <div className={styles.button}>
                <Button
                  intent="primary"
                  type="submit"
                  justify="center"
                  disabled={fetcher.state === "submitting"}
                >
                  Войти
                </Button>
              </div>
              <div className={styles.separator}>
                <div className={styles.line} />
                <Icon.Heart16 />
                <div className={styles.line} />
              </div>

              <div className={styles.button}>
                <ButtonLink
                  to="/registration"
                  intent="secondary"
                  justify="center"
                >
                  Регистрация
                </ButtonLink>
              </div>
            </div>
            <input type="hidden" name="redirectTo" defaultValue={redirectTo} />
          </fetcher.Form>
        </div>
      }
    />
  );
};
