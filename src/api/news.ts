import type { QueryClient } from "@tanstack/react-query";
import { createQuery } from ".";
import type { NewsDto, NewsPaginationDto } from "./model";
import * as api from "../api";

export const newsQuery = (queryClient: QueryClient, data?: NewsPaginationDto) =>
  createQuery<NewsDto[], typeof data>(
    queryClient,
    "/api/fmh/news",
    api.requestInit.RequestInitGetJSON,
    {
      queryKey: [""],
    },
    data
  );
