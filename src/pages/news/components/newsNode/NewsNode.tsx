import React, { useState } from "react";
import { INews, INewsPagination } from "src/model/INews";
import NewsCard from "src/pages/news/components/NewsCard/NewsCard";
import styles from "./NewsNode.module.less";
import InfoIcon from "src/assets/icons/info.svg";
import ArrowUpIcon from "src/assets/icons/arrow_up.svg";
import ArrowDown from "src/assets/icons/arrow-down.svg";

const NewsNode = ({ data }: { data: INews[] | undefined }) => {
  const [toogleArrow, setToogle] = useState(false);
  const handleToogle = () => {
    setToogle(!toogleArrow)
  }
  return (
    data && data.length > 0 ? (
      <div className={styles.news_page__container}>
        <div className={styles.news_page__header_container}>
          <div className={styles.news_page__header_title}>Новости</div>
          <div className={styles.news_page__header_icons}>
            <button className={styles.news_page__header_info} type="button" onClick={() => console.log("Информация")}>
              <InfoIcon />
            </button>
            {toogleArrow ? <button type="button" onClick={handleToogle}>
              <ArrowUpIcon />
            </button> :
              <button type="button" onClick={handleToogle}>
                <ArrowDown />
              </button>
            }
          </div>
        </div>
        <div className={toogleArrow ? styles.news_page_close : styles.news_page_open}>
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
      </div>
    ) : (
      <h1>На данный момент новостей нет</h1>
    )
  )
}





export default NewsNode;
