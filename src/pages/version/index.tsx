import { Link } from "react-router-dom";
import styles from "./index.module.less";

const itemsAbout = [
  { href: "/public/documents/pmh-A-66_211122_ПОЛЬЗОВАТЕЛЬСКОЕ_СОГЛАШЕНИЕ_ДЛЯ_ПРИЛОЖЕНИЯ.docx",
    title: "Пользовательское соглашение ✓" },
  { href: "", 
    title: "Лицензионное соглашение" },
  { href: "/public/documents/pmh-A-65_211123_ПОЛИТИКА_КОНФИДЕНЦИАЛЬНОСТИ_ДЛЯ_МОБИЛЬНОГО_ПРИЛОЖЕНИЯ_1.docx", 
    title: "Политика конфиденциальности ✓" },
  { href: "", 
    title: "Инструкция пользователя" },
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
            <a key={item.title} href={item.href} >
              {item.title}
            </a>
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
