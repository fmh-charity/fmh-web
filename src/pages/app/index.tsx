import { Outlet, useNavigation } from "react-router-dom";
import { useAuthBroadcastRevalidator, useResize } from "../../common/hooks";
import { Notifications } from "../../components/notifications";
import styles from "./index.module.less";
import type { QueryClient } from "@tanstack/react-query";
import { ensureUserInfo } from "../../common/auth";
import type { CreateLoader } from "../../api";
import clsx from "clsx";

export const loader: CreateLoader = (queryClient: QueryClient) => async () => {
  return await ensureUserInfo(queryClient);
};

const LoadingIndicator = () => {
  const navigation = useNavigation();
  const isMobile = useResize();

  return (
    <div
      className={clsx({
        [styles.loader]: true,
        [styles.active]: navigation.state === "loading",
        [styles.mobile]: isMobile,
      })}
    />
  );
};

export const App = () => {
  useAuthBroadcastRevalidator();

  return (
    <>
      <LoadingIndicator />
      <Outlet />
      <Notifications />
    </>
  );
};
