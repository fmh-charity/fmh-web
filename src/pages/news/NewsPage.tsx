import React from "react";
import Loader from "src/components/loader/Loader";
import useFetching from "src/hooks/useFetching";
import EditIcon from "src/assets/icons/edit_icon.svg";
import FilterIcon from "src/assets/icons/filter.svg";
import InfoIcon from "src/assets/icons/info.svg";
import SortIcon from "src/assets/icons/sort.svg";
import News from "./components/NewsCard/NewsCard";
import styles from "./News.module.less";
import { useGetNewsQuery } from "src/app/api/newsApi";

export interface INews {
  createDate: number;
  creatorId: number;
  creatorName: string;
  description: string;
  id: number;
  newsCategoryId: number;
  publishDate: number;
  publishEnabled: boolean;
  title: string;
}

const NewsPage = () => {
  const { data, isLoading } = useGetNewsQuery("");

  return (
    <div className={styles.news_root}>
      <header className={styles.header_news}>
        <div className={styles.header_title}>Новости</div>
        <div className={styles.header_icons}>
          <EditIcon />
          <FilterIcon />
          <SortIcon />
          <InfoIcon />
        </div>
      </header>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.news_body}>
          {data?.map((news) => (
            <News
              key={news.id}
              id={news.id}
              title={news.title}
              createDate={news.createDate}
              creatorId={news.creatorId}
              creatorName={news.creatorName}
              description={news.description}
              newsCategoryId={news.newsCategoryId}
              publishDate={news.publishDate}
              publishEnabled={news.publishEnabled}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsPage;
