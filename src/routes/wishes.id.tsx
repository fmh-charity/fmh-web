import { Link, json, useLoaderData, useParams } from "react-router-dom";
import * as api from "../api";
import type { QueryClient } from "@tanstack/react-query";

export const loader: api.CreateLoader =
  (queryClient: QueryClient) =>
  async ({ params }) => {
    if (params.id) {
      const wish = await api.wishes.wishesByIdQuery(queryClient, params.id);
      return json(wish);
    }
  };

export const WishesIdRoute = () => {
  const wish = useLoaderData();
  const params = useParams();
  return (
    <div>
      wish by id {params.id}
      <Link to="..">back</Link>
      <pre>{JSON.stringify(wish, null, 2)}</pre>
    </div>
  );
};
