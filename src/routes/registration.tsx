import * as api from "../api";
import { json, redirect } from "react-router-dom";
import type { QueryClient } from "@tanstack/query-core";
import { ensureLogin } from "../common/auth";
import { assertObjectBySchema } from "../common/utils";
import type { RegistrationRequest } from "../api/model";
import { RegistrationForm } from "../components/registration-form";
import { registrationSchema } from "../validation/registration";
import { notification } from "../common/notifications";

export const loader: api.CreateLoader =
  (queryClient: QueryClient) => async () => {
    const session = await ensureLogin(queryClient);
    if (session) {
      return redirect("/");
    }
    return json({});
  };

export const action: api.CreateAction =
  (queryClient: QueryClient) =>
  async ({ request }: { request: Request }) => {
    try {
      const formData = await request.formData();

      const { roleIds, passwordConfirm, ...formObjRest } =
        Object.fromEntries(formData);
      const formObj = {
        ...formObjRest,
        roleIds: [parseInt(roleIds as string, 10)],
      } as unknown as RegistrationRequest;

      const errors = assertObjectBySchema(formObj, registrationSchema);
      if (errors) return json({ errors });

      const registrationReq = await api.authentication.registrationQuery(
        queryClient,
        formObj
      );

      if (!registrationReq.error) {
        return json({ body: "Регистрация успешно завершена" });
      }

      if (registrationReq.error) {
        notification?.addNotification({
          label: "Ошибка",
          text: JSON.stringify(registrationReq.error),
        });
      }

      return json(registrationReq.body);
    } catch (error) {
      console.log("error", error);
      notification?.addNotification({
        label: "Ошибка",
        text: (error as any).body.violations,
      });

      return json((error as any).body);
    }
  };

export const RegistrationRoute = () => {
  return <RegistrationForm />;
};
