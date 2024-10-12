import * as api from "../api";
import { createQuery } from ".";
import type { QueryClient } from "@tanstack/react-query";
import type { NewsDto } from "./model";
import { NEWS_CREATE_QUERY, NEWS_QUERY } from "../common/constants";
import { getEncodeURICompoponent } from "../common/utils";
import type { NewsCreateDto } from "./model/models/NewsCreateDto";

export type NewsRequestUrl = {
  pages: number;
  elements: number;
};

export const newsQuery = (queryClient: QueryClient, data?: Partial<NewsRequestUrl>) =>
  createQuery<{ elements: NewsDto[], pages: number }, typeof data>(
    queryClient,
    "/news?" + getEncodeURICompoponent(data || {}),
    api.requestInit.RequestInitGetJSON,
    {
      queryKey: [NEWS_QUERY, getEncodeURICompoponent(data || {})],
    },
  );

export const newsCreateQuery = (
  queryClient: QueryClient,
  data: NewsCreateDto
) =>
  createQuery<NewsDto, typeof data>(
    queryClient,
    "/news",
    api.requestInit.RequestInitPostJSON,
    {
      queryKey: [NEWS_CREATE_QUERY],
    },
    data
  );
  