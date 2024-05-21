import styles from "./index.module.less";

const MainPageNews = () => {
  return (
    <div className={styles.news}>
      <p className={styles.text}>Здесь появятся новости нашего хосписа</p>
      <div className={styles.heart}>
        <img src="public/images/heart.svg"></img>
      </div>
      <div className={styles.characters}>
        <img src="public/images/characters-1.svg"></img>
        <img src="public/images/character-2.svg"></img>
        <img src="public/images/characters-3.svg"></img>
      </div>
    </div>
  );
};

export default MainPageNews;
