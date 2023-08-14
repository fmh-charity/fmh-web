import { Link } from "react-router-dom";
import styles from "./index.module.less";

const itemsAbout = [
  { to: "", title: "Пользовательское соглашение" },
  { to: "", title: "Лицензионное соглашение" },
  { to: "", title: "Политика конфиденциальности" },
  { to: "", title: "Инструкция пользователя" },
];

const itemsFeedback = [
  { to: "", title: "Написать разработчику" },
  { to: "", title: "Оценить приложение" },
];

export const Version = () => {
  return (
    <div className={styles.version}>
      <div className={styles.header}>
        <span>В Хосписе</span>
        <img src="/images/logoMenu.svg" alt="Вхосписе" />
      </div>
      <div className={styles.build}>2.0.0</div>
      <div className={styles.description}>
        Приложение разработано ООО «ИЦ «Ай-Теко» в рамках благотворительного
        проекта
      </div>
      <div className={styles.rows}>
        <div className={styles.section}>О приложении</div>
        {itemsAbout.map((item) => {
          return (
            <Link key={item.title} to={item.to}>
              {item.title}
            </Link>
          );
        })}
        <div className={styles.section}>Обратная связь</div>
        {itemsFeedback.map((item) => {
          return (
            <Link key={item.title} to={item.to}>
              {item.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
