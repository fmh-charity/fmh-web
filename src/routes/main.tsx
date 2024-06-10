import { json } from "react-router-dom";
import * as api from "../api";
import type { QueryClient } from "@tanstack/react-query";
import { MainPage } from "../pages/main/main-page";

export const loader: api.CreateLoader =
  (queryClient: QueryClient) => async () => {
    const req = {
      elements: 200,
    };
    const wishes = await api.wishes.wishesQuery(queryClient, req);
    return json(wishes);
  };

export const MainPageIndexRoute = () => {
  return <MainPage />;
};
