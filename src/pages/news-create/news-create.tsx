import { NewsForm } from "../../components/news-form";
import styles from "./news-create.module.less";
import { Card } from "../../components/card";

export const NewsCreate = () => {
  return <section className={styles.root}>
    <Card title="Новая новость">
      <div className={styles.formContainer}>
        <NewsForm buttonText="Создать" />
      </div>
    </Card>
  </section>;
};
