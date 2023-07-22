import type { QueryClient } from "@tanstack/react-query";
import { redirect, json } from "react-router-dom";
import { assertObjectBySchema } from "../common/utils";
import { loginSchema } from "../validation/login";
import { doLogin, ensureLogin } from "../common/auth";
import type { LoginRequest } from "../api/model";
import { Login } from "../components/login";
import { notification } from "../common/notifications";

export const loader =
  (queryClient: QueryClient) =>
  async ({ request }: { request: Request }) => {
    const session = await ensureLogin(queryClient);
    const url = new URL(request.url);
    const redirectTo = url.searchParams.get("redirectTo") as string;
    const redirectToTemp = redirectTo
      ? redirectTo === "/login"
        ? "/"
        : redirectTo
      : ("/" as string);

    if (session) {
      return redirect(redirectToTemp);
    }
    return redirectToTemp;
  };

export const action =
  (queryClient: QueryClient) =>
  async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    const { login, password, redirectTo } = Object.fromEntries(formData);

    const schamaErrors = assertObjectBySchema({ login, password }, loginSchema);
    if (schamaErrors) return json({ validation: schamaErrors });

    const { error } = await doLogin(queryClient, {
      login,
      password,
    } as LoginRequest);

    if (error) {
      notification?.addNotification({
        label: (error as Error)?.message,
        text: (error as Error)?.stack,
      });
      return { error };
    }

    return redirect(redirectTo === "/login" ? "/" : (redirectTo as string));
  };

export const LoginRoute = () => {
  return <Login />;
};
