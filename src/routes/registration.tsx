import * as api from "../api";
import { json, redirect } from "react-router-dom";
import type { QueryClient } from "@tanstack/query-core";
import { ensureLogin } from "../common/auth";
import { assertObjectBySchema } from "../common/utils";
import {
  registrationPasswordMatchSchema,
  registrationSchema,
} from "../validation/registration";
import type { RegistrationRequest } from "../api/model";
import { RegistrationForm } from "../components/registration-form";

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
    const formData = await request.formData();
    const { roleIds, ...formObjRest } = Object.fromEntries(formData);
    const formObj = {
      ...formObjRest,
      roleIds: [parseInt(roleIds as string, 10)],
    } as unknown as RegistrationRequest;

    const passwordErrors = assertObjectBySchema(
      formObj,
      registrationPasswordMatchSchema
    );
    const errors = assertObjectBySchema(formObj, registrationSchema);

    if (errors || passwordErrors) {
      return json({ errors, passwordErrors });
    }

    try {
      const registrationReq = await api.authentication.registrationQuery(
        queryClient,
        formObj
      );
      if (!registrationReq.error) {
        return json({ data: "Регистрация успешно завершена" });
      }
      return json(registrationReq.body);
    } catch (error) {
      return json((error as any).body);
    }
  };

export const RegistrationRoute = () => {
  return <RegistrationForm />;
};
