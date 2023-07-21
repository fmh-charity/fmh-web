import styles from "./index.module.less";

export const SplitLeft = ({
  phrase,
  author
}: {
  phrase?: string;
  author?: string;
}) => {
  return (
    <div className={styles.left}>
      <div className={styles.left__logo}>
        <img src="/images/logo.svg" alt="logo" />
      </div>
      <div className={styles.left__text}>
        <div className={styles.left__phrase}>
          {phrase
            ? phrase
            : "«Делай добро… А добро заразительно. По‑моему, все люди милосердны. Нужно просто говорить с ними об этом, суметь разбудить в них чувство сострадания, заложенное от рождения»"}
        </div>
        <div className={styles.left__author}>
          {author ? author : "В.В. Миллионщикова"}
        </div>
      </div>
    </div>
  );
};

export const SplitComponent = ({
  left,
  right
}: {
  left?: React.ReactNode;
  right: React.ReactNode;
}) => {
  return (
    <div className={styles.splitComponent}>
      {left || <SplitLeft />}
      {right}
    </div>
  );
};
