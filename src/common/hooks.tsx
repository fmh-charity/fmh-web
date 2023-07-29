import React from "react";
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

export const useResize = (width = 1024) => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= width);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= width);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  return isMobile;
};
