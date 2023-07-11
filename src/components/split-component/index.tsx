import styles from "./index.module.less";

export const SplitLeft = ({ text }: { text?: string }) => {
  return (
    <div className={styles.left}>
      <div className={styles.leftLogo}>
        <img src="/images/logo.svg" alt="logo" />
      </div>
      <div>
        <div className={styles.leftText}>
          {text
            ? text
            : "«Делай добро… А добро заразительно. По‑моему, все люди милосердны. Нужно просто говорить с ними об этом, суметь разбудить в них чувство сострадания, заложенное от рождения»"}
        </div>
        <div className={styles.leftSign}>В.В. Миллионщикова</div>
      </div>
    </div>
  );
};

export const SplitComponent = ({
  left,
  right,
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
