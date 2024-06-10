import styles from "./index.module.less";

const MainPageNews = () => {
  return (
    <div className={styles.news}>
      <p className={styles.text}>Здесь появятся новости нашего хосписа</p>
      <div className={styles.heart}>
        <img src="images/heart.svg"/>
      </div>
      <div className={styles.characters}>
        <img src="images/characters-1.svg"/>
        <img src="images/character-2.svg"/>
        <img src="images/characters-3.svg"/>
      </div>
    </div>
  );
};

export default MainPageNews;
