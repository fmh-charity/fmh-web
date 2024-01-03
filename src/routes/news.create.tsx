import * as api from "../api";
import { json, redirect } from "react-router-dom";
import type { QueryClient } from "@tanstack/react-query";
import { notification } from "../common/notifications";
import { NewsCreate } from "../pages/news-create/news-create";
import type { NewsCreateDto } from "../api/model/models/NewsCreateDto";

export const action: api.CreateAction =
  (queryClient: QueryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData) as NewsCreateDto;
    switch (request.method) {
      case "POST":
        {
          const response =
            await api.news.newsCreateQuery(
              queryClient,
              {
                title: data.title || "",
                description: data.description || "",
                newsCategoryId: Number(data.newsCategoryId)
              }
            );

          if (response.error) {
            notification.addNotification({
              label: response?.error?.code,
              text: response?.error?.code,
            });
          } else {
            notification.addNotification({
              label: "Успешно",
              text: "новость создалась",
            });
          }

          if (response.body.id) {
            return redirect("/nursestations/" + response.body.id);
          }
        }
        break;
      case "PUT": 
    }

    return json("");
  };

export const NewsCreateRoute = () => {
  return <NewsCreate />;
};
