import React from "react";
import { useFetcher, useRouteLoaderData } from "react-router-dom";

import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { Icon } from "../../components/icon";
import styles from "./index.module.less";

import clsx from "clsx";

import { APP_ROLES } from "../../common/roles";
import type { UserInfoDto } from "../../api/model";
import { useResize } from "../../common/hooks";

const ProfilePasswordGroup = () => {
  return (
    <>
      <Input
        type="password"
        defaultValue=""
        name="oldPassword"
        label="Старый пароль"
        error=""
      />
      <Input
        type="password"
        name="newPassword"
        label="Новый"
        error=""
        defaultValue=""
      />
      <Input
        type="password"
        defaultValue=""
        name="passwordConfirm"
        label="Подтверждение пароля"
        error=""
      />
    </>
  );
};

const ProfileMoreInfo = ({
  isDekstop,
  errorEmail,
}: {
  isDekstop: boolean;
  errorEmail: string;
}) => {
  const data = useRouteLoaderData("app") as UserInfoDto;
  return (
    <>
      <Input
        type="text"
        name="phone"
        label="Телефон"
        error=""
        defaultValue=""
        placeholder="Телефон"
      />
      <Input
        type="text"
        name="email"
        label="Email"
        error={errorEmail}
        defaultValue={data?.email?.name || ""}
        placeholder="Email"
      />
      {isDekstop ? null : (
        <Button intent="primary" justify="center" Icon={Icon.Attention16}>
          Подтвердить Email
        </Button>
      )}
      <select name="roleIds" defaultValue="6" style={{ height: "48px" }}>
        {APP_ROLES.map((role) => (
          <option key={role.id} value={role.id}>{`${role.roleName}`}</option>
        ))}
      </select>
    </>
  );
};

const ProfileMainInfo = ({
  errorFirstName,
  errorMiddleName,
  errorLastName,
  errorDateOfBirth,
}: {
  errorFirstName: string;
  errorMiddleName: string;
  errorLastName: string;
  errorDateOfBirth: string;
}) => {
  const data = useRouteLoaderData("app") as UserInfoDto;
  return (
    <>
      <Input
        type="text"
        name="lastName"
        label="Фамилия"
        error={errorLastName}
        defaultValue={data?.lastName || ""}
        placeholder="Фамилия"
      />
      <Input
        type="text"
        name="firstName"
        label="Имя"
        error={errorFirstName}
        defaultValue={data?.firstName || ""}
        placeholder="Имя"
      />
      <Input
        type="text"
        name="middleName"
        label="Отчество"
        error={errorMiddleName}
        defaultValue={data?.middleName || ""}
        placeholder="Отчество"
      />
      <Input
        type="date"
        name="dateOfBirth"
        label="Дата рождения"
        error={""}
        defaultValue="10.07.2016"
        max="9999-12-31"
        placeholder="Дата рождения"
      />
    </>
  );
};

const ProfileAvatar = () => {
  return (
    <div className={styles["profile__avatar_circle-container"]}>
      <img
        className={styles.profile__avatar}
        src="/images/avatar_mock.png"
        alt="avatar-mock"
      />
      <div className={styles["profile__avatar_gray-overlay"]}>
        <div className={styles["profile__avatar_upload-icon"]}>
          <Icon.Camera24 />
        </div>
      </div>
    </div>
  );
};

export const ProfileDekstop = () => {
  const fetcher = useFetcher();

  return (
    <div className={styles.profile}>
      <fetcher.Form method="POST">
        <div className={styles.profile__grid}>
          <div className={styles["profile__item-avatar"]}>
            <div className={styles["profile__grid-nested-avatar"]}>
              <ProfileAvatar />
            </div>
          </div>
          <div className={styles["profile__item-main-inputs"]}>
            <div className={styles["profile__grid-nested-main-inputs"]}>
              <ProfileMainInfo
                errorLastName={fetcher.data?.lastName}
                errorFirstName={fetcher.data?.firstName}
                errorMiddleName={fetcher.data?.middleName}
                errorDateOfBirth={fetcher.data?.dateOfBirth}
              />
            </div>
          </div>
          <div className={styles["profile__item-info-title"]}>
            <div className={styles["profile__grid-nested"]}>
              <h4>Общая информация</h4>
            </div>
          </div>
          <div className={styles["profile__item-info-inputs"]}>
            <div className={styles["profile__grid-nested"]}>
              <ProfileMoreInfo
                isDekstop={true}
                errorEmail={fetcher.data?.email}
              />
            </div>
          </div>
          <div className={styles["profile__item-btn-email"]}>
            <div className={clsx(styles["profile__grid-nested"])}>
              <div
                className={clsx(
                  styles["profile__wrapper-button-email"],
                  styles["profile__nested-item-btn-email"]
                )}
              >
                <Button
                  intent="primary"
                  justify="center"
                  Icon={Icon.Attention16}
                >
                  Подтвердить Email
                </Button>
              </div>
            </div>
          </div>
          <div className={styles["profile__item-password-title"]}>
            <div className={styles["profile__grid-nested"]}>
              <h4>Смена пароля</h4>
            </div>
          </div>
          <div className={styles["profile__item-password-inputs"]}>
            <div className={styles["profile__grid-nested"]}>
              <ProfilePasswordGroup />
            </div>
          </div>
          <div className={styles["profile__item-button"]}>
            <div className={styles["profile__grid-nested-button"]}>
              <Button intent="primary" justify="center" type="submit">
                Сохранить
              </Button>
            </div>
          </div>
        </div>
      </fetcher.Form>
    </div>
  );
};

export const ProfileMob = () => {
  const fetcher = useFetcher();

  return (
    <div className={styles.profile}>
      <fetcher.Form method="POST">
        <div className={styles["profile__grid-mob"]}>
          <div className={styles["profile__item-mob-avatar"]}>
            <ProfileAvatar />
          </div>
          <div className={styles["profile__item-mob-inputs"]}>
            <ProfileMainInfo
              errorLastName={fetcher.data?.lastName}
              errorFirstName={fetcher.data?.firstName}
              errorMiddleName={fetcher.data?.middleName}
              errorDateOfBirth={fetcher.data?.dateOfBirth}
            />
          </div>
          <div>
            <h4>Общая информация</h4>
          </div>
          <div className={styles["profile__item-mob-inputs"]}>
            <ProfileMoreInfo
              isDekstop={false}
              errorEmail={fetcher.data?.email}
            />
          </div>
          <div>
            <h4>Смена пароля</h4>
          </div>
          <div className={styles["profile__item-mob-inputs"]}>
            <ProfilePasswordGroup />
          </div>
          <div className={styles["profile__item-button-mob"]}>
            <Button intent="primary" justify="center" type="submit">
              Сохранить
            </Button>
          </div>
        </div>
      </fetcher.Form>
    </div>
  );
};

export const Profile = () => {
  const isMobile = useResize();
  return isMobile ? <ProfileMob /> : <ProfileDekstop />;
};
