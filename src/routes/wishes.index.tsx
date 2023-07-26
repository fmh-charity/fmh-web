import { json } from "react-router-dom";
import * as api from "../api";
import type { QueryClient } from "@tanstack/react-query";
import { WishesIndex } from "../components/wishes-index";

export const loader: api.CreateLoader =
  (queryClient: QueryClient) => async () => {
    const req = {
      elements: 200,
      // pages: 1,
    };
    const wishes = await api.wishes.wishesQuery(queryClient, req);
    return json(wishes);
  };

export const WishesIndexRoute = () => {
  return <WishesIndex />;
};
