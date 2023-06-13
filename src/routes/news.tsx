import * as api from "../api";
import { QueryClient } from "@tanstack/query-core";
import { json, useLoaderData } from "react-router-dom";

export const loader = (queryClient: QueryClient) => async () => {
  const news = await queryClient.fetchQuery(
    api.news.newsQuery()
  );

  return json(news);
};

export const NewsRoute = () => {
  const data = useLoaderData();
  return <div>news route
    <div>{JSON.stringify(data)}</div>
  </div>;
}; 