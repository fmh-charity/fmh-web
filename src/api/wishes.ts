import * as api from "../api";
import { createQuery } from ".";
import { getEncodeURICompoponent } from "../common/utils";
import {
  WISHES_QUERY,
  WISH_CREATE_QUERY,
  WISH_UPDATE_QUERY,
  type WISH_STATUSES,
} from "../common/constants";
import type { QueryClient } from "@tanstack/react-query";
import type { WishCreationRequest, WishDto, WishPaginationDto } from "./model";

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

export const wishesCreateQuery = (
  queryClient: QueryClient,
  data: WishCreationRequest
) =>
  createQuery<WishDto, WishCreationRequest>(
    queryClient,
    "/api/fmh/wishes",
    api.requestInit.RequestInitPostJSON,
    {
      queryKey: [WISH_CREATE_QUERY],
    },
    data
  );

export const wishesUpdateQuery = (
  queryClient: QueryClient,
  data: WishCreationRequest,
  id: string
) =>
  createQuery<WishDto, WishCreationRequest>(
    queryClient,
    "/api/fmh/wishes/" + id,
    api.requestInit.RequestInitPutJSON,
    {
      queryKey: [WISH_UPDATE_QUERY],
    },
    data
  );
