
import styles from "./index.module.less";

import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

export const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  const errorMessage = (error: unknown): string => {
    if (isRouteErrorResponse(error)) {
      return `${error.status} ${error.statusText}`
    } else if (error instanceof Error) {
      return error.message
    } else if (typeof error === 'string') {
      return error
    } else {
      console.error(error)
      return 'Unknown error'
    }
  }

  return (
    <div className={styles.errorContainer}>
        <h1 className={styles.errorTitle}>404</h1>
        <p className={styles.errorMessage}>Oops! Page not found.</p>
        <a href="/" className={styles.returnHome}>Go to Home</a>
    </div>
  );
};
