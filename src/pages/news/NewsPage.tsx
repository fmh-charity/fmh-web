import React from "react";
import Loader from "src/components/loader/Loader";
import FilterIcon from "src/assets/icons/filter.svg";
import InfoIcon from "src/assets/icons/info.svg";
import AddIcon from "src/assets/icons/add.svg";
import SortIcon from "src/assets/icons/sort.svg";
import { useGetNewsQuery } from "src/services/api/newsApi";
import { Link } from "react-router-dom";
import News from "./components/NewsCard/NewsCard";
import styles from "./News.module.less";

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

const NewsPage = (): any => {
  const { isLoading, data } = useGetNewsQuery("");

  return (
    <div className={styles.news_root}>
      <header className={styles.header_news}>
        <div className={styles.header_title}>Новости</div>
        <div className={styles.header_icons}>
          <Link to="/add-news">
            <AddIcon />
          </Link>
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
