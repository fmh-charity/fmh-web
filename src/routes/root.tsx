import type { QueryClient } from "@tanstack/react-query";
import { Outlet, redirect } from "react-router";
import { Link } from "react-router-dom";
import { ensureLogin } from "../shared/auth";

export const loader =
  (queryClient: QueryClient) =>
  async ({ request }: { request: Request }) => {
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
  return (
    <div>
      hi there! <Link to="/logout">logout</Link>
      <Outlet />
    </div>
  );
};
