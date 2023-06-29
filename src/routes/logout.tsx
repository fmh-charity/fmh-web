import type { QueryClient } from "@tanstack/react-query";
import { redirect } from "react-router-dom";
import { doLogout } from "../common/auth";

export const loader = (queryClient: QueryClient) => async () => {
  await doLogout(queryClient);
  return redirect(`/login?redirectTo=${window.location.pathname}`);
};
