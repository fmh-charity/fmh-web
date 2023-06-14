import * as api from "../api";
import { useState } from "react";
import { useFetcher, json, redirect } from "react-router-dom";
import { QueryClient } from "@tanstack/query-core";
import { ensureSession } from "../shared/auth";
import { APP_ROLES } from "../shared/contants";
import { assertObjectBySchema } from "../shared/utils";
import { registrationPasswordMatchSchema, registrationSchema } from "../validation/registration";
import { RegistrationRequest } from "../api/model";

export const loader = (queryClient: QueryClient) => async () => {
  const session = await ensureSession(queryClient);
  if (session) {
    return redirect("/");
  }
  return json({});
};

export const action =
  (queryClient: QueryClient) =>
    async ({ request }: { request: Request }) => {
      const formData = await request.formData();
      const { roleIds, ...formObj } = Object.fromEntries(formData);

      const passwordErrors = assertObjectBySchema(formObj, registrationPasswordMatchSchema);
      const errors = assertObjectBySchema(formObj, registrationSchema);

      if (errors || passwordErrors) {
        return json({ errors, passwordErrors });
      }

      try {
        const registrationReq = await queryClient.fetchQuery(
          api.authentication.registrationQuery({
            ...formObj,
            roleIds: [parseInt(roleIds as string, 10)]
          } as unknown as RegistrationRequest)
        );
        if (registrationReq === "") {
          return json({ data: "Регистрация успешно завершена" });
        }
        return json(registrationReq);
      } catch (error) {
        return json((error as any).body);
      }
    };

export const RegistrationRoute = () => {
  const [showPassword, setShowPassword] = useState(false);
  const fetcher = useFetcher();

  return (
    <div>
      <h1>Registration</h1>
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
              {APP_ROLES.map((role) => <option key={role.id} value={role.id}>{`[${role.key}] ${role.name}`}</option>)}
            </select>
          </div>
          <div>
            <input type="text" name="email" />
            <span>email</span>
          </div>
          <div>
            <input type={showPassword ? "text" : "password"} name="password" />
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
            <button type="button" onClick={() => setShowPassword((c) => !c)}>
              Отображение пароля
            </button>
            {" | "}
            <button type="submit">Зарегистрироваться</button>
          </div>
          <div>
            {JSON.stringify(fetcher.data)}
          </div>
        </div>
      </fetcher.Form>
    </div>
  );
};
