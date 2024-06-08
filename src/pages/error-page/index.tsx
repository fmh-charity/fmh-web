import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  function errorMessage(error: unknown): string {
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
    <div id="error-page">
      <h1>Упс!</h1>
      <p>Произошла непредвиденная ошибка</p>
      <p>
        <i>{errorMessage(error)}</i>
      </p>
    </div>
  );
};

export default ErrorPage;