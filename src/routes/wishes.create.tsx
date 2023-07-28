import { json } from "react-router-dom";
import type { QueryClient } from "@tanstack/react-query";
import * as api from "../api";
import { WishesCreate } from "../components/wishes-create";

export const loader: api.CreateLoader =
  (queryClient: QueryClient) => async () => {
    const [patients, users] = await Promise.all([
      api.patients_.patientsQuery(queryClient, [
        "ACTIVE",
        "DISCHARGED",
        "EXPECTED",
      ]),
      api.patients_.usersQuery(queryClient),
    ]);

    const wish = {};

    return json({ wish, patients, users });
  };

export const WishesCreateRoute = () => {
  return <WishesCreate />;
};
