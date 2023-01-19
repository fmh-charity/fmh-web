import React from "react";
import { INews, INewsPagination } from "src/model/INews";
import NewsCard from "src/pages/news/components/NewsCard/NewsCard";
import styles from "./NewsNode.module.less";

const NewsNode = ({ data }: { data: INews[] | undefined }) =>
  data && data.length > 0 ? (
    <div className={styles.news_page__container}>
      <div className={styles.news_page__header}>Новости</div>
      <div className={styles.news_page__description}>ВСЕ НОВОСТИ</div>
      {data?.map((news) => (
        <NewsCard
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
  ) : (
    <h1>На данный момент новостей нет</h1>
  );


export default NewsNode;
