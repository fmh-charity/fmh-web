import type { FormEventHandler} from "react";
import React, { useEffect, useState } from "react";
import { ScrollRestoration, useActionData, useFetcher, useNavigate, useSubmit } from "react-router-dom";
import { Input } from "../input";
import type {
  UserInfoDto,
  RegistrationRequest,
} from "../../api/model";
import dayjs from "dayjs";
import styles from "./index.module.less";
import { Button } from "../button";
import { useOpenModal } from "../../hooks/useOpenModal";
import { CreateUserSuccessful } from "../../modals/create-user-successful/create-user-successful";
import { APP_ROLES } from "../../common/roles";

console.log(Array.from(APP_ROLES).map((role) => role.id), 'roles');

interface IFormErrors {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  roleIds?: Array<number>;
//  userRoleClaim?: UserRoleClaimDto;
  admin?: boolean;
  confirmed?: boolean;
  password: string;
}

export const UsersFormCreate: React.FC<{
  user: UserInfoDto;
  intent: "CREATE" | "EDIT"
}> = (props) => {
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const openModal = useOpenModal();
  const submit = useSubmit();

  const actionData = useActionData() as { result?: any, errors?: any };

  const [ formErrors, setFormErrors ] = useState<IFormErrors>();
  const [ isInputFocused, setIsInputFocused ] = useState(false);

  useEffect(() => {
    if (actionData?.errors) {
      setFormErrors(actionData?.errors);
    }
  }, [actionData]);

  useEffect(() => {
    if (isInputFocused) {
      setFormErrors(undefined);
      setIsInputFocused(true);
    }
  }, [isInputFocused]);

  useEffect(() => {
    if (actionData?.result === "ok") {
      openModal(CreateUserSuccessful, {});
    }
  }, [actionData, openModal]);

  const resetErrors = () => {
    setFormErrors(undefined);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const errors = {
      firstName: "",
      lastName: "",
      middleName: "",
      email: "",
      password: "",
      dateOfBirth: "",
    };
    
    for (const [name,value] of data) {
      if (name === "firstName" && !value) errors.firstName = "Заполните поле";
      if (name === "lastName" && !value) errors.lastName = "Заполните поле";
      if (name === "middleName" && !value) errors.middleName = "Заполните поле";
      if (name === "dateOfBirth" && !value) errors.dateOfBirth = "Заполните поле";
      if (name === "password" && !value) errors.password = "Заполните поле";
      if (name === "email" && !value) errors.email = "Заполните поле";
      if (name === "roles" && !value) errors.email = "Заполните поле";
    }
    setFormErrors(errors);
    if (Object.values(errors).some(Boolean)) return;
    submit(e.currentTarget);
  };

  return (
    <fetcher.Form className={styles.patientForm} onSubmit={onSubmit} method="POST">
      <ScrollRestoration />

      <div className={styles.row}>
        <div className={styles.left}>
          <span className={styles.title}>Имя пользователя*</span>
        </div>
        <div className={styles.right}>
          <Input
            type="text"
            name="firstName"
            label="Имя пользователя"
            placeholder="Имя пользователя"
            error={formErrors?.firstName || ""}
            defaultValue={props.user?.firstName || ""}
            onFocus={resetErrors}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.left}>
          <span className={styles.title}>Фамилия пользователя*</span>
        </div>
        <div className={styles.right}>
          <Input
            type="text"
            name="lastName"
            label="Фамилия пользователя"
            placeholder="Фамилия пользователя"
            error={formErrors?.lastName || ""}
            defaultValue={props.user?.lastName || ""}
            onFocus={resetErrors}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.left}>
          <span className={styles.title}>Отчество пользователя*</span>
        </div>
        <div className={styles.right}>
          <Input
            type="text"
            name="middleName"
            label="Отчество пользователя"
            placeholder="Отчество пользователя"
            error={formErrors?.middleName || ""}
            defaultValue={props.user?.middleName || ""}
            onFocus={resetErrors}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.left}>
          <span className={styles.title}>E-mail пользователя*</span>
        </div>
        <div className={styles.right}>
          <Input
            type="text"
            name="email"
            label="E-mail пользователя"
            placeholder="E-mail пользователя"
            error={""}
            defaultValue={props.user?.email?.name || ""}
            onFocus={resetErrors}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.left}>
          <div className={styles.title}>Выбор роли</div>
        </div>
        <div className={styles.right}>
          <select name="roleIds" defaultValue={props?.user?.roles || 6} className={styles.roles}>
                  {Array.from(APP_ROLES).map((role) => (
                    <option
                      key={role.id}
                      value={role.id}
                    >{`${role.roleName}`}</option>
                  ))}
          </select>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.left}>
          <span className={styles.title}>Пароль пользователя*</span>
        </div>
        <div className={styles.right}>
          <Input
            type="password"
            name="password"
            label="Пароль пользователя"
            placeholder="Пароль пользователя"
            error={""}
            defaultValue={props.user?.password || ""}
            onFocus={resetErrors}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.left}>
          <span className={styles.title}>Дата рождения пользователя*</span>
        </div>
        <div className={styles.right}>
          <Input
            type="date"
            name="dateOfBirth"
            label="Дата рождения пользователя"
            placeholder="Дата рождения пользователя"
            error={""}
            max="9999-12-31"
            defaultValue={props.user?.dateOfBirth || ""}
            onFocus={resetErrors}
          />
        </div>
      </div>

      <div className={styles.buttonsContainer}>
        <Button
          type="button"
          intent="secondary"
          disabled={fetcher.state === "submitting"}
          onClick={() => navigate("/users")}
        >
          Отменить
        </Button>
        <Button
          intent="primary"
          type="submit">
          Сохранить
        </Button>
      </div>
      <input type="hidden" name="intent" value={props.intent} />
      <input type="hidden" name="id" value={props.user?.id} />
    </fetcher.Form>
  );
};
