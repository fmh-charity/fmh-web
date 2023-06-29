import type { QueryClient } from "@tanstack/react-query";
import { createQuery, requestInitGetJSON } from ".";
import type { NewsDto, NewsPaginationDto } from "./model";

export const newsQuery = (queryClient: QueryClient, data?: NewsPaginationDto) =>
  createQuery<typeof data, NewsDto[]>(
    queryClient,
    "/api/fmh/news",
    requestInitGetJSON,
    data,
    {
      queryKey: [""],
    }
  );
