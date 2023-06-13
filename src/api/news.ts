import { customFetch } from ".";
import { NEWS_QUERY } from "../shared/contants";
import { NewsDto, NewsPaginationDto } from "./model";

export const newsQuery = (data?: NewsPaginationDto) => ({
  queryKey: [NEWS_QUERY],
  queryFn: async () => {
    return customFetch("/api/fmh/news", {
      method: "GET",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((r: { body: NewsDto[] }) => r.body);
  },
  ...{
    staleTime: 0, // override main staleTime
  },
});
