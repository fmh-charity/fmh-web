import { Link, json, useLoaderData } from "react-router-dom";
import * as api from "../api";
import type { QueryClient } from "@tanstack/react-query";
import type { WishPaginationDto } from "../api/model";

export const loader: api.CreateLoader =
  (queryClient: QueryClient) => async () => {
    const req = {
      // elements: 20,
      // pages: 1,
    };
    const wishes = await api.wishes.wishesQuery(queryClient, req);
    return json(wishes);
  };

export const WishesIndexRoute = () => {
  const wishes = useLoaderData() as {
    body: WishPaginationDto;
    error: any;
  };

  return (
    <div>
      wishes
      {wishes.body.elements?.map((e) => (
        <div key={e.id}>
          <Link to={`${e.id}`}>{e.title}</Link>
        </div>
      ))}
    </div>
  );
};
