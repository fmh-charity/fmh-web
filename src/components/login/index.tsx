import { Link, useFetcher, useLoaderData } from "react-router-dom";
import { SplitComponent, SplitLeft } from "../split-component";
import styles from "./index.module.less";
import { Input } from "../input";
import { Button } from "../button";
import { Icon } from "../icon";

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
            <Input
              type="text"
              name="login"
              label="Логин"
              defaultValue="login1"
              error={fetcher.data?.login}
            />
            <Input
              type="text"
              name="password"
              label="Пароль"
              defaultValue="password1"
              error={fetcher.data?.password}
            />
            <Button type="submit" disabled={fetcher.state === "submitting"}>
              Войти
            </Button>
            <div className={styles.separator}>
              <div className={styles.line} />
              <Icon.Heart16 />
              <div className={styles.line} />
            </div>
            <div>
              <Link to="/registration">Зарегистрироваться</Link> |{" "}
              <Link to="/passwordReset">Сбросить пароль</Link>
            </div>
            <div>{JSON.stringify(fetcher.data)}</div>
            <input type="hidden" name="redirectTo" defaultValue={redirectTo} />
          </fetcher.Form>
        </div>
      }
    />
  );
};
