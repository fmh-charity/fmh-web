import { json } from "react-router-dom";
import * as api from "../api";
import type { QueryClient } from "@tanstack/react-query";
import { WishesId } from "../components/wishes-id";

export const loader: api.CreateLoader =
  (queryClient: QueryClient) =>
  async ({ params }) => {
    if (params.id) {
      const [wish, patients, users] = await Promise.all([
        api.wishes.wishesByIdQuery(queryClient, params.id),
        api.patients_.patientsQuery(queryClient, [
          "ACTIVE",
          "DISCHARGED",
          "EXPECTED",
        ]),
        api.patients_.usersQuery(queryClient),
      ]);

      return json({ wish, patients, users });
    }
  };

export const WishesIdRoute = () => {
  return <WishesId />;
};
