import { Outlet, useNavigation } from "react-router-dom";
import { useAuthBroadcastRevalidator } from "../../common/hooks";
import { Notifications } from "../notifications";
import styles from "./index.module.less";
import type { QueryClient } from "@tanstack/react-query";
import { ensureUserInfo } from "../../common/auth";
import type { CreateLoader } from "../../api";
import clsx from "clsx";

export const loader: CreateLoader = (queryClient: QueryClient) => async () => {
  return await ensureUserInfo(queryClient);
};

export const App = () => {
  useAuthBroadcastRevalidator();
  const navigation = useNavigation();

  return (
    <div className={styles.appWrapper}>
      <div
        className={clsx({
          [styles.loader]: true,
          [styles.active]: navigation.state === "loading",
        })}
      ></div>
      <Outlet />
      <Notifications />
    </div>
  );
};
