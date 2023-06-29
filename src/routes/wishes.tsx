import { json, useLoaderData } from "react-router-dom";
import * as api from "../api";
import type { QueryClient } from "@tanstack/react-query";

export const loader = (queryClient: QueryClient) => async () => {
  // const wishes = await api.wishes.wishesQuery(queryClient, {
  //   elements: 1,
  //   pages: 1,
  // });
  // return json(wishes);
  const wishById = await api.wishes.wishesByIdQuery(queryClient, 2);
  return json(wishById);
};

export const WishesRoute = () => {
  const wishes = useLoaderData();
  return (
    <div>
      wishes
      <pre>{JSON.stringify(wishes, null, 2)}</pre>
    </div>
  );
};
