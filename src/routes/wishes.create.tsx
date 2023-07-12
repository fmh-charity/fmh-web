import { json } from "react-router-dom";
import type { CreateAction, CreateLoader } from "../api";
import type { QueryClient } from "@tanstack/react-query";

export const action: CreateAction = (queryClient: QueryClient) => async () => {
  return json({});
};

export const loader: CreateLoader = (queryClient: QueryClient) => async () => {
  return json({ obj: true });
};

export const WishesCreateRoute = () => {
  return <div>wishes create route</div>;
};
