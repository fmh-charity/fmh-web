import type { QueryClient } from "@tanstack/react-query";
import {
  redirect,
  useLoaderData,
  json,
  useFetcher,
  Link,
} from "react-router-dom";
import { assertObjectBySchema } from "../shared/utils";
import { loginSchema } from "../validation/login";
import { doLogin, ensureLogin } from "../shared/auth";

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
    if (schamaErrors) return json(schamaErrors);

    const loginErrors = await doLogin(queryClient, { login, password });
    if (loginErrors) return loginErrors;

    return redirect(redirectTo === "/login" ? "/" : (redirectTo as string));
  };

export const LoginRoute = () => {
  const redirectTo = useLoaderData() as string;
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="POST">
      <div>
        <h1>login</h1>
        <div>
          <input type="text" name="login" defaultValue="login1" />
          <span>login</span>
          {fetcher.data?.login && <div>{fetcher.data.login}</div>}
        </div>
        <div>
          <input type="password" name="password" defaultValue="password1" />
          <span>password</span>
          {fetcher.data?.password && <div>{fetcher.data.password}</div>}
        </div>
        <div>
          <button type="submit" disabled={fetcher.state === "submitting"}>
            login
          </button>
          <input type="hidden" name="redirectTo" defaultValue={redirectTo} />
        </div>
        <div>
          <Link to="/registration">Зарегистрироваться</Link> |{" "}
          <Link to="/passwordReset">Сбросить пароль</Link>
        </div>
        <div>{JSON.stringify(fetcher.data)}</div>
      </div>
    </fetcher.Form>
  );
};
