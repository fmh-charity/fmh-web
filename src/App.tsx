import * as React from "react";
import styles from "src/App.module.less";

const App = () => {
  const [hidden, setHidden] = React.useState(false);

  return (
    <div
      className={
        hidden
          ? `${styles.wrapper} ${styles["base-colors"]}`
          : `${styles.menuActive} ${styles["base-colors"]}`
      }
    />
  );
};

export default App;
