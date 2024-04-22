import React from "react";
import { Link, useFetcher } from "react-router-dom";
import { APP_ROLES } from "../../common/roles";
import { SplitComponent } from "../split-component";
import styles from "./index.module.less";
import { Input } from "../input";
import { Button } from "../button";
import classNames from "classnames";
import clsx from "clsx";
import { assertObjectBySchema } from "../../common/utils";
import {
  сheckPasswordsEquality,
  registrationSchemaStepOne,
} from "../../validation/registration";
import {
  HINT_DATE,
  HINT_EMAIL,
  HINT_NAME,
  HINT_PASSWORD,
} from "../../validation/hints";
import { Modal } from "../modal";

type TFieldOneStep = "password" | "passwordConfirm" | "email" | "roleIds";

interface StepOneState {
  role: string;
  email: string;
  password: string;
  passwordConfirm: string;
  validationErrors: { [key: string]: string };
}

interface IFormState {
  step: number;
  dataStepOne: StepOneState;
}

type TAction =
  | { type: "UPDATE_STEP_ONE_FIELD"; field: TFieldOneStep; value: string }
  | { type: "SET_STEP_ONE_ERRORS"; errors: { [key: string]: string } }
  | { type: "SET_STEP"; step: number };

const initialState: IFormState = {
  step: 1,
  dataStepOne: {
    role: "6",
    email: "",
    password: "",
    passwordConfirm: "",
    validationErrors: {},
  },
};

const reducer = (state: IFormState, action: TAction): IFormState => {
  switch (action.type) {
    case "UPDATE_STEP_ONE_FIELD":
      return {
        ...state,
        dataStepOne: { ...state.dataStepOne, [action.field]: action.value },
      };
    case "SET_STEP_ONE_ERRORS":
      return {
        ...state,
        dataStepOne: { ...state.dataStepOne, validationErrors: action.errors },
      };
    case "SET_STEP":
      return { ...state, step: action.step };
    default:
      return state;
  }
};

export const RegistrationForm = () => {
  const [isOpenedModal, setIsOpenedModal] = React.useState(false);
  const fetcher = useFetcher();
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { step, dataStepOne } = state;

  React.useEffect(() => {
    if (fetcher.data?.body !== undefined) {
      setIsOpenedModal(true);
    }
  }, [fetcher.data]);

  const toggleModal = () => {
    setIsOpenedModal(false);
  };
  const validateForm = (): { [key: string]: string } | null => {
    const formData = {
      roleIds: [parseInt(dataStepOne.role as string, 10)],
      email: dataStepOne.email,
      password: dataStepOne.password,
    };

    const errorsStepOne = assertObjectBySchema(
      formData,
      registrationSchemaStepOne
    );
    const passwordsEqualityError = сheckPasswordsEquality({
      password: dataStepOne.password,
      passwordConfirm: dataStepOne.passwordConfirm,
    });

    if (errorsStepOne || passwordsEqualityError) {
      return {
        ...(errorsStepOne || {}),
        ...(passwordsEqualityError || {}),
      };
    }

    return null;
  };

  const setErrorsStepOne = (errors: { [key: string]: string } | null): void => {
    if (errors) {
      dispatch({ type: "SET_STEP_ONE_ERRORS", errors });
    } else {
      dispatch({ type: "SET_STEP_ONE_ERRORS", errors: {} });
      dispatch({ type: "SET_STEP", step: 2 });
    }
  };

  const handleContinue = (): void => {
    const errors = validateForm();
    setErrorsStepOne(errors);
  };

  const onChangeField = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
    field: TFieldOneStep
  ): void => {
    const value = e.target.value;
    dispatch({
      type: "UPDATE_STEP_ONE_FIELD",
      field,
      value,
    });
    dispatch({
      type: "SET_STEP_ONE_ERRORS",
      errors: {
        ...state.dataStepOne.validationErrors,
        [field]: "",
      },
    });
  };

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
                step !== 1 ? styles.hidden : ""
              )}
            >
              <div style={{ overflow: "hidden" }}>
                <div>Выбор роли*</div>
                <select
                  className={styles.roles}
                  name="roleIds"
                  defaultValue="6"
                  style={{ height: "48px" }}
                  onChange={(e) => onChangeField(e, "roleIds")}
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
                  error={dataStepOne.validationErrors?.email}
                  hint={HINT_EMAIL}
                  placeholder="Email"
                  onChange={(e) => onChangeField(e, "email")}
                />
              </div>
              <div>
                <Input
                  type="password"
                  defaultValue=""
                  name="password"
                  label="Пароль"
                  error={dataStepOne.validationErrors?.password}
                  hint={HINT_PASSWORD}
                  placeholder="Введите пароль"
                  onChange={(e) => onChangeField(e, "password")}
                />
              </div>
              <div>
                <Input
                  type="password"
                  defaultValue=""
                  name="passwordConfirm"
                  label="Подтверждение пароля"
                  error={dataStepOne.validationErrors?.passwordConfirm}
                  hint={HINT_PASSWORD}
                  placeholder="Введите подтверждение пароля"
                  onChange={(e) => onChangeField(e, "passwordConfirm")}
                />
              </div>
              <div className={styles.button}>
                <Button
                  intent="primary"
                  justify="center"
                  type="button"
                  onClick={handleContinue}
                >
                  Продолжить регистрацию
                </Button>
              </div>
              <div className={styles.gotoLogin}>
                <span>Уже есть аккаунт?</span> <Link to="/login">Войти</Link>
              </div>
              <div>{JSON.stringify(fetcher.data)}</div>
            </div>
            <div
              className={classNames(
                styles.step,
                step !== 2 ? styles.hidden : ""
              )}
            >
              <div>
                <Input
                  type="text"
                  defaultValue=""
                  name="firstName"
                  label="Имя"
                  error={fetcher.data?.errors?.firstName}
                  hint={HINT_NAME}
                  placeholder="Введите имя"
                />
              </div>
              <div>
                <Input
                  type="text"
                  defaultValue=""
                  name="lastName"
                  label="Фамилия"
                  error={fetcher.data?.errors?.lastName}
                  hint={HINT_NAME}
                  placeholder="Введите фамилию"
                />
              </div>
              <div>
                <Input
                  type="text"
                  defaultValue=""
                  name="middleName"
                  label="Отчество"
                  error={fetcher.data?.errors?.middleName}
                  hint={HINT_NAME}
                  placeholder="Введите отчество"
                />
              </div>
              <div>
                <Input
                  type="date"
                  defaultValue=""
                  max="9999-12-31"
                  name="dateOfBirth"
                  label="Дата рождения"
                  error={fetcher.data?.errors?.dateOfBirth}
                  hint={HINT_DATE}
                  placeholder="Введите дату рождения"
                />
              </div>
              <div className={styles.buttons}>
                <div className={styles.button}>
                  <Button
                    intent="secondary"
                    justify="center"
                    type="button"
                    onClick={() => dispatch({ type: "SET_STEP", step: 1 })}
                  >
                    Назад
                  </Button>
                </div>
                <div className={styles.button}>
                  <Button intent="primary" justify="center" type="submit">
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
            </div>
          </fetcher.Form>
          {isOpenedModal && (
            <Modal title={fetcher.data?.body} toggleModal={toggleModal}></Modal>
          )}
        </div>
      }
    />
  );
};
