import * as api from "../api";
import type { QueryClient } from "@tanstack/query-core";
import { json, useLoaderData } from "react-router-dom";

export const loader = (queryClient: QueryClient) => async () => {
  const news = await api.news.newsQuery(queryClient);

  return json(news);
};

export const NewsRoute = () => {
  const data = useLoaderData();
  return (
    <div>
      news route
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};
