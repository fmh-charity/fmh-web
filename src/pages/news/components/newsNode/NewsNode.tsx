import React from "react";
import { INews, INewsPagination } from "src/model/INews";
import NewsCard from "src/pages/news/components/NewsCard/NewsCard";
import styles from "./NewsNode.module.less";
import InfoIcon from "src/assets/icons/info.svg";
import ArrowUpIcon from "src/assets/icons/arrow_up.svg";

const NewsNode = ({ data }: { data: INews[] | undefined }) =>
  data && data.length > 0 ? (
    <div className={styles.news_page__container}>
      <div className={styles.news_page__header_container}>
        <div className={styles.news_page__header_title}>Новости</div>
        <div className={styles.news_page__header_icons}>
          <button className={styles.news_page__header_info} type="button" onClick={() => console.log("Информация")}>
            <InfoIcon />
          </button>
          <button type="button" onClick={() => console.log("Раскрытие списка")}>
            <ArrowUpIcon />
          </button>
        </div>
      </div>
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
