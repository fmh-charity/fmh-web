import { Outlet, useLoaderData } from "react-router-dom";
import { useAuthBroadcastRevalidator } from "../../common/hooks";
import { Notifications } from "../notifications";
import styles from "./index.module.less";
import type { QueryClient } from "@tanstack/react-query";
import { ensureUserInfo } from "../../common/auth";

export const loader = (queryClient: QueryClient) => async () => {
  return await ensureUserInfo(queryClient);
};

export const App = () => {
  const data = useLoaderData();
  console.log({ data });

  useAuthBroadcastRevalidator();

  return (
    <div className={styles.appWrapper}>
      <Outlet />
      <Notifications />
    </div>
  );
};
