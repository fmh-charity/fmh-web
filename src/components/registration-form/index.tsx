import React from "react";
import type { PropsWithChildren } from "react";
import { useState } from "react";
import { Link, useFetcher } from "react-router-dom";
import { APP_ROLES } from "../../common/roles";
import { SplitComponent, SplitLeft } from "../split-component";
import styles from "./index.module.less";
import { Input } from "../input";
import { Button } from "../button";

const Step1: React.FC<PropsWithChildren & { nextStep: () => void }> = (
  props
) => {
  return (
    <div className={styles.step1}>
      <div style={{ overflow: "hidden" }}>
        <div>Выбор роли*</div>
        <select name="roleIds" defaultValue="6">
          {APP_ROLES.map((role) => (
            <option
              key={role.id}
              value={role.id}
            >{`[${role.key}] ${role.name}`}</option>
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
          onClick={() => props.nextStep()}
        >
          Продолжить регистрацию
        </Button>
      </div>
      <div className={styles.gotoLogin}>
        <span>Уже есть эккаунт?</span>
        <Link to="/login"> Войти</Link>
      </div>
    </div>
  );
};

export const RegistrationForm = () => {
  const fetcher = useFetcher();

  const [step, setStep] = useState(1);

  return (
    <SplitComponent
      left={<SplitLeft />}
      right={
        <div className={styles.registration}>
          <fetcher.Form method="POST">
            <div className={styles.welcome}>Регистрация</div>

            {step === 1 && <Step1 nextStep={() => setStep(2)} />}
            {step === 2 && (
              <div>
                step2<button onClick={() => setStep(1)}>back</button>
              </div>
            )}
          </fetcher.Form>
        </div>
      }
    />
  );
};

{
  /* <div className={styles.registration}>
<fetcher.Form method="POST">
  <div>
    <div>
      <input type="text" name="firstName" />
      <span>Имя*</span>
    </div>
    <div>
      <input type="text" name="lastName" />
      <span>Фамилия*</span>
    </div>
    <div>
      <input type="text" name="middleName" />
      <span>Отчество</span>
    </div>
    <div>
      <input type="datetime-local" name="dateOfBirth" />
      <span>Дата рождения*</span>
    </div>
    <div>
      Выбор роли*
      <select name="roleIds" defaultValue="6">
        {APP_ROLES.map((role) => (
          <option
            key={role.id}
            value={role.id}
          >{`[${role.key}] ${role.name}`}</option>
        ))}
      </select>
    </div>
    <div>
      <input type="text" name="email" />
      <span>email</span>
    </div>
    <div>
      <input
        type={showPassword ? "text" : "password"}
        name="password"
      />
      <span>Пароль</span>
    </div>
    <div>
      <input
        type={showPassword ? "text" : "password"}
        name="passwordConfirm"
      />
      <span>Подтверждение пароля</span>
    </div>
    <div>
      <button
        type="button"
        onClick={() => setShowPassword((c) => !c)}
      >
        Отображение пароля
      </button>
      {" | "}
      <button type="submit">Зарегистрироваться</button>
    </div>
    <div>{JSON.stringify(fetcher.data)}</div>
  </div>
</fetcher.Form>
</div> */
}
