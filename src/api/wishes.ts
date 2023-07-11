import * as api from "../api";
import { createQuery } from ".";
import { getEncodeURICompoponent } from "../common/utils";
import { WISHES_QUERY, type WISH_STATUSES } from "../common/constants";
import type { QueryClient } from "@tanstack/react-query";
import type { WishDto, WishPaginationDto } from "./model";

export type WishesRequestUrl = {
  pages: number;
  elements: number;
  status: keyof typeof WISH_STATUSES;
  planExecuteDate: boolean;
};

export const wishesQuery = (
  queryClient: QueryClient,
  data: Partial<WishesRequestUrl>
) =>
  createQuery<WishPaginationDto>(
    queryClient,
    "/api/fmh/wishes?" + getEncodeURICompoponent(data),
    api.requestInit.RequestInitGetJSON,
    {
      queryKey: [WISHES_QUERY],
    }
  );

export const wishesByIdQuery = (
  queryClient: QueryClient,
  data: number | string
) =>
  createQuery<WishDto>(
    queryClient,
    "/api/fmh/wishes/" + data,
    api.requestInit.RequestInitGetJSON,
    {
      queryKey: [WISHES_QUERY, `${data}`],
    }
  );
