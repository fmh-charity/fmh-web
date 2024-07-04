import { ButtonLink } from "../../components/button-link";
import styles from "./index.module.less";

import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  const errorMessage = (error: unknown): string => {
    if (isRouteErrorResponse(error)) {
      return `${error.status} ${error.statusText}`;
    } else if (error instanceof Error) {
      return error.message;
    } else if (typeof error === "string") {
      return error;
    } else {
      console.error(error);
      return "Unknown error";
    }
  };

  return (
    <div className={styles.errorContainer}>
      <h1 className={styles.errorTitle}>
        К сожалению, мы не можем показать нужную Вам страницу :(
      </h1>
      <p className={styles.errorMessage}>Код ошибки: {errorMessage(error)}</p>
      <div className={styles.buttons}>
        <ButtonLink to={"/main"} intent={"primary"} justify="center">
          Вернуться на главную страницу
        </ButtonLink>
      </div>
    </div>
  );
};
