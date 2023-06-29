import type { QueryClient } from "@tanstack/react-query";
import { Outlet, redirect } from "react-router";
import { Link } from "react-router-dom";
import { ensureLogin } from "../common/auth";

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
      <h1>В хосписе</h1>
      <ul>
        <li>
          <Link to="/logout">logout</Link>
        </li>
        <li>
          <Link to="/news">news</Link>
        </li>
        <li>
          <Link to="/wishes">wishes</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};
