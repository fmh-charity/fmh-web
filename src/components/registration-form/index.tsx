import { Link, useFetcher } from "react-router-dom";
import { APP_ROLES } from "../../common/roles";
import { SplitComponent } from "../split-component";
import styles from "./index.module.less";
import { Input } from "../input";
import { Button } from "../button";
import { useState } from "react";
import classNames from "classnames";
import clsx from "clsx";

export const RegistrationForm = () => {
  const fetcher = useFetcher();

  const [step, setStep] = useState(1);

  return (
    <SplitComponent
      right={
        <div className={styles.registration}>
          <fetcher.Form method="POST">
            <div className={styles.welcome}>Регистрация</div>
            <div style={{ textAlign: "center" }}>
              <div
                className={clsx(
                  styles["step-circle"],
                  styles[`${step === 1 ? "active-circle" : ""}`]
                )}
              >
                1
              </div>
              <div className={styles.line} />
              <div
                className={clsx(
                  styles["step-circle"],
                  styles[`${step === 2 ? "active-circle" : ""}`]
                )}
              >
                2
              </div>
            </div>
            <div
              className={classNames(
                styles.step,
                step !== 1 ? styles.hidden : undefined
              )}
            >
              <div style={{ overflow: "hidden" }}>
                <div>Выбор роли*</div>
                <select
                  name="roleIds"
                  defaultValue="6"
                  style={{ height: "48px" }}
                >
                  {APP_ROLES.map((role) => (
                    <option
                      key={role.id}
                      value={role.id}
                    >{`${role.roleName}`}</option>
                  ))}
                </select>
              </div>
              <div>
                <Input
                  type="text"
                  defaultValue=""
                  name="email"
                  label="Логин"
                  error={""}
                  placeholder="Email"
                />
              </div>
              <div>
                <Input
                  type="password"
                  defaultValue=""
                  name="password"
                  label="Пароль"
                  error=""
                  placeholder="Введите пароль"
                />
              </div>
              <div>
                <Input
                  type="password"
                  defaultValue=""
                  name="passwordConfirm"
                  label="Подтверждение пароля"
                  error=""
                  placeholder="Введите подтверждение пароля"
                />
              </div>
              <div className={styles.button}>
                <Button
                  intent="primary"
                  justify="center"
                  type="button"
                  onClick={() => setStep(2)}
                >
                  Продолжить регистрацию
                </Button>
              </div>
              <div className={styles.gotoLogin}>
                <span>Уже есть эккаунт?</span> <Link to="/login">Войти</Link>
              </div>
              <div>{JSON.stringify(fetcher.data)}</div>
            </div>
            <div
              className={classNames(
                styles.step,
                step !== 2 ? styles.hidden : undefined
              )}
            >
              <div>
                <Input
                  type="text"
                  defaultValue=""
                  name="firstName"
                  label="Имя"
                  error=""
                  placeholder="Введите имя"
                />
              </div>
              <div>
                <Input
                  type="text"
                  defaultValue=""
                  name="lastName"
                  label="Фамилия"
                  error=""
                  placeholder="Введите фамилию"
                />
              </div>
              <div>
                <Input
                  type="text"
                  defaultValue=""
                  name="middleName"
                  label="Отчество"
                  error=""
                  placeholder="Введите отчество"
                />
              </div>
              <div>
                <Input
                  type="date"
                  defaultValue=""
                  name="dateOfBirth"
                  label="Дата рождения"
                  error=""
                  placeholder="Введите фамилию"
                />
              </div>
              <div className={styles.buttons}>
                <div className={styles.button}>
                  <Button
                    intent="secondary"
                    justify="center"
                    type="button"
                    onClick={() => setStep(1)}
                  >
                    Назад
                  </Button>
                </div>
                <div className={styles.button}>
                  <Button
                    intent="primary"
                    justify="center"
                    type="submit"
                    onClick={() => setStep(2)}
                  >
                    Зарегистрироваться
                  </Button>
                </div>
              </div>
              <div className={styles.gotoLogin}>
                <span>
                  Нажимая «Зарегистрироваться» вы соглашаетесь с{" "}
                  <Link to="/">
                    политикой конфиденциальности и пользовательским соглашением
                  </Link>
                </span>
              </div>
              <div>{JSON.stringify(fetcher.data)}</div>
            </div>
          </fetcher.Form>
        </div>
      }
    />
  );
};
