import { useLoaderData } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import type { NewsDto } from "../../api/model";
import { Details } from "../../components/details";
import styles from "./news-index.module.less";
import dayjs from "dayjs";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "../../api";
import { NEWS_QUERY } from "../../common/constants";

export const NewsIndex = () => {
  const queryClient = useQueryClient();
  const news = useLoaderData() as {
    body: { elements: NewsDto[], pages: number };
    error: any;
  };

  const fetchNewsPage = async ({ pageParam }: { pageParam?: number })  => {
    const req = {
      elements: 100,
      pages: pageParam || 0,
    };
    const news = await api.news.newsQuery(queryClient, req);
    return news.body;
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryFn: fetchNewsPage,
    queryKey: [NEWS_QUERY],
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.pages <= allPages.length) {
        return undefined;
      }
      return allPages.length;
    },
    initialData: { pages: [news.body], pageParams: [0] },
  });

  const renderTitle = (item: NewsDto) => {
    return <div className={styles.titleContainer}>
      <span className={styles.title}>{item.title}</span>
      <span className={styles.date}>{dayjs(item.createDate).format("DD.MM.YYYY")}</span>
    </div>;
  };

  const renderDescription = (item: NewsDto) => {
    return <div>
      <p className={styles.description}>{item.description}</p>
    </div>;
  };
  return <section className={styles.root}>
    <InfiniteScroll
      dataLength={data?.pages.reduce((sum, page) => sum + page.elements.length, 0) || 0}
      next={fetchNextPage}
      scrollableTarget={"content"}
      hasMore={Boolean(hasNextPage)}
      loader={<></>}
    >
      <ul>
        {data?.pages.map(page => 
          page.elements.map(item => 
            <Details
              className={styles.item}
              key={item.id} 
              title={renderTitle(item)}
              description={renderDescription(item)}
            />
          )
        )}
      </ul>
    </InfiniteScroll>
  </section>;
};
