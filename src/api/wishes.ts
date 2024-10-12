import * as api from "../api";
import { createQuery } from ".";
import { getEncodeURICompoponent } from "../common/utils";
import {
  WISHES_QUERY,
  WISH_CREATE_QUERY,
  WISH_UPDATE_QUERY,
  type WISH_STATUSES,
  WISH_CANCEL_QUERY,
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
    "/wishes?" + getEncodeURICompoponent(data),
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
    "/wishes/" + data,
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
    "/wishes",
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
    "/wishes/" + id,
    api.requestInit.RequestInitPutJSON,
    {
      queryKey: [WISH_UPDATE_QUERY],
    },
    data
  );

export const wishesCancelQuery = (
  queryClient: QueryClient,
  id: string
) =>
  createQuery<WishDto>(
    queryClient,
    "/wishes/cancel/" + id,
    api.requestInit.RequestInitDeleteJSON,
    {
      queryKey: [WISH_CANCEL_QUERY, id],
    },
  );
