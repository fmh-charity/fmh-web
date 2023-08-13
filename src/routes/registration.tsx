import * as api from "../api";
import { json, redirect } from "react-router-dom";
import type { QueryClient } from "@tanstack/query-core";
import { doLogin, ensureLogin, ensureUserInfo } from "../common/auth";
import { assertObjectBySchema } from "../common/utils";
import type { LoginRequest, RegistrationRequest } from "../api/model";
import { RegistrationForm } from "../components/registration-form";
import { registrationSchema } from "../validation/registration";

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
        roleIds: [parseInt(roleIds as string, 10)]
      } as unknown as RegistrationRequest;

      const errors = assertObjectBySchema(formObj, registrationSchema);
      if (errors) return json({ errors });

      const registrationResponse = await api.authentication.registrationQuery(
        queryClient,
        formObj
      );


      if(registrationResponse.error.status === 413){
        return json({ body :{title:"Произошла ошибка",subtitle:"Логин уже зарегистрирован"}  , success:false});
      }

      if(registrationResponse.error.status === 500){
        return json({ body :{title:"Произошла ошибка",subtitle:"Ошибка сервера"}  , success:false});
      }

      // чтобы сразу произвести вход
      const loginResponse = await doLogin(queryClient, {
      login:formObj.email,
      password:formObj.password,
    } as LoginRequest);

      if(loginResponse.error){
        return json({ body:{title:"Произошла ошибка",subtitle:"Произошла ошибка автоматического входа"}  , success:false});
      }

      return json({ body : {title: "Регистрация успешно завершена"},success:true});
    } catch (error) {
      return json((error as any).body);
    }
  };

export const RegistrationRoute = () => {
  return <RegistrationForm />;
};
