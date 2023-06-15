import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useRevalidator } from "react-router-dom";
import { authBroadcastChannel } from "./auth";

export const useAuthBroadcastRevalidator = () => {
  const revalidator = useRevalidator();
  const queryClient = useQueryClient();

  useEffect(() => {
    const listener = async (ev: any) => {
      switch (ev.data.type) {
        case "login":
        case "logout":
          await queryClient.resetQueries();
          revalidator.revalidate();
          break;
        default:
          break;
      }
    };
    authBroadcastChannel.addEventListener("message", listener);
    return () => {
      authBroadcastChannel.removeEventListener("message", listener);
    };
  }, [queryClient, revalidator]);
};
