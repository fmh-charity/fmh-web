import * as api from "../api";
import type { QueryClient } from "@tanstack/query-core";
import { json } from "react-router-dom";
import { NewsIndex } from "../pages/news-index/news-index";

export const loader = (queryClient: QueryClient) => async () => {
  const req = {
    elements: 100,
    pages: 0,
  };
  const news = await api.news.newsQuery(queryClient, req);
  return json(news);
};

export const NewsRoute = () => {
  return <NewsIndex />;
};
