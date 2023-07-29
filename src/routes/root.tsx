import type { QueryClient } from "@tanstack/react-query";
import { redirect } from "react-router";
import { ensureLogin } from "../common/auth";
import type { CreateLoader } from "../api";
import { Root } from "../pages/root";

export const loader: CreateLoader =
  (queryClient: QueryClient) =>
  async ({ request }) => {
    const session = await ensureLogin(queryClient);
    if (session) {
      return session;
    }
    const url = new URL(request.url);
    const redirectTo = url.searchParams.get("redirectTo") as string;
    if (redirectTo) {
      return redirect(`/login?redirectTo=${redirectTo}`);
    }
    if (["/", "/login"].includes(url.pathname)) {
      return redirect("/login");
    }
    return redirect(`/login?redirectTo=${url.pathname}`);
  };

export const RootRoute = () => {
  return <Root />;
};
